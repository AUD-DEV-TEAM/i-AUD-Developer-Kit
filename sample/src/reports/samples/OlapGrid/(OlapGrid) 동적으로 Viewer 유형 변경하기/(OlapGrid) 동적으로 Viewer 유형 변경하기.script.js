
var OlapGrid = null;  
var BTN_APPLY = null;
var RD_DEFAULT = null;
var RD_TREEVIEW = null;
var initControlVariables = function(){ 
	OlapGrid = Matrix.getObject("OlapGrid");  
	BTN_APPLY = Matrix.getObject("BTN_APPLY"); 
	RD_DEFAULT = Matrix.getObject("RD_DEFAULT"); 
	RD_DEFAULT.OnValueChange = function(s, e){
		if(e.IsChecked===true) 
			fnChangeViewType(0); 
	};
	RD_TREEVIEW = Matrix.getObject("RD_TREEVIEW"); 
	RD_TREEVIEW.OnValueChange = function(s, e){
		if(e.IsChecked===true)
			fnChangeViewType(1);
	};
};

/*****************************************
* 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
* * arguments :  
*****************************************/
 var OnDocumentLoadComplete  = function(sender, args)
 {
 	initControlVariables();
 };

//OlapGrid 의 ViewType 을 변경합니다.
var fnChangeViewType  = function(vType)
{	
 	if(!OlapGrid) OlapGrid = Matrix.getObject("OlapGrid");
	
	if(OlapGrid.Options.ViewType != vType) {
		OlapGrid.Options.ViewType = vType;
		OlapGrid.Refresh();	
	}
};
