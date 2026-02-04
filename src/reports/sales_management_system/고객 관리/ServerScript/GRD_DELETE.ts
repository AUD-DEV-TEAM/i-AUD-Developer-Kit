import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptDataRow } from "@AUD_SERVER/matrix/script/ScriptDataRow";


 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK : Function;
let Matrix : Matrix;

const req = Matrix.getRequest();  /* Request */
let   con = Matrix.getConnection(); /* DataBase Connection */
const table = req.getTable("GRD_CUSTOMER"); //get grid's work data
const gen = Matrix.getQueryGenerator(); // query generator

let stmt = null;
let sql = "";
let status = "";
let row : ScriptDataRow = null;

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
		/*if(status == "N"){ // create
			sql = gen.getDMLCommand(table ,row ,"TABLE_NAME", con.getDbType());
		}else if(status == "U"){ // update
			sql = gen.getDMLCommand(table ,row ,"TABLE_NAME", con.getDbType());
		}else */if(status == "D"){// delete
			sql = gen.getDMLCommand(table ,row ,"SM_CUSTOMER", con.getDbType());
			stmt = con.PreparedStatement(sql);
			stmt.addBatch();
		}
	}
	
	Matrix.WriteLog(sql);
	stmt.executeBatch();

	// COMMIT
	con.CommitTransaction();
	con.DisConnect();
	con = null;

}catch(e){
	Matrix.WriteLog("ERROR" + e.message);
	if(con != null){
		try{
			con.RollBackTransaction();
			con.DisConnect();
			con = null;
		}catch(e){
		}
	}
	Matrix.ThrowException("Server Exception:" + e.message);
}
