import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection";
import { ScriptQueryGenerator } from "@AUD_SERVER/matrix/script/ScriptQueryGenerator";

 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK : Function;
let Matrix : Matrix;

/*************************************************************
 * SAMPLE #1 single table insert
 *************************************************************/

const req = Matrix.getRequest(); // request
const table = req.getTable("GRD_PRODUCT"); //get grid's work data

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
		/*if(status == "N"){ // create
			sql = gen.getDMLCommand(table ,row ,"TABLE_NAME", con.getDbType());			
		}else if(status == "U"){ // update		
			sql = gen.getDMLCommand(table ,row ,"TABLE_NAME", con.getDbType());		
		}else */if(status == "D"){// delete		
			sql = gen.getDMLCommand(table ,row ,"SM_PRODUCT", con.getDbType());
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