/**
 * 이미지 LOV 컨트롤 생성하기
 */
import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { CheckBox } from "@AUD_CLIENT/control/CheckBox";
import { Label } from "@AUD_CLIENT/control/Label";
import { iGrid } from "@AUD_CLIENT/control/iGrid";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Image } from "@AUD_CLIENT/control/Image";
import { ColorPicker } from "@AUD_CLIENT/control/ColorPicker";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { RadioButton } from "@AUD_CLIENT/control/RadioButton";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Group } from "@AUD_CLIENT/control/Group";
import { Chart } from "@AUD_CLIENT/control/Chart";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";
import { Control } from "@AUD_CLIENT/control/Control";
import { event } from "jquery";
let Matrix : Matrix; 


interface IOnItemSelected {
    (text:string): void;
}
  
class LineStyleComboList{
    
    private img_selected_line_style : Image;
    private combobutton_line_style  : Image;
    img_doctype_help: any;
    constructor(){        
        this.mControl = Matrix.getObject("popup_line_styles") as  Label;
        this.img_selected_line_style = Matrix.getObject("img_selected_line_style") as Image;
        this.combobutton_line_style  = Matrix.getObject("combobutton_line_style") as Image;
        this.mElement = this.mControl.Element as HTMLDivElement;
        this.init();
    }
    private init(){
        //label 컨트롤 resize override
        const _this = this;
        this.mControl.ZIndex = 999;
        this.Hide();
        this.mControl.Resize = (function(original){
            return function(){
        
                original.call(this);
                _this.Update();
            }
        })(this.mControl.Resize);

        // event
        this.combobutton_line_style.OnClick = function(sender,args){
            debugger;
            _this.Show();
        };
        //아이템 넣기
        _this.setItems(["Hair", "Thin", "Dotted", "DashDotDot", "DashDot"
                , "Dashed", "MediumDashDotDot", "SlantDashDot"
                , "Medium", "MediumDashDot", "MediumDashed", "Double", "Thick"]);

        //문서 클릭 시 닫기                
        parent.document.addEventListener("click", function (event) {

            const visualElements = [_this.mControl.Element
                                , _this.combobutton_line_style.Element];
            for (let i = 0, i2 = visualElements.length; i < i2; i++) {
                if (visualElements[i].contains(event.target as HTMLDivElement)) {
                    return;
                }
            } 
            _this.Hide();
        });             
        parent.document.addEventListener("keydown", function(ev:KeyboardEvent){
            if(ev.key== "Escape"){
                _this.Hide();
            }
        });
    }
    private mSelectedColor : string = "#D2DEFF";
    private mMoueOverColor : string = "#EEEEF3";
    private mNodeColor : string = "#ffffff";
    private mControl : Control;
    private mElement: HTMLDivElement; 
    private Items:{[key:string]: {"Name":string, "Div":HTMLDivElement, "Selected"?:boolean}} | null = null;
    private mSelectedItem:{"Name":string, "Div":HTMLDivElement, "Selected"?:boolean};
    private mValue :string ="";
    public mDatas : Array<string>|null = null;

    public Update():void{
        if(this.Items){
            let width : number = this.mElement.offsetWidth;
            for(let key in this.Items){
                this.Items[key].Div.style.width = (width - 6) + "px";
            }
        }
    }   
    public Calculate():void{        
        let width : number = this.mElement.offsetWidth;
        this.Items = {};
        if(this.mDatas){
            for(let r=0,r2=this.mDatas.length; r<r2; r++){ 
                this.Items[this.mDatas[r]] = {"Name":this.mDatas[r], "Div":this.createNode(this.mElement, width, this.mDatas[r])};
            }
        }
    }
    public Show():void{
        this.mControl.Visible = true;
    }
    public Hide():void{
        this.mControl.Visible = false;
    }

    /**
     * 모두 삭제
     */
    public Clear():void{
        let div =  this.mElement;
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        div.style.overflowY = "auto"; 
        
        //1개는 넣어 준다.
        let newDiv = document.createElement("div");
        newDiv.style.display= "none";
        div.appendChild(newDiv);
    }
    public OnItemSelected : IOnItemSelected;
    private notifyOnItemSelected(text:string):void{
        if(this.OnItemSelected){
            this.OnItemSelected(text);
        }
    }

    public getValue():string|null{
        return this.mValue;
    }
    /**
     * 특정 아이템 선택
     * @param text 
     */
    public Value(text:string):void{
        if(text == null){
            text = "";
        }
        this.mValue = text;
        
        if(this.mSelectedItem){
            this.mSelectedItem.Selected = false;
            this.mSelectedItem.Div.style.background = this.mNodeColor;
            this.mSelectedItem.Div.removeAttribute("SELECTED");
            this.mSelectedItem = null;
            
        }
        this.img_selected_line_style.ImageSaveName = "/XLS/combo_Thin.png";
        if(this.Items){
            let item = this.Items[text];
            if(item){
                item.Selected = true;
                item.Div.style.background = this.mSelectedColor;
                item.Div.setAttribute("SELECTED","Y");
                this.mSelectedItem = item;
                this.img_selected_line_style.ImageSaveName = "/XLS/combo_"+ text +".png";
            }
        } 
    }
    public setItems(items:Array<string>):void{
        this.mDatas = items;
        this.Clear();
        this.Calculate();
    }

    private createNode(pNode:HTMLDivElement, width:number, text:string):HTMLDivElement{
        const _this = this;
        //1.div 만들기
        let newDiv = document.createElement("div");
        newDiv.style.border = "none";//"1px solid #a8bdd7";
        newDiv.style.width = (width - 6) + "px";
        newDiv.style.height = "23px";
        newDiv.style.marginTop = "2";
        newDiv.style.marginLeft = "3";
        
        newDiv.addEventListener("mouseover", () => {
            newDiv.style.backgroundColor = _this.mMoueOverColor;
        });
    
        // 마우스를 뗐을 때
        newDiv.addEventListener("mouseout", () => {
            if(newDiv.getAttribute("SELECTED") != "Y"){
                newDiv.style.backgroundColor = _this.mNodeColor;
            }else{
                newDiv.style.backgroundColor = _this.mSelectedColor;
            }
        });

        // 클릭: 연한 초록
        newDiv.addEventListener("click", () => {            
            _this.Value(text);
            _this.notifyOnItemSelected(text);
            _this.Hide();
        });
        // 2. 이미지 생성
        const newImg = document.createElement("img");
        newImg.src = Matrix.GetGlobalConfig().CONTEXT_PATH + "/servlet/Download.maf?flag=9&resourceno=" + encodeURIComponent("WEB_IMAGES/XLS/" + text + ".png") ;

        // 3. div에 이미지 추가
        newDiv.appendChild(newImg);

        // 4. 특정 div 아래에 추가
        pNode.appendChild(newDiv);

        return newDiv;
    }
     
}
 
let combo = new LineStyleComboList();
combo.OnItemSelected = function(text:string){
    alert(text);
}