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
	sql = "UPDATE SM_SALES_PLAN			 			"
		+ "\n    SET PLAN_YEAR   = SUBSTR(?, 1, 4)  "
		+ "\n      , PLAN_MONTH  = SUBSTR(?, 5, 2)  "
		+ "\n      , EMP_ID 	 = ?     			"
		+ "\n      , PROD_ID 	 = ?     			"
		+ "\n      , TARGET_QTY	 = ?  	 			"
		+ "\n      , TARGET_AMT	 = ?  	 			"
		+ "\n      , PLAN_STATUS = ?  	 			"
		+ "\n      , UPDATED_AT  = NOW() 			"
		+ "\n      , UPDATED_BY  = ?     			"
		+ "\n  WHERE PLAN_ID     = ?;   			"
		
		
	stmt = con.PreparedStatement(sql);
	
	stmt.setString(1,req.getParam('VS_INP_YM')); 	// PLAN_YEAR
	stmt.setString(2,req.getParam('VS_INP_YM')); 	// PLAN_MONTH
	stmt.setString(3,req.getParam('VS_INP_PIC')); 	// EMP_ID
	stmt.setString(4,req.getParam('VS_INP_PROD')); 	// PROD_ID
	stmt.setInt(5,req.getParam('VN_INP_QTY')); 		// TARGET_QTY
	stmt.setInt(6,req.getParam('VN_INP_AMT')); 		// TARGET_AMT
	stmt.setString(7,req.getParam('VS_INP_STATUS'));// PLAN_STATUS
	stmt.setString(8,req.getUserCode()); 			// UPDATED_BY
	stmt.setString(9,req.getParam('VS_INP_ID')); 	// PLAN_ID
	
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