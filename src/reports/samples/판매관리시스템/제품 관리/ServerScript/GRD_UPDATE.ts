import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement";

 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK : Function;
let Matrix : Matrix;

const req = Matrix.getRequest(); // request
let con = Matrix.getConnection(); // dbms connection
const gen = Matrix.getQueryGenerator();
const DATE_TIME_NOW = gen.getDateTimeNowString(con.getDbType());

let sql = "";
let stmt : ScriptPreparedStatement = null;

try{
	//connection
	con.Connect("AUD_SAMPLE_DB");// set target dbms connection code
	con.BeginTransaction();  // begin transaction	 
	
	// UPDATE
	sql = "\n UPDATE SM_PRODUCT        					"
		+ "\n    SET PROD_NAME  = ?     				"
		+ "\n      , CATEGORY   = ?    					"
		+ "\n      , STD_PRICE  = ?     				"
		+ "\n      , COST_PRICE = ?    					"
		+ "\n      , STD_UNIT	= ?  					"
		+ "\n      , UPDATED_AT = " + DATE_TIME_NOW + " "
		+ "\n      , UPDATED_BY = ?    					"
		+ "\n  WHERE PROD_ID    = ?;    				"

	stmt = con.PreparedStatement(sql);
	
	let IDX = 0;
	stmt.setString(++IDX,req.getParam('VS_INP_PROD'));			// PROD_NAME
	stmt.setString(++IDX,req.getParam('VS_INP_CAT'));			// CATEGORY
	stmt.setInt(++IDX,Number(req.getParam('VS_INP_PRICE')));	// STD_PRICE
	stmt.setInt(++IDX,Number(req.getParam('VS_INP_COST')));	// COST_PRICE
	stmt.setString(++IDX,req.getParam('VS_INP_UNIT'));			// STD_UNIT
	stmt.setString(++IDX,req.getUserCode());					// UPDATED_BY
	stmt.setString(++IDX,req.getParam('VS_PROD_ID'));			// PROD_ID
	
	Matrix.WriteLog(sql);
	stmt.executeUpdate();
	stmt.close();
	stmt = null;
		
	// COMMIT
	con.CommitTransaction();
	con.DisConnect();
	con = null;	

} catch(e) {
	Matrix.WriteLog("ERROR" + e.message);
	if (con != null) {
		try {
			con.RollBackTransaction();
		} catch(e) {}
	}
	Matrix.ThrowException("제품 수정 중 오류가 발생하였습니다.");
}finally{
	if(stmt){
		stmt.close();
	}
	if(con){
		con.DisConnect();
	}
}