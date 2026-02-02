var req = Matrix.getRequest(); // request
//var table = req.getTable("GRID_NAME"); //get grid's work data
 
var con = Matrix.getConnection(); // dbms connection
var gen = Matrix.getQueryGenerator(); // query generator
var sql = "";
var stmt;

try{
	//connection
	con.Connect("AUD_SAMPLE_DB");// set target dbms connection code
	con.BeginTransaction();  // begin transaction	
	
	// UPDATE
	sql = "UPDATE SM_INVENTORY			 "
		+ "\n    SET PROD_ID  	 = ?     "
		+ "\n      , STORAGE_LOC = ?     "
		+ "\n      , CURR_QTY 	 = ?     "
		+ "\n      , SAFE_QTY	 = ?  	 "
		+ "\n      , UPDATED_AT  = NOW() "
		+ "\n      , UPDATED_BY  = ?     "
		+ "\n  WHERE INV_ID    	 = ?;    "
		
	stmt = con.PreparedStatement(sql);
	
	stmt.setString(1,req.getParam('VS_INP_PRODUCT'));	// PROD_ID
	stmt.setString(2,req.getParam('VS_INP_STORAGE')); 	// STORAGE_LOC
	stmt.setInt(3,req.getParam('VN_INP_CURR')); 		// CURR_QTY
	stmt.setInt(4,req.getParam('VN_INP_SAFE')); 		// SAFE_QTY
	stmt.setString(5,req.getUserCode()); 				// CREATED_BY
	stmt.setString(6,req.getParam('VS_INV_ID')); 		// INV_ID
	
	Matrix.WriteLog(sql);
	stmt.executeUpdate();
	stmt.close();
	stmt = null;
		
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