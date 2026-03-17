import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptDataRow } from "@AUD_SERVER/matrix/script/ScriptDataRow";
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement";


// Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK: Function;
let Matrix: Matrix;

const req = Matrix.getRequest();
const table = req.getTable("GRD_CUSTOMER");
const gen = Matrix.getQueryGenerator();
let con = Matrix.getConnection();

let stmt : ScriptPreparedStatement = null;
let sql = "";
let status = "";
let row : ScriptDataRow = null;

try{
	con.Connect("AUD_SAMPLE_DB");
	con.BeginTransaction(); 
	 
	for(var r=0;r<table.getRowCount();r++){
		row = table.getRow(r);
		status = row.getRowStatus(); 
		
		// auto generation dml sql
		if(status == "U"){ // update		
			sql = gen.getDMLCommand(table ,row ,"SM_CUSTOMER", con.getDbType());		
		}else if(status == "D"){// delete		
			sql = gen.getDMLCommand(table ,row ,"SM_CUSTOMER", con.getDbType());		
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


