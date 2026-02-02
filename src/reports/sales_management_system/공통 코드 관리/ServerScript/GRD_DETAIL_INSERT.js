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
	
	// INSERT
	sql = "INSERT INTO SM_COMMON_CODE (		"
		+ "\n     GROUP_CD	 				"
		+ "\n   , CODE						"
		+ "\n   , CODE_NAME					"
		+ "\n   , SORT_ORDER 				"
		+ "\n   , USE_YN  					"
		+ "\n   , CREATED_AT  				"
		+ "\n   , CREATED_BY  				"
		+ "\n ) 							"
		+ "\n VALUES (  					"
		+ "\n     ?  						"
		+ "\n   , ?  						"
		+ "\n   , ? 						"
		+ "\n   , ? 						"
		+ "\n   , ? 						"
		+ "\n   , NOW()						"
		+ "\n   , ? 						"
		+ "\n );  							";
	
	stmt = con.PreparedStatement(sql);
	
	stmt.setString(1,req.getParam('VS_GROUP_CODE'));// GROUP_CD
	stmt.setString(2,req.getParam('VS_INP_CODE'));	// CODE
	stmt.setString(3,req.getParam('VS_CODE_NAME')); // CODE_NAME
	stmt.setInt(4,req.getParam('VN_SORT')); 		// SORT_ORDER
	stmt.setString(5,req.getParam('VS_USE_YN')); 	// USE_YN
	stmt.setString(6,req.getUserCode()); 			// CREATED_BY
	
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