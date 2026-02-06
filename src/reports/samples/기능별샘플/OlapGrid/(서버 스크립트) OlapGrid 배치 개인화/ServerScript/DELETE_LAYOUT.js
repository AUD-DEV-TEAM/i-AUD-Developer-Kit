/************************************************
 * Layout 삭제하기 
 ************************************************/ 
var req = Matrix.getRequest(); /* request */
var res = Matrix.getResponse(); /* response */
var session  = Matrix.getSession(); /* session */
var util = Matrix.getUtility(); /* utility */

var con = Matrix.getConnection(); /* DataBase Connector */

try{  
  	// 1. 데이터 베이스 연결 
  	con.Connect("MTXRPTY");
  	
	var sql = " DELETE FROM MEX_USER_REPORT_LAYOUT WHERE LAYOUT_CODE = ? ";
	
	var stmt = con.PreparedStatement(sql);
	var idx = 1; 
	stmt.setString(1 ,  req.getParam("VS_LAYOUT_CODE")); //LAYOUT_CODE
	stmt.executeUpdate();
	
	//데이터 베이스 연결 종료
	con.DisConnect();
  
  	con = null;
  
}catch(e){
	if(con != null){
		con.DisConnect();
		con = null;
	}
	Matrix.ThrowException("데이터 저장 실패 :" + e.message);
}
