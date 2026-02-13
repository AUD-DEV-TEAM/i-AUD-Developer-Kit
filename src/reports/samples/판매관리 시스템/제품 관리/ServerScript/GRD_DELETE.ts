import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptDataRow } from "@AUD_SERVER/matrix/script/ScriptDataRow";
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement";


 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK : Function;
let Matrix : Matrix;

const req = Matrix.getRequest();  /* Request */
let   con = Matrix.getConnection(); /* DataBase Connection */
const table = req.getTable("GRD_PRODUCT"); //get grid's work data
const gen = Matrix.getQueryGenerator(); // query generator

let stmt : ScriptPreparedStatement = null;
let sql = "";
let status = "";
let row : ScriptDataRow = null;

try{
	//connection
	con.Connect("AUD_SAMPLE_DB");
	con.BeginTransaction();

	sql = 'DELETE FROM SM_PRODUCT WHERE PROD_ID = ?;';
	stmt = con.PreparedStatement(sql);

	for(let r=0;r<table.getRowCount();r++){
		row = table.getRow(r);
		status = row.getRowStatus();

		if(status == "D"){
			stmt.setString(1,row.getData('PROD_ID'));
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
	Matrix.ThrowException("제품 삭제 중 오류가 발생하였습니다.");
}finally{
	if(stmt){
		stmt.close();
	}
	if(con){
		con.DisConnect();
	}
}