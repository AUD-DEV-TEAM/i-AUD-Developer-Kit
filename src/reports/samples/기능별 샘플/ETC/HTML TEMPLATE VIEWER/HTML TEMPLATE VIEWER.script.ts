import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Group } from "@AUD_CLIENT/control/Group";
import { DataTable } from "@AUD_CLIENT/data/DataTable";
import { DataRow } from "@AUD_CLIENT/data/DataRow";
import { WebContainer } from "@AUD_CLIENT/control/WebContainer";
 
let Matrix : Matrix; 
/*****************************
 *  
 *****************************/

class TemplateBinder{
	
	public Model : any;
	private mStyle : HTMLElement; //스타일
	private mGrid  : DataGrid;
	private mGroup : Group;
	private mWebView:WebContainer;
	private mcssText:string;
	private mHtmlText:string;
	private addCss(cssText:string):void{
		this.mStyle = document.createElement('style');
		this.mStyle.textContent = cssText;
			
		if(this.mGroup){
			parent.document.head.appendChild(this.mStyle);
		}else if(this.mWebView){
			let doc : Document = this.mWebView.getDocument() as Document;
			doc.head.appendChild(this.mStyle);
		}
	}
	private removeCss():void{
		if(this.mStyle){
			if(this.mGroup){
				parent.document.head.removeChild(this.mStyle);
			}else if(this.mWebView){
				let doc : Document = this.mWebView.getDocument() as Document;
				if(doc.head.childNodes){
					for(let i=doc.head.childNodes.length-1; i>=0; i--){
						if((doc.head.childNodes[i] as HTMLElement).tagName == "STYLE"){
							doc.head.removeChild(doc.head.childNodes[i]);
						}
					}
				}				
			}
		}
	}
	/**
	 * CSS 설정
	 * @param text 
	 * @returns 
	 */
	public CSS(text:string):TemplateBinder{
		this.mcssText = text;
		return this;
	}
	/**
	 * HTML 템플릿 
	 * @param text 
	 * @returns 
	 */
	public HTML(text:string):TemplateBinder{
		this.mHtmlText = text;
		return this;
	}
	public MODEL(model:any):TemplateBinder{
		this.Model = model;		
		return this;
	}

	public OnChangeModel : Function;
	private NotifyOnChangeModel():void{
		if(this.OnChangeModel){
			this.OnChangeModel(this.Model);
		}
	}
	/**
	 * 그리드
	 * @param grid 
	 * @returns 
	 */
	public GRID(grid:DataGrid):TemplateBinder{
		const _this = this;
		this.mGrid = grid;
		this.mGrid.OnDataBindEnd = function(sender, args){
			let table =  sender.getDataTable();	 
			_this.Model = _this.tableToJSON(table);			
			_this.NotifyOnChangeModel();
			_this.Build();

		}
		return this;
	}
	/**
	 * Browser
	 * @param grid 
	 * @returns 
	 */
	public WEB_VIEW(webView:WebContainer):TemplateBinder{		
		this.mWebView = webView;
		if(this.mWebView){
			(this.mWebView as any).Refresh();
		}
		return this;
	}
	/**
	 * 그룹 
	 * @param group 
	 * @returns 
	 */
	public GROUP(group:Group):TemplateBinder{
		this.mGroup = group;
		return this;
	}
	/**
	 * 
	 * @param rows 
	 */
	public Build():void{
		const _this = this;
		if(!this.Model){
			return;
		}
		this.removeCss();
		 
		if(this.mcssText){
			this.addCss(this.mcssText);
		}
		let parser = new DOMParser();
		
		let parsedDocument = parser.parseFromString(this.mHtmlText, 'text/html');

		let fragment = document.createDocumentFragment();
		Array.from(parsedDocument.body.children).forEach(child => {			
			fragment.appendChild(child); 
			_this.parseNode(child  as any as Element, fragment  as any as Element, this.Model);
		});
	
		if(this.mGroup){
			// 그룹에 넣기
			while(this.mGroup.Element.firstElementChild){		
				this.mGroup.Element.removeChild(this.mGroup.Element.firstElementChild);
			}	 
			this.mGroup.Element.appendChild(fragment);
		}else if(this.mWebView){
			let doc : Document = this.mWebView.getDocument() as Document;
			while(doc.body.firstChild){
				doc.body.removeChild(doc.body.firstChild);
			}
			doc.body.appendChild(fragment);
		}


	}

	/**
	 * DataTable를 JSON 형태로 가공합니다.
	 * @param table 
	 * @returns 
	 */
	private tableToJSON(table:DataTable):any{
		let colNames = table.GetColumnNames();
		let rows = [];
		table.Rows.forEach((row:DataRow)=>{
			let rowData = {};
			colNames.forEach((name:string)=>{
				rowData[name] = row.GetValue(name);
			}); 
			rows.push(rowData);
		});
		return {
			"Rows" : rows
			,"Columns" : colNames
		} 
	}

	private parseNode(node:Element, pNode:Element, data:any):void{
		
		const _this = this;
		let model : any = data; 
		if(node.nodeName == "#text" && node.textContent){
			if(node.textContent.trim().length > 0){
				node.textContent = _this.calculateFormula(node, node.textContent, model);
			}
		}else{
			
			if(this.attributeBinding(node, pNode, model)){ 
				if(node.hasChildNodes()){
					let child : ChildNode;
					for(let i=0,i2=node.childNodes.length;i<i2; i++){
						child = node.childNodes[i];
						_this.parseNode(child as Element, node, model);
					}
				}
			}
		}
	}
	private attributeBinding(node:Element,pNode:Element, model:any):boolean{
		if(!node){return true;}
		if(typeof node["getAttributeNames"] !== "function"){
			return true;
		}
		let attributes = node.getAttributeNames();
		let name:string;
		for(let i=0,i2=attributes.length;i<i2;i++){
			name = attributes[i];
			switch(name){
				case "binding":
					let childModel = this.getModel(model, node.getAttribute(name));
					pNode.removeChild(node);			
					node.removeAttribute(name);			
					if(childModel){							
						this.parseNodeBinding(node, pNode, childModel);
					} 
					return false;
				case "binding-if":
					//조건 값에 의해 표시 여부
					model = this.getModel(model, node.getAttribute(name));
					if(!model){						
						pNode.removeChild(node);
						return;
					}
					node.removeAttribute(name);						
				break;						
				default:
					//속성의 값이 binding이 있는지 여부
					let attrValue = this.calculateFormula(node, node.getAttribute(name),model);
					node.setAttribute(name, attrValue);
				break;
			}
		}
		return true;
	}
	private parseNodeBinding(bindingRoot:Element, pNode:Element, datas:any){
		
		const _this = this;
		if(Array.isArray(datas)){
			for(let i=0,i2=datas.length; i<i2; i++){
				let model = datas[i];
				let nNode = bindingRoot.cloneNode(true) as Element;

				pNode.appendChild(nNode);
				if(this.attributeBinding(nNode, pNode, model)){  
					if(nNode.hasChildNodes()){
						//노드 하위
						nNode.childNodes.forEach((child:ChildNode)=>{										
							_this.parseNode(child as Element, nNode, model);
						});
					}
				} 
			}
		}else if(typeof datas == "object"){
			for(let key in datas){
				let model = datas[key];
				let nNode = bindingRoot.cloneNode(true) as Element;

				pNode.appendChild(nNode);
				if(this.attributeBinding(nNode, pNode, model)){  
					if(nNode.hasChildNodes()){
						//노드 하위
						nNode.childNodes.forEach((child:ChildNode)=>{										
							_this.parseNode(child as Element, nNode, model);
						});
					}
				}
			}
		}
	}
	/**
	 * 현재 데이터에서 특정 객체를 반환 합니다.
	 * @param propPath 
	 */
	private getModel(model:any, propPath:string):any{
		if(propPath == "."){
			return model;
		}
		if(!propPath){return;}
		if(propPath.startsWith("/")){
			model = this.Model;
			propPath = propPath.substring(1);
		}		
		let paths = propPath.split(".");
		let result : any = model;
		if(result == null || typeof result == "undefined"){
			return;
		}
		let key:string;
		for(let i=0,i2=paths.length; i<i2;i++){
			key = paths[i].trim();
			if(key.length == 0){return;}
			if(result.hasOwnProperty(key)){
				result = result[key];
			}else if(typeof result[key] !== "undefined"){
				result = result[key];
			}else{
				return;
			}
		}	
		return result;
	}

	/**
	 * {=model.datas} 와 같은 항목 찾기
	 * @param text 
	 * @param callback 
	 */
	private calculateFormula(node:Element, text:string, data:any):string|null{
		if(!text){return null;}
		const _this = this;
		if(text.indexOf("{=") >= 0 && text.indexOf("}")>=0){
			let resultText = "";
			let value :any;
			this.braceFormulaTokenizer(text, function(token){
				if(token.substring(0,2) == "{=" && token.substring(token.length -1) == "}"){
					let formula = token.substring(2, token.length -1);
					value = _this.getModel(data, formula);
					if(typeof value !== "undefined"){
						//모델의 값이면
						if(value != null){
							resultText += value;
						}
					}else{
						//수식인가?
						value = _this.executeFunction(node, formula, data);
						if(value){
							resultText += value;
						}
					}
				}else{
					resultText += token;
				}
			});
			return resultText;
		}else{
			return text;
		}
	}

	private isValidIdentifier(str:string):boolean{
		const identifierRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

		const reservedWords = new Set([
			"break", "case", "catch", "class", "const", "continue", "debugger", "default",
			"delete", "do", "else", "export", "extends", "finally", "for", "function",
			"if", "import", "in", "instanceof", "new", "return", "super", "switch", "this",
			"throw", "try", "typeof", "var", "void", "while", "with", "yield", "let", "static",
			"enum", "await", "implements", "package", "protected", "interface", "private", "public"
		]);

		return identifierRegex.test(str) && !reservedWords.has(str);
	}
	private executeFunction(node:Element, formula:string, context:any):any{
		try{
			let script = [];
			script.push("var _CONTEXT_ = arguments[0];");
			if(context && typeof context === "object"){ 
				for(let key in context){ 
					if(!this.isValidIdentifier(key)){ 
						if(typeof context[key] === "function"){
							//script.push("var " + key + "=" +  context[key].toString() );
						}else{
							script.push("var " + key + "=  _CONTEXT_['" + key + "'];");
						}
					}
				}
			}
			script.push("return " + formula + ";");
			
			let func = new Function(script.join("\n"));
			return func(context);
		}catch(e){
			/*if(node.nodeName == "#text" && node.textContent){
				if(node.textContent.trim().length > 0){
					node.textContent = e.message;
				}
			}*/
			return "N/A"
		}
	}

	/**
	 * {=model.datas} 와 같은 항목 찾는 tokenizer
	 * @param text 
	 * @param callback 
	 */
	private braceFormulaTokenizer(text:string, callback:Function):void{
		let pos = 0;
		let tmp : string = "";
		let c : string;
		const getNextChar = function(){
			if(pos + 1 < text.length){
				return text.charAt(pos+1);
			}else{
				return "";
			}
		}
		const readToEndBrace = function(){
			let result : string="";
			
			while(pos < text.length){
				pos++;
				c = text.charAt(pos);
				if(c == "}"){
					return result; 
				}else{
					result += c;
				}
			}
			return result;
		}
		while(pos < text.length){
			c = text.charAt(pos);
			switch(c){
				case '{':
					if(getNextChar() == "="){					
						if(tmp.length > 0){
							callback(tmp);
						}
						tmp = "{"+ readToEndBrace() + "}";
						callback(tmp);
						tmp = "";
					}else{
						tmp += "{";
					}
					break;
				default :
					tmp += c;
				break;
			}
			pos++;
		}
		if(tmp){
			callback(tmp);
		}
	} 
}


/*

<div style="width:100%;">
  <table class="pretty-table">
    <thead>
      <tr>
        <th>Code</th>
        <th>Value</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
		
		<tr Binding="/Rows" onclick="alert('{=FOLDER_CODE}');">			
			<td Binding="/Columns">{=FOLDER_CODE}</td>			
		</tr>
		
    </tbody>
  </table>
</div>

*/ 



const tbxCSS     : RichTextBox =   Matrix.getObject("tbxCSS") as RichTextBox;
const tbxHTML    : RichTextBox =   Matrix.getObject("tbxHTML") as RichTextBox;
const tbxModel   : RichTextBox =   Matrix.getObject("tbxModel") as RichTextBox;

const dataView   : DataGrid =   Matrix.getObject("dataView") as DataGrid;
const webView    : WebContainer =   Matrix.getObject("webView") as WebContainer;
const btnExecute : Button =   Matrix.getObject("btnExecute") as Button;

const templateViewer = new TemplateBinder().GRID(dataView).WEB_VIEW(webView);
templateViewer.OnChangeModel = function(model){
	//tbxModel.Text = JSON.stringify(model, null, "  ");
};

const FORMAT = function(v, context){
	alert(v);
}

const BUILD_TEMPLATE = function(){
	templateViewer.CSS(tbxCSS.Text)
				  .HTML(tbxHTML.Text)
			      .Build();

}
  
tbxCSS.OnTextChange = function(){
	BUILD_TEMPLATE();
};
tbxHTML.OnTextChange = function(){
	BUILD_TEMPLATE();	
};
btnExecute.OnClick = function(){
	//let model = JSON.parse(tbxModel.Text);
	 
	//templateViewer.MODEL(JSON.parse(tbxModel.Text));
	BUILD_TEMPLATE();
}
BUILD_TEMPLATE();
  