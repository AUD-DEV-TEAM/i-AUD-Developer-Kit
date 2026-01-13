var OlapGrid = null; 
var rdoCollapsed = null; 
var rdoExpand = null; 
var tbxField = null; 
var tbxItems = null; 

var initControlVariables = function(){
	OlapGrid = Matrix.getObject("OlapGrid"); 
	rdoCollapsed = Matrix.getObject("rdoCollapsed"); 
	rdoExpand = Matrix.getObject("rdoExpand"); 
	tbxField = Matrix.getObject("tbxField"); 
	tbxItems = Matrix.getObject("tbxItems"); 

};
/*****************************************
* 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
* * arguments :  
*****************************************/
 var OnDocumentLoadComplete  = function(sender, args)
 {
 	initControlVariables();
 };
/*****************************************
* 버튼 컨트롤이 클릭되는 시점에 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 string	Text (Readonly:False) : 라벨 값 
*****************************************/
 var OnButtonClick  = function(sender, args)
 {  
 	if(rdoExpand.Checked){
		OlapGrid.ExpandAll(); 
	}else{
		OlapGrid.CollapsedAll();
	}
 };
 
/*****************************************
* 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 int	RecordCount (Readonly:False) : 데이터셋의 레코드 수량 
*****************************************/
 var OnDataBindEnd  = function(sender, args)
 {
 	if(args.Id == OlapGrid.Name){
 		OlapGrid.Expand(tbxField.Text, tbxItems.Text, rdoExpand.Checked);
 		OlapGrid.Calculate();
	}
 };