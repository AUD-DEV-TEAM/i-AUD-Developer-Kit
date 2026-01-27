/************************************************
 * 테이블을 생성합니다.
 ************************************************/ 
var req = Matrix.getRequest(); /* request */
var res = Matrix.getResponse(); /* response */
var session  = Matrix.getSession(); /* session */
var util = Matrix.getUtility(); /* utility */

var con = Matrix.getConnection(); /* DataBase Connector */
try{

  con.Connect("MTXRPTY");
  var sql = req.getServerScript("@CREATE_TABLE");
				
  con.ExecuteUpdate(sql); //테이블 생성
  
  con.DisConnect();
  
  con = null;
  

}catch(e){
	if(con != null){
		con.DisConnect();
		con = null;
	}
	Matrix.ThrowException("테이블 생성 실패 " + e.message);
}
