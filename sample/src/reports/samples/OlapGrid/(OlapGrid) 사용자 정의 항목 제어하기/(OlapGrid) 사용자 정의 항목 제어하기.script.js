var btnClear = null; 
var btnExecute = null; 
var Label = null; 
var Label1 = null; 
var Label3 = null; 
var OlapGrid = null; 
var tbxDebug = null; 
var tbxValues = null; 
var tbxGroupName = null; 

var initControlVariables = function(){
	btnClear = Matrix.getObject("btnClear"); 
	btnExecute = Matrix.getObject("btnExecute"); 
	Label = Matrix.getObject("Label"); 
	Label1 = Matrix.getObject("Label1"); 
	Label3 = Matrix.getObject("Label3"); 
	OlapGrid = Matrix.getObject("OlapGrid"); 
	tbxDebug = Matrix.getObject("tbxDebug"); 
	tbxValues = Matrix.getObject("tbxValues"); 
	tbxGroupName = Matrix.getObject("tbxGroupName"); 

};
initControlVariables();
 
/*****************************************
* 버튼 컨트롤이 클릭되는 시점에 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 string	Text (Readonly:False) : 라벨 값 
*****************************************/
 var OnButtonClick  = function(sender, args)
 {
 	switch(args.Id){
		case "btnClear":
			OlapGrid.ClearCustomDimensions();		 
			OlapGrid.Refresh();
			break;
		case "btnExecute":
			var nDim = OlapGrid.addCustomDimension("창고이름", tbxGroupName.Text);
			nDim.Caption = tbxGroupName.Text;
			var arr= tbxValues.Text.split(",");
			var text = '"' + arr.join("\",\"") + '"';
			nDim.Formula = ' InList([창고이름], ' + text + ')';
			nDim.DataCellStyle = "BX68081E5FE2164E87AC30386900E82C78";
			OlapGrid.Refresh();		
			break;
	}
 };