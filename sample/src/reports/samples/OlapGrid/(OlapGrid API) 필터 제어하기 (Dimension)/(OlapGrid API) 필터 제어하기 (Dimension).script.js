var btnExecute = null; 
var cboFields = null; 
var cboOperator = null;  
var OlapGrid = null; 
var tbxDebug = null; 
var tbxValues = null; 

var initControlVariables = function(){
	btnExecute = Matrix.getObject("btnExecute"); 
	cboFields = Matrix.getObject("cboFields"); 
	cboOperator = Matrix.getObject("cboOperator");  
	OlapGrid = Matrix.getObject("OlapGrid"); 
	tbxDebug = Matrix.getObject("tbxDebug"); 
	tbxValues = Matrix.getObject("tbxValues"); 

};
initControlVariables();
 

 /** OlapGrid 필드를 데이터 셋으로 생성합니다.  */
 var bindOlapFields = function(){
 	var ds = Matrix.CreateDataSet();
	var dt = ds.CreateTable("DATA");
	dt.AddColumn("NAME", false);
	var fields = OlapGrid.getFields();
	for(var i=0;i<fields.length; i++){
		if(fields[i].Category != 2){  /*Measure가 아닌 것들...*/
			dt.GetRow(dt.AppendRow()).SetValue("NAME", fields[i].Name);
		}
	}
	cboFields.SetDataSet(ds);
 }
 /** Olap의 필드 정보를 읽어서 설정합니다. */
 var bindOlapFieldFilter = function(name){
 	var fld = OlapGrid.getField(name);
	if(fld.FilterInfo && fld.FilterInfo.HasFilter()){
		// Operator 및 값 설정
		var filter = fld.FilterInfo;
		if(filter.FilterType ==  0){  /*In*/
			cboOperator.Value = "In";
			tbxValues.Text = (filter.Values) ? filter.Values.join(",") : "";
		}else if(filter.FilterType == 1){  /*NotIn*/
			cboOperator.Value = "NotIn";
			tbxValues.Text = (filter.Values) ? filter.Values.join(",") : "";
		}else{// if(filter.FilterType == 4){ /*BetWeen*/
			cboOperator.Value = "Between";
			tbxValues.Text = (filter.Values) ? filter.Values.join(",") : "";
		} 
	}else{
		//초기화
		cboOperator.Value = "In";
		tbxValues.Text = "";
	}
 }
 
 /** Filter 설정하기 */
 var setOlapFieldFilter = function(){
 
	var fld = OlapGrid.getField(cboFields.Value);
	if(fld){
		var values = tbxValues.Text.split(",");
		var filter = cboOperator.Value;
		switch(filter){
			case "In":
				OlapGrid.setDimensionFilterIn(fld.Name, values); //  IN
				tbxDebug.Text = "OlapGrid.setDimensionFilterIn('" + fld.Name + "',['" + values.join("','") + "']);";
				break;
			case "NotIn":
				OlapGrid.setDimensionFilterNotIn(fld.Name, values); //NOT IN
				tbxDebug.Text = "OlapGrid.setDimensionFilterNotIn('" + fld.Name + "',['" + values.join("','") + "']);";
				break;
			case "Between":
				if(values.length >=2){
					OlapGrid.setDimensionFilterBetWeen(fld.Name, values[0], values[1]); //between
					tbxDebug.Text = "OlapGrid.setDimensionFilterBetWeen('" + fld.Name + "','" + values[0] + "','" + values[1] + "');";
				}
				break;
				
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
 	if(args.Id == "cboFields"){
		bindOlapFieldFilter(args.Value);
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
 
 
 
 
 
 
 
 
 
 
 
  