import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptDataRow } from "@AUD_SERVER/matrix/script/ScriptDataRow";
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement";


// Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK: Function;
let Matrix: Matrix;

const req = Matrix.getRequest();
const table = req.getTable("GRD_DETAIL");
const gen = Matrix.getQueryGenerator();
let con = Matrix.getConnection();

let stmt : ScriptPreparedStatement = null;
let sql = "";
let status = "";
let row : ScriptDataRow = null;

try {
	con.Connect("AUD_SAMPLE_DB");
	con.BeginTransaction();

	sql = 'DELETE FROM SM_COMMON_CODE WHERE GROUP_CD = ? AND CODE = ?;';
	stmt = con.PreparedStatement(sql);
	
	for (let r = 0; r < table.getRowCount(); r++) {
		row = table.getRow(r);
		status = row.getRowStatus();

		if (status == "D") {
			stmt.setString(1,req.getParam('VS_GROUP_CODE'));
			stmt.setString(2,row.getData('CODE'));
			
            stmt.addBatch();
			stmt.clearParameters();
        }
    }
    Matrix.WriteLog(sql);
	
    stmt.executeBatch();
	stmt.clearBatch();
	
    con.CommitTransaction();

} catch(e) {
	Matrix.WriteLog("ERROR" + e.message);
	if (con != null) {
		try {
			con.RollBackTransaction();
		} catch(e) {}
	}
	Matrix.ThrowException("상세 코드 삭제 중 오류가 발생하였습니다.");
}finally{
	if(stmt){
		stmt.close();
	}
	if(con){
		con.DisConnect();
	}
}
