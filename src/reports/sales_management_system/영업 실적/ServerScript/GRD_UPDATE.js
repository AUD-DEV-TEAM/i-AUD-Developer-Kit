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
	sql = "UPDATE SM_SALES_PERFORMANCE	 							"
		+ "\n    SET SALES_DATE		= TO_TIMESTAMP(?, 'YYYYMMDD')  	"
		+ "\n      , EMP_ID  		= ?  							"
		+ "\n      , CUST_ID 		= ?  							"
		+ "\n      , PROD_ID 		= ?  							"
		+ "\n      , QTY			= ?  							"
		+ "\n      , UNIT_PRICE	 	= ?  							"
		+ "\n      , COST_AMOUNT 	= ?  							"
		+ "\n      , SALES_STATUS 	= ?								"
		+ "\n      , UPDATED_AT  	= NOW()							"
		+ "\n      , UPDATED_BY  	= ?     						"
		+ "\n  WHERE SALES_ID     	= ?;   							"
		
	stmt = con.PreparedStatement(sql);
	
	stmt.setString(1,req.getParam('VS_INP_YMD')); 	// SALES_DATE
	stmt.setString(2,req.getParam('VS_INP_PIC')); 	// EMP_ID
	stmt.setString(3,req.getParam('VS_INP_CUST')); 	// CUST_ID
	stmt.setString(4,req.getParam('VS_INP_PROD')); 	// PROD_ID
	stmt.setInt(5,req.getParam('VN_INP_QTY')); 		// QTY
	stmt.setInt(6,req.getParam('VN_INP_PRICE')); 	// UNIT_PRICE
	stmt.setInt(7,req.getParam('VN_INP_COST'));		// COST_AMOUNT
	stmt.setString(8,req.getParam('VS_INP_STATUS'));// SALES_STATUS
	stmt.setString(9,req.getUserCode()); 			// CREATED_BY
	stmt.setString(10,req.getParam('VS_INP_ID')); 	// SALES_ID
	
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