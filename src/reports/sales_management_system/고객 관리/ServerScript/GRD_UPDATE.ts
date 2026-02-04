import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement";
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection";

 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK : Function;
let Matrix : Matrix;

const req = Matrix.getRequest(); // request
let con = Matrix.getConnection(); // dbms connection
const gen = Matrix.getQueryGenerator();
const DATE_TIME_NOW = gen.getDateTimeNowString(con.getDbType());

let sql = "";
let stmt : ScriptPreparedStatement;

try{
	//connection
	con.Connect("AUD_SAMPLE_DB");// set target dbms connection code
	con.BeginTransaction();  // begin transaction	 
	
	// UPDATE
	sql = "\n UPDATE SM_CUSTOMER        				"
		+ "\n    SET CUST_NAME     = ?     				"
		+ "\n      , BIZ_REG_NO    = ?    				"
		+ "\n      , CUST_TYPE     = ?     				"
		+ "\n      , CUST_GRADE    = ?    				"
		+ "\n      , CREDIT_LIMIT  = ?  				"
		+ "\n      , PHONE         = ?     				"
		+ "\n      , EMAIL         = ?     				"
		+ "\n      , ADDR_MAIN     = ?      			"
		+ "\n      , UPDATED_AT = " + DATE_TIME_NOW + " "
		+ "\n      , UPDATED_BY    = ?    				"
		+ "\n  WHERE CUST_ID       = ?;    				"
		
			
	stmt = con.PreparedStatement(sql);
	
	let IDX = 0;
	stmt.setString(++IDX,req.getParam('VS_INP_NAME'));		// CUST_NAME
	stmt.setString(++IDX,req.getParam('VS_INP_REG_NO'));	// BIZ_REG_NO
	stmt.setString(++IDX,req.getParam('VS_INP_TYPE'));		// CUST_TYPE
	stmt.setString(++IDX,req.getParam('VS_INP_GRADE'));		// CUST_GRADE
	stmt.setInt(++IDX,Number(req.getParam('VN_INP_LIMIT')));// CREDIT_LIMIT
	stmt.setString(++IDX,req.getParam('VS_INP_PHONE'));		// PHONE
	stmt.setString(++IDX,req.getParam('VS_INP_EMAIL'));		// EMAIL
	stmt.setString(++IDX,req.getParam('VS_INP_MAIN'));		// ADDR_MAIN
	stmt.setString(++IDX,req.getUserCode());				// UPDATED_BY
	stmt.setString(++IDX,req.getParam('VS_CUST_ID'));		// CUST_ID
	
	Matrix.WriteLog(sql);
	stmt.executeUpdate();
	stmt.close();
	stmt = null;
		
	// COMMIT
	con.CommitTransaction();
	con.DisConnect();
	con = null;	

}catch(e){
	Matrix.WriteLog("ERROR" + e.message); 
	if(con != null){
		try{
			con.RollBackTransaction();
			con.DisConnect();
			con = null;
		}catch(e){
		}
	} 
	Matrix.ThrowException("Server Exception:" + e.message);
}