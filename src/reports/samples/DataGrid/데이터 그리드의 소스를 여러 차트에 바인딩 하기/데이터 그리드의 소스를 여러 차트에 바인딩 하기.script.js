var Chart = null; 
var Chart1 = null; 
var DataGrid = null; 

var initControlVariables = function(){
	Chart = Matrix.getObject("Chart"); 
	Chart1 = Matrix.getObject("Chart1"); 
	DataGrid = Matrix.getObject("DataGrid"); 

};
initControlVariables();

/*****************************************
* 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 int	RecordCount (Readonly:False) : 데이터셋의 레코드 수량 
*****************************************/
 var OnDataBindEnd  = function(sender, args)
 {
// 	if(args.Id == "DataGrid"){
//		var dataSet = DataGrid.GetDataSet();		
//		Chart.SetDataSet(dataSet);
//		Chart1.SetDataSet(dataSet);
//	}
 };
 
 var  bind = function(){
 	var grid = Matrix.getObject("DataGrid");
	var chart1 = Matrix.getObject("Chart"); 
	var chart2 = Matrix.getObject("Chart1"); 
	
	grid.OnDataBindEnd = function(s, e){
		var dataSet = grid.GetDataSet();		
		chart1.SetDataSet(dataSet);
		chart2.SetDataSet(dataSet);
	};
 };
 
 bind();