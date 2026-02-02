import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection";
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement";

// Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK: Function;
let Matrix: Matrix;

const req = Matrix.getRequest();
let con = Matrix.getConnection();

const sql = "INSERT INTO SM_COMMON_CODE (		"
	+ "\n     GROUP_CD	 				"
	+ "\n   , CODE						"
	+ "\n   , CODE_NAME					"
	+ "\n   , SORT_ORDER 				"
	+ "\n   , USE_YN  					"
	+ "\n   , CREATED_AT  				"
	+ "\n   , CREATED_BY  				"
	+ "\n ) 							"
	+ "\n VALUES (  					"
	+ "\n     ?  						"
	+ "\n   , ?  						"
	+ "\n   , ? 						"
	+ "\n   , ? 						"
	+ "\n   , ? 						"
	+ "\n   , NOW()						"
	+ "\n   , ? 						"
	+ "\n );  							";

try {
	con.Connect("AUD_SAMPLE_DB");
	con.BeginTransaction();

	const stmt = con.PreparedStatement(sql);

	let IDX = 0;
	stmt.setString(++IDX, req.getParam('VS_GROUP_CODE'));	// GROUP_CD
	stmt.setString(++IDX, req.getParam('VS_INP_CODE'));		// CODE
	stmt.setString(++IDX, req.getParam('VS_CODE_NAME'));	// CODE_NAME
	stmt.setInt(++IDX, Number(req.getParam('VN_SORT')));	// SORT_ORDER
	stmt.setString(++IDX, req.getParam('VS_USE_YN'));		// USE_YN
	stmt.setString(++IDX, req.getUserCode());				// CREATED_BY

	Matrix.WriteLog(sql);
	stmt.executeUpdate();
	stmt.close();

	con.CommitTransaction();
	con.DisConnect();
	con = null;

} catch(e) {
	Matrix.WriteLog("ERROR" + e.message);
	if (con != null) {
		try {
			con.RollBackTransaction();
			con.DisConnect();
			con = null;
		} catch(e) {}
	}
	Matrix.ThrowException("Server Exception:" + e.message);
}
