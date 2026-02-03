import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection";
import { ScriptQueryGenerator } from "@AUD_SERVER/matrix/script/ScriptQueryGenerator";

// Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK : Function;
let Matrix : Matrix;

const req = Matrix.getRequest();
const res = Matrix.getResponse();
let con = Matrix.getConnection();
const gen = Matrix.getQueryGenerator();
const table = req.getTable("GRD_PERF");

let sql = "";

try {
	con.Connect("AUD_SAMPLE_DB");
	con.BeginTransaction();

	for (let r = 0; r < table.getRowCount(); r++) {
		const row = table.getRow(r);
		const status = row.getRowStatus();

		if (status == "D") {
			sql = gen.getDMLCommand(table, row, "SM_SALES_PERFORMANCE", con.getDbType());
		}

		Matrix.WriteLog(sql);
		con.ExecuteUpdate(sql);
	}

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
