import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection";
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement";

// Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK : Function;
let Matrix : Matrix;

const req = Matrix.getRequest();  /* Request */
let   con = Matrix.getConnection(); /* DataBase Connection */
const gen = Matrix.getQueryGenerator();
const DATE_TIME_NOW = gen.getDateTimeNowString(con.getDbType());

let sql = "";
let stmt : ScriptPreparedStatement;

try {
	con.Connect("AUD_SAMPLE_DB");
	con.BeginTransaction();

	// INSERT
	sql = "INSERT INTO SM_SALES_PERFORMANCE ( 			"
		+ "\n     SALES_ID 								"
		+ "\n   , SALES_DATE							"
		+ "\n   , EMP_ID								"
		+ "\n   , CUST_ID  								"
		+ "\n   , PROD_ID 								"
		+ "\n   , QTY  									"
		+ "\n   , UNIT_PRICE  							"
		+ "\n   , COST_AMOUNT  							"
		+ "\n   , SALES_STATUS  						"
		+ "\n   , NET_AMOUNT  							"
		+ "\n   , CREATED_AT  							"
		+ "\n   , CREATED_BY  							"
		+ "\n ) 										"
		+ "\n VALUES (  								"
		+ "\n     ?  									"
		+ "\n   , TO_TIMESTAMP(?, 'YYYYMMDD')			"
		+ "\n   , ?  									"
		+ "\n   , ? 									"
		+ "\n   , ? 									"
		+ "\n   , ? 									"
		+ "\n   , ? 									"
		+ "\n   , ? 									"
		+ "\n   , ? 									"
		+ "\n   , 0										"
		+ "\n   , " + DATE_TIME_NOW + "					"
		+ "\n   , ? 									"
		+ "\n );  										";

	stmt = con.PreparedStatement(sql);
	
	let IDX = 0;
	stmt.setString(++IDX, req.getParam('VS_INP_ID'));       	// SALES_ID
	stmt.setString(++IDX, req.getParam('VS_INP_YMD'));      	// SALES_DATE
	stmt.setString(++IDX, req.getParam('VS_INP_PIC'));      	// EMP_ID
	stmt.setString(++IDX, req.getParam('VS_INP_CUST'));     	// CUST_ID
	stmt.setString(++IDX, req.getParam('VS_INP_PROD'));			// PROD_ID
	stmt.setInt(++IDX, Number(req.getParam('VN_INP_QTY')));		// QTY
	stmt.setInt(++IDX, Number(req.getParam('VN_INP_PRICE')));	// UNIT_PRICE
	stmt.setInt(++IDX, Number(req.getParam('VN_INP_COST')));	// COST_AMOUNT
	stmt.setString(++IDX, req.getParam('VS_INP_STATUS'));		// SALES_STATUS
	stmt.setString(++IDX, req.getUserCode());					// CREATED_BY

	Matrix.WriteLog(sql);
	stmt.executeUpdate();
	stmt.close();
	stmt = null;

	con.CommitTransaction();
	con.DisConnect();
	con = null;

} catch (e) {
	Matrix.WriteLog("ERROR" + e.message);
	if (con != null) {
		try {
			con.RollBackTransaction();
			con.DisConnect();
			con = null;
		} catch (e) {}
	}
	Matrix.ThrowException("Server Exception:" + e.message);
}
