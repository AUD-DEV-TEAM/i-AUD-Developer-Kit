import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptDataRow } from "@AUD_SERVER/matrix/script/ScriptDataRow";
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement";


// Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK : Function;
let Matrix : Matrix;

const req = Matrix.getRequest();  /* Request */
let   con = Matrix.getConnection(); /* DataBase Connection */
const table = req.getTable("GRD_PERF"); //get grid's work data
const gen = Matrix.getQueryGenerator(); // query generator

let stmt : ScriptPreparedStatement = null;
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
			sql = gen.getDMLCommand(table, row, "SM_SALES_PERFORMANCE", con.getDbType());
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
		} catch(e) {}
	}
	Matrix.ThrowException("영업 실적 삭제 중 오류가 발생하였습니다.");
}finally{
	if(stmt){
		stmt.close();
	}
	if(con){
		con.DisConnect();
	}
}
