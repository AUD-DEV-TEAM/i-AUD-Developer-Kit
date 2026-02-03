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

	// UPDATE
	const sql = "UPDATE SM_SALES_PERFORMANCE	 							"
		+ "\n    SET SALES_DATE		= TO_TIMESTAMP(?, 'YYYYMMDD')  	"
		+ "\n      , EMP_ID  		= ?  							"
		+ "\n      , CUST_ID 		= ?  							"
		+ "\n      , PROD_ID 		= ?  							"
		+ "\n      , QTY			= ?  							"
		+ "\n      , UNIT_PRICE	 	= ?  							"
		+ "\n      , COST_AMOUNT 	= ?  							"
		+ "\n      , SALES_STATUS 	= ?								"
		+ "\n      , UPDATED_AT  	= NOW()							"
		+ "\n      , UPDATED_BY  	= ?     						"
		+ "\n  WHERE SALES_ID     	= ?;   							";

	const stmt = con.PreparedStatement(sql);
	stmt.setString(1, req.getParam('VS_INP_YMD'));      // SALES_DATE
	stmt.setString(2, req.getParam('VS_INP_PIC'));      // EMP_ID
	stmt.setString(3, req.getParam('VS_INP_CUST'));     // CUST_ID
	stmt.setString(4, req.getParam('VS_INP_PROD'));     // PROD_ID
	stmt.setInt(5, Number(req.getParam('VN_INP_QTY')));         // QTY
	stmt.setInt(6, Number(req.getParam('VN_INP_PRICE')));       // UNIT_PRICE
	stmt.setInt(7, Number(req.getParam('VN_INP_COST')));        // COST_AMOUNT
	stmt.setString(8, req.getParam('VS_INP_STATUS'));   // SALES_STATUS
	stmt.setString(9, req.getUserCode());               // UPDATED_BY
	stmt.setString(10, req.getParam('VS_INP_ID'));      // SALES_ID

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
