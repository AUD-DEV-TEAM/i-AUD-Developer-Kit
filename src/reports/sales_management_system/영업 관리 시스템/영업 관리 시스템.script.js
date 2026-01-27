var WEB = Matrix.getObject('WEB');
var url = 'https://rnd.bimatrix.co.kr/aud7//AUD/main.jsp?id=';

/**************************************
 * 그리드의 셀을 클릭할 떄 발생합니다.
 * * arguments :  
 *		 string	Id (Readonly:False) : 컨트롤 이름 
 *		 aud.control.grids.DataGridRow	Row (Readonly:False) : 데이터 레코드 정보 
 *		 aud.control.grids.DataGridCell	Cell (Readonly:False) : 데이터셀 정보 
 *		 aud.control.grids.DataGridColumn	Field (Readonly:False) : 필드 정보 
 *		 boolean	Handled (Readonly:False) : cell selection 정보 유지 여부 
**************************************/
 var OnCellClick  = function(sender, args){
 	if(args.Id == 'GRD_TREE'){
		WEB.URL = url + args.Row.GetValue('CODE');
		Matrix.doRefresh('WEB');
	}
 };