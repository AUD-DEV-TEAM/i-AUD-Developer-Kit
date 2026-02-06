import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptDataRow } from "@AUD_SERVER/matrix/script/ScriptDataRow";
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement";


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

let stmt : ScriptPreparedStatement = null;
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
			sql = gen.getDMLCommand(table ,row ,"SM_PRODUCT", con.getDbType());
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