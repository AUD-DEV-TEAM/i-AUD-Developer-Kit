import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement";


 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK : Function;
let Matrix : Matrix;

const req = Matrix.getRequest();  /* Request */
let   con = Matrix.getConnection(); /* DataBase Connection */
const table = req.getTable("GRD_PLAN"); //get grid's work data
const gen = Matrix.getQueryGenerator(); // query generator

let sql = "";
let status = "";
let row = null;
let stmt : ScriptPreparedStatement = null;

try{
	//connection
	con.Connect("AUD_SAMPLE_DB");// set target dbms connection code
	con.BeginTransaction();  // begin transaction

	//------------------------------------------------------
	// save table data
	//------------------------------------------------------
	for(let r=0;r<table.getRowCount();r++){
		row = table.getRow(r);
		status = row.getRowStatus();

		// auto generation dml sql
		if(status == "D"){// delete
			sql = gen.getDMLCommand(table ,row ,"SM_SALES_PLAN", con.getDbType());
			stmt = con.PreparedStatement(sql);
			stmt.addBatch();
		}
	}
		
	Matrix.WriteLog(sql);
	stmt.executeBatch();

	// COMMIT
	con.CommitTransaction();

}catch(e){
	Matrix.WriteLog("ERROR" + e.message);
	if(con != null){
		try{
			con.RollBackTransaction();
		}catch(e){}
	}
	Matrix.ThrowException("영업 계획 삭제 중 오류가 발생하였습니다.");
}finally{
	if(stmt){
		stmt.close();
	}
	if(con){
		con.DisConnect();
	}
}
