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
	sql = "UPDATE SM_SALES_PLAN			 			"
		+ "\n    SET PLAN_YEAR   = SUBSTR(?, 1, 4)  "
		+ "\n      , PLAN_MONTH  = SUBSTR(?, 5, 2)  "
		+ "\n      , EMP_ID 	 = ?     			"
		+ "\n      , PROD_ID 	 = ?     			"
		+ "\n      , TARGET_QTY	 = ?  	 			"
		+ "\n      , TARGET_AMT	 = ?  	 			"
		+ "\n      , PLAN_STATUS = ?  	 			"
		+ "\n      , UPDATED_AT  = NOW() 			"
		+ "\n      , UPDATED_BY  = ?     			"
		+ "\n  WHERE PLAN_ID     = ?;   			"
		
		
	stmt = con.PreparedStatement(sql);
	
	let IDX = 0;
	stmt.setString(++IDX,req.getParam('VS_INP_YM'));		// PLAN_YEAR
	stmt.setString(++IDX,req.getParam('VS_INP_YM'));		// PLAN_MONTH
	stmt.setString(++IDX,req.getParam('VS_INP_PIC'));		// EMP_ID
	stmt.setString(++IDX,req.getParam('VS_INP_PROD'));		// PROD_ID
	stmt.setInt(++IDX,Number(req.getParam('VN_INP_QTY')));	// TARGET_QTY
	stmt.setInt(++IDX,Number(req.getParam('VN_INP_AMT')));	// TARGET_AMT
	stmt.setString(++IDX,req.getParam('VS_INP_STATUS'));	// PLAN_STATUS
	stmt.setString(++IDX,req.getUserCode());				// UPDATED_BY
	stmt.setString(++IDX,req.getParam('VS_INP_ID'));		// PLAN_ID
	
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
	Matrix.ThrowException("영업 계획 수정 중 오류가 발생하였습니다.");
}finally{
	if(stmt){
		stmt.close();
	}
	if(con){
		con.DisConnect();
	}
}