/*************************************************************
 * SAMPLE #1 single table insert
 *************************************************************/

var req = Matrix.getRequest(); // request 
var con = Matrix.getConnection(); // dbms connection
var util = Matrix.getUtility();
var gen = Matrix.getQueryGenerator(); // query generator
var sql = "";  
var status = "";
var row = null;	
var stmt = null;
var stmtInsert = null;
var ROW_IDX  = 0;
try{
	//connection
	con.Connect("MTXRPTY");// set target dbms connection code
	con.BeginTransaction();  // begin transaction	 
	
	 
	//------------------------------------------------------
	// save table data
	//------------------------------------------------------	
	var table = req.getTable("OlapGrid"); //get grid's work data
	
	sql = "UPDATE MEX_USER_CRUD_DATA SET  M1=?, M2=?, M3=?  WHERE P1=?";
	stmt = con.PreparedStatement(sql);
	
	
	sql = " INSERT INTO MEX_USER_CRUD_DATA(P1,D1,D2,D3,D4,D5,D6,D7,D8,M1,M2,M3) "
	    + "                    VALUES (?, ?,?,?,?,?,?,?,?,?,?,?)";
	stmtInsert	 = con.PreparedStatement(sql);
	table.FetchRows(null);
	for(var r=0,len=table.getRowCount(); r<len;r++){
		row = table.getRow(r);
	  	status = row.getRowStatus(); 	
		var IDX = 0;
		if(status == "U"){		
			stmt.setDouble(++IDX , row.getDouble("M1"));
			stmt.setDouble(++IDX , row.getDouble("M2"));
			stmt.setDouble(++IDX , row.getDouble("M3"));			
			stmt.setString(++IDX , row.getString("P1")); 
			stmt.addBatch();
		}
		else if(status == "N"){		
			stmtInsert.setString(++IDX , util.getUniqueKey("P")); //primary key
			stmtInsert.setString(++IDX , row.getString("D1"));
			stmtInsert.setString(++IDX , row.getString("D2"));
			stmtInsert.setString(++IDX , row.getString("D3"));
			stmtInsert.setString(++IDX , row.getString("D4"));
			stmtInsert.setString(++IDX , row.getString("D5"));
			stmtInsert.setString(++IDX , row.getString("D6"));
			stmtInsert.setString(++IDX , row.getString("D7"));
			stmtInsert.setString(++IDX , row.getString("D8")); 
			stmtInsert.setDouble(++IDX , row.getDouble("M1"));
			stmtInsert.setDouble(++IDX , row.getDouble("M2"));
			stmtInsert.setDouble(++IDX , row.getDouble("M3"));
			stmtInsert.addBatch();
		}
		if(ROW_IDX > 100){
			stmt.executeBatch();	
			stmtInsert.executeBatch();	
			ROW_IDX = 0;
		} 
	
    }

	stmt.executeBatch();	
	stmtInsert.executeBatch();	
	  
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
}finally{
	if(stmt != null){
		try{			
			stmt.Close();
			stmt = null;
		}catch(e){
		}
	} 
	if(con != null){
		try{
			//con.RollBackTransaction();
			con.DisConnect();
			con = null;
		}catch(e){
		}
	}  
}