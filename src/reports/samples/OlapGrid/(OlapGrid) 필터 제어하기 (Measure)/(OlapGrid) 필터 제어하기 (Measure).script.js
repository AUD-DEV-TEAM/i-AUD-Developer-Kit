var btnExecute = null; 
var cboAndOrOperator = null; 
var cboFields = null; 
var cboOperatorA = null; 
var cboOperatorB = null; 
var Label = null; 
var Label1 = null; 
var Label2 = null; 
var Label3 = null; 
var OlapGrid = null; 
var tbxDebug = null; 
var tbxValueA = null; 
var tbxValueB = null; 

var initControlVariables = function(){
	btnExecute = Matrix.getObject("btnExecute"); 
	cboAndOrOperator = Matrix.getObject("cboAndOrOperator"); 
	cboFields = Matrix.getObject("cboFields"); 
	cboOperatorA = Matrix.getObject("cboOperatorA"); 
	cboOperatorB = Matrix.getObject("cboOperatorB"); 
	Label = Matrix.getObject("Label"); 
	Label1 = Matrix.getObject("Label1"); 
	Label2 = Matrix.getObject("Label2"); 
	Label3 = Matrix.getObject("Label3"); 
	OlapGrid = Matrix.getObject("OlapGrid"); 
	tbxDebug = Matrix.getObject("tbxDebug"); 
	tbxValueA = Matrix.getObject("tbxValueA"); 
	tbxValueB = Matrix.getObject("tbxValueB"); 

};
initControlVariables();
 
 

 /** OlapGrid 필드를 데이터 셋으로 생성합니다.  */
 var bindOlapFields = function(){
 	var ds = Matrix.CreateDataSet();
	var dt = ds.CreateTable("DATA");
	dt.AddColumn("NAME", false);
	var fields = OlapGrid.getFields();
	for(var i=0;i<fields.length; i++){
		if(fields[i].Category == 2 && fields[i].CreateType == 0  /*Default*/){  /*Measure가 아닌 것들...*/
			dt.GetRow(dt.AppendRow()).SetValue("NAME", fields[i].Name);
		}
	}
	cboFields.SetDataSet(ds);
 }
 /** Olap의 필드 정보를 읽어서 설정합니다. */
 var bindOlapFieldFilter = function(name){
 	var fld = OlapGrid.getField(name);
	if(fld.FilterInfo && fld.FilterInfo.HasMeasureFilter){
		// Operator 및 값 설정
		var filter = fld.FilterInfo;
		switch(filter.MeasureAndOrOperator){
			case 0 : //none
				cboAndOrOperator.SelectedIndex = 0;
				break;
			case 1 : //Or
				cboAndOrOperator.SelectedIndex = 2;
				break;
			case 2 : //and
				cboAndOrOperator.SelectedIndex = 1;
				break;				
		} 
		
		cboOperatorA.SelectedIndex = filter.MeasureFilterTypeA;  /*Equals*/
		
		cboOperatorB.SelectedIndex = filter.MeasureFilterTypeB;
		tbxValueA.Value = filter.MeasureFilterValueA;
		tbxValueB.Value = filter.MeasureFilterValueB;
		
	}else{
		//초기화
		cboOperatorA.Value = "=";
		cboOperatorB.Value = "=";
		tbxValueA.Value = 0;
		tbxValueB.Value = 0;
		cboAndOrOperator.SelectedIndex = 0;
	}
 }
 
 /** Filter 설정하기 */
 var setOlapFieldFilter = function(){
 
	var fld = OlapGrid.getField(cboFields.Value);
	if(fld){
		
		if(cboAndOrOperator.SelectedIndex > 0){
			var isAnd = (cboAndOrOperator.Value == "AND");
			OlapGrid.setMeasureFilter(fld.Name ,cboOperatorA.Value,tbxValueA.Value
											   ,cboOperatorB.Value,tbxValueB.Value 
											   ,isAnd);
			tbxDebug.Text = "OlapGrid.setMeasureFilter('"+fld.Name+"', '" + cboOperatorA.Value + "'," + tbxValueA.Value
			               + " ,'" + cboOperatorB.Value + "'," + tbxValueB.Value + "," + isAnd + ");"
		}else{
			OlapGrid.setMeasureFilter(fld.Name ,cboOperatorA.Value,tbxValueA.Value);
			tbxDebug.Text = "OlapGrid.setMeasureFilter('"+fld.Name+"', '" + cboOperatorA.Value + "'," + tbxValueA.Value + ");"
		}
		OlapGrid.Refresh();
	}
		
 }
/*****************************************
* 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
* * arguments :  
*****************************************/
 var OnDocumentLoadComplete  = function(sender, args)
 { 
	bindOlapFields();
 };
 
 
  
/*****************************************
* 콤보박스 컨트롤의 값이 변경될때 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 string	Value (Readonly:False) : 컨트롤 값 
*****************************************/
 var OnComboBoxValueChanged  = function(sender, args)
 {
 	switch(args.Id){
		case "cboFields" :
			bindOlapFieldFilter(args.Value);
		break;
		case "cboAndOrOperator" :
			if(args.Value == "AND" || args.Value == "OR"){				
				tbxValueB.IsEnabled = true;
				
				cboOperatorB.IsEnabled = true;
			}else{
				tbxValueB.IsEnabled = false;
				tbxValueB.Value = 0;
				cboOperatorB.IsEnabled = false;
			}
		break;
	}
 }; 
/*****************************************
* 버튼 컨트롤이 클릭되는 시점에 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 string	Text (Readonly:False) : 라벨 값 
*****************************************/
 var OnButtonClick  = function(sender, args)
 {  
	  
 	if(args.Id == "btnExecute"){
 		setOlapFieldFilter();
	}
 };
 
 
 
 
 
 
 
 
 
 
 
  
  