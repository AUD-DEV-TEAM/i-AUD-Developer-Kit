import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptDataRow } from "@AUD_SERVER/matrix/script/ScriptDataRow";


// Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK: Function;
let Matrix: Matrix;

const req = Matrix.getRequest();
const table = req.getTable("GRD_DETAIL");
const gen = Matrix.getQueryGenerator();
let con = Matrix.getConnection();

let stmt = null;
let sql = "";
let status = "";
let row : ScriptDataRow = null;

try {
	con.Connect("AUD_SAMPLE_DB");
	con.BeginTransaction();

	for (let r = 0; r < table.getRowCount(); r++) {
		row = table.getRow(r);
		status = row.getRowStatus();

		if (status == "D") {
			sql = gen.getDMLCommand(table, row, "SM_COMMON_CODE", con.getDbType());
			stmt = con.PreparedStatement(sql);
			stmt.addBatch();
		}
	}
	
	Matrix.WriteLog(sql);
	stmt.executeBatch();

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
