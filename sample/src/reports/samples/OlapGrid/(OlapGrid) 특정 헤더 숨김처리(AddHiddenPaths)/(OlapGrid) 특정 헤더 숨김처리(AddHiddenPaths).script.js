var Button = null; 
var Label = null; 
var OlapGrid = null; 

var initControlVariables = function(){
	Button = Matrix.getObject("Button"); 
	Label = Matrix.getObject("Label"); 
	OlapGrid = Matrix.getObject("OlapGrid"); 

	Button.OnClick = function(s, e){
		HIDE_PATH();
	};
};
initControlVariables();


var HIDE_PATH = function(){
	
	
	OlapGrid.ClearHiddenPaths();//전체 숨김 내역 제거
	
	//년도가 2012 년이면 판매 단가를 표시하지 않는다.
	var cell;
	var header;
	var path;
	for(var c=0,len=OlapGrid.ColumnCount;c<len; c++){
		cell = OlapGrid.getCell(0 ,c);
		if(cell.Field && cell.Field.Name == "판매단가"){
			if(cell.getHeaderValue("년도") == "2012"){
				//경로 정보를 구한다.
				path = getHiddenPath(cell.ColumnHeader);
				OlapGrid.AddHiddenPaths(path);
			}
		}
	}
	Matrix.doRefresh("OlapGrid");
}
var getHiddenPath = function(hCell) {
    var path = "";
    var cell = hCell;
    while (true) {
        if (!cell || !cell.Field)
            break;
			
        if (cell.Measure) {
            path += "[" + cell.Key + "]";
        }
        else if (cell.GrandTotal) {
            path += "[#GRAND_TOTAL#]";
        }
        else if (cell.Total && cell.Reference) {
            path += "[#" + cell.Reference.Key + "#]";
        }
        else {
            path += "[" + cell.Key + "]";
        }
        cell = cell.Parent;
    }
    return path;
};