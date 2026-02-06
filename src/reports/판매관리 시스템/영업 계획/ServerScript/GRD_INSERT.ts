import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement";


 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK : Function;
let Matrix : Matrix;

const req = Matrix.getRequest();  /* Request */
let   con = Matrix.getConnection(); /* DataBase Connection */
const gen = Matrix.getQueryGenerator();
const DATE_TIME_NOW = gen.getDateTimeNowString(con.getDbType());

let sql = "";
let stmt : ScriptPreparedStatement = null;

try{
	//connection
	con.Connect("AUD_SAMPLE_DB");// set target dbms connection code
	con.BeginTransaction();  // begin transaction

	// INSERT
	sql = "INSERT INTO SM_SALES_PLAN ( 			"
		+ "\n     PLAN_ID 						"
		+ "\n   , PLAN_YEAR						"
		+ "\n   , PLAN_MONTH					"
		+ "\n   , EMP_ID  						"
		+ "\n   , PROD_ID 						"
		+ "\n   , TARGET_QTY  					"
		+ "\n   , TARGET_AMT  					"
		+ "\n   , PLAN_STATUS  					"
		+ "\n   , CREATED_AT  					"
		+ "\n   , CREATED_BY  					"
		+ "\n ) 								"
		+ "\n VALUES (  						"
		+ "\n     ?								"
		+ "\n   , SUBSTR(?, 1, 4)				"
		+ "\n   , SUBSTR(?, 5, 2)				"
		+ "\n   , ?								"
		+ "\n   , ? 							"
		+ "\n   , ? 							"
		+ "\n   , ? 							"
		+ "\n   , ? 							"
		+ "\n   , " + DATE_TIME_NOW + "			"
		+ "\n   , ? 							"
		+ "\n );  								";

	stmt = con.PreparedStatement(sql);

	let IDX = 0;
	stmt.setString(++IDX,req.getParam('VS_INP_ID'));		// PLAN_ID
	stmt.setString(++IDX,req.getParam('VS_INP_YM'));		// PLAN_YEAR
	stmt.setString(++IDX,req.getParam('VS_INP_YM'));		// PLAN_MONTH
	stmt.setString(++IDX,req.getParam('VS_INP_PIC'));		// EMP_ID
	stmt.setString(++IDX,req.getParam('VS_INP_PROD'));		// PROD_ID
	stmt.setInt(++IDX,Number(req.getParam('VN_INP_QTY')));	// TARGET_QTY
	stmt.setInt(++IDX,Number(req.getParam('VN_INP_AMT')));	// TARGET_AMT
	stmt.setString(++IDX,req.getParam('VS_INP_STATUS'));	// PLAN_STATUS
	stmt.setString(++IDX,req.getUserCode());				// CREATED_BY

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
	Matrix.ThrowException("영업 계획 등록 중 오류가 발생하였습니다.");
}finally{
	if(stmt){
		stmt.close();
	}
	if(con){
		con.DisConnect();
	}
}
