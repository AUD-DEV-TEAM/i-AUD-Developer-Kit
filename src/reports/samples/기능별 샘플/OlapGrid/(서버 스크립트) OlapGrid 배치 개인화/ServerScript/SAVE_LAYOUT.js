/************************************************
 * Layout 저장 하기
 ************************************************/ 
var req = Matrix.getRequest(); /* request */
var res = Matrix.getResponse(); /* response */
var session  = Matrix.getSession(); /* session */
var util = Matrix.getUtility(); /* utility */
var gen = Matrix.getQueryGenerator();
var con = Matrix.getConnection(); /* DataBase Connector */

try{  
  	// 1. 데이터 베이스 연결 
  	con.Connect("MTXRPTY");
  	
	var sql = " INSERT INTO MEX_USER_REPORT_LAYOUT ( "
			+ "	   LAYOUT_CODE 	, USER_CODE   , REPORT_CODE  , CONTROL_CODE"
			+ "	  ,LAYOUT_NAME	, LAYOUT_INFO , CREATE_DATE   "
			+ "	) VALUES (?,?,?,?,?,?,"+gen.getDateTimeNowString(con.getDbType())+")  ";
	var stmt = con.PreparedStatement(sql);
	var idx = 1; 
	 
	stmt.setString(idx ++ , util.getUniqueKey("LY"));//AYOUT_CODE
	stmt.setString(idx ++ , req.getUserCode());//USER_CODE
	stmt.setString(idx ++ , req.getParam("VS_LAYOUT_REPORT_CODE")); //REPORT_CODE
	stmt.setString(idx ++ , req.getParam("VS_CONTROL_CODE")); //CONTROL_CODE
	stmt.setString(idx ++ , req.getParam("VS_LAYOUT_NAME"));//LAYOUT_NAME
	stmt.setCharacterStream(idx ++ , req.getParam("VS_LAYOUT_INFO"));//LAYOUT_INFO
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
