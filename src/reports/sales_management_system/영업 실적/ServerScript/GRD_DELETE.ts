import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection";
import { ScriptQueryGenerator } from "@AUD_SERVER/matrix/script/ScriptQueryGenerator";
import { ScriptRequestPacket } from "@AUD_SERVER/matrix/script/ScriptRequestPacket";
import { ScriptDataRow } from "@AUD_SERVER/matrix/script/ScriptDataRow";

 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK : Function;
let Matrix : Matrix;

const req = Matrix.getRequest(); // request
const table = req.getTable("GRD_PERF"); //get grid's work data

let con = Matrix.getConnection(); // dbms connection
const gen = Matrix.getQueryGenerator(); // query generator
let sql = "";
let status = "";
let row = null;

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
			sql = gen.getDMLCommand(table ,row ,"SM_SALES_PERFORMANCE", con.getDbType());
		}
		Matrix.WriteLog(sql);
		con.ExecuteUpdate(sql);

	}
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
