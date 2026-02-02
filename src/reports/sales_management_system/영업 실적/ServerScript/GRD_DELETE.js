/*************************************************************
 * SAMPLE #1 single table insert
 *************************************************************/

var req = Matrix.getRequest(); // request
var table = req.getTable("GRD_PERF"); //get grid's work data
 
var con = Matrix.getConnection(); // dbms connection
var gen = Matrix.getQueryGenerator(); // query generator
var sql = "";  
var status = "";
var row = null;	

try{
	//connection
	con.Connect("AUD_SAMPLE_DB");// set target dbms connection code
	con.BeginTransaction();  // begin transaction	 
	 
	//------------------------------------------------------
	// save table data
	//------------------------------------------------------
	for(var r=0;r<table.getRowCount();r++){
		row = table.getRow(r);
		status = row.getRowStatus(); 
		
		// auto generation dml sql
		/*if(status == "N"){ // create
			sql = gen.getDMLCommand(table ,row ,"TABLE_NAME", con.getDbType());			
		}else if(status == "U"){ // update		
			sql = gen.getDMLCommand(table ,row ,"TABLE_NAME", con.getDbType());		
		}else */if(status == "D"){// delete		
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