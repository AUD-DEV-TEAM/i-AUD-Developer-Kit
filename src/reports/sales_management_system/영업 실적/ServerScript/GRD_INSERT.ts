import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection";
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement";

// Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK : Function;
let Matrix : Matrix;

const req = Matrix.getRequest();
const res = Matrix.getResponse();
let con = Matrix.getConnection();

try {
	con.Connect("AUD_SAMPLE_DB");
	con.BeginTransaction();

	// INSERT
	const sql = "INSERT INTO SM_SALES_PERFORMANCE ( 			"
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
		+ "\n   , NOW()									"
		+ "\n   , ? 									"
		+ "\n );  										";

	const stmt = con.PreparedStatement(sql);
	stmt.setString(1, req.getParam('VS_INP_ID'));       // SALES_ID
	stmt.setString(2, req.getParam('VS_INP_YMD'));      // SALES_DATE
	stmt.setString(3, req.getParam('VS_INP_PIC'));      // EMP_ID
	stmt.setString(4, req.getParam('VS_INP_CUST'));     // CUST_ID
	stmt.setString(5, req.getParam('VS_INP_PROD'));     // PROD_ID
	stmt.setInt(6, Number(req.getParam('VN_INP_QTY')));         // QTY
	stmt.setInt(7, Number(req.getParam('VN_INP_PRICE')));       // UNIT_PRICE
	stmt.setInt(8, Number(req.getParam('VN_INP_COST')));        // COST_AMOUNT
	stmt.setString(9, req.getParam('VS_INP_STATUS'));   // SALES_STATUS
	stmt.setString(10, req.getUserCode());              // CREATED_BY

	Matrix.WriteLog(sql);
	stmt.executeUpdate();
	stmt.close();

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
