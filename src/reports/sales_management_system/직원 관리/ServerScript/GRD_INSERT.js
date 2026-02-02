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
	sql = " INSERT INTO SM_EMPLOYEE ( 															"
		+ "\n     EMP_ID 																		"
		+ "\n   , EMP_NAME																		"
		+ "\n   , DEPT_ID																		"
		+ "\n   , JOB_GRADE  																	"
		+ "\n   , EMP_STATUS 																	"
		+ "\n   , EMAIL  																		"
		+ "\n   , PHONE  																		"
		+ "\n   , HIRE_DATE 																	"
		+ "\n   , CREATED_AT  																	"
		+ "\n   , CREATED_BY  																	"
		+ "\n ) 																				"
		+ "\n VALUES (  																		"
		+ "\n     (SELECT 'EMP'  																"
		+ "\n           || RIGHT('000' || 														"
		+ "\n                   CAST(COALESCE(MAX(SUBSTRING(EMP_ID, 5)),'0') AS INTEGER) + 1 	"
		+ "\n                 , 3) AS EMP_ID 													"
		+ "\n       FROM SM_EMPLOYEE) 															"
		+ "\n   , ?  																			"
		+ "\n   , ? 																			"
		+ "\n   , ?  																			"
		+ "\n   , ? 																			"
		+ "\n   , ? 																			"
		+ "\n   , ?  																			"
		+ "\n   , TO_TIMESTAMP(?, 'YYYYMMDD') 													"
		+ "\n   , NOW()																			"
		+ "\n   , ? 																			"
		+ "\n );  																				";
	
	stmt = con.PreparedStatement(sql);
	
	stmt.setString(1,req.getParam('VS_INP_NAME'));		// EMP_NAME
	stmt.setString(2,req.getParam('VS_INP_DEPT'));		// DEPT_ID
	stmt.setString(3,req.getParam('VS_INP_POSITION')); 	// JOB_GRADE
	stmt.setString(4,req.getParam('VS_INP_STATUS')); 	// EMP_STATUS
	stmt.setString(5,req.getParam('VS_INP_EMAIL')); 	// EMAIL
	stmt.setString(6,req.getParam('VS_INP_PHONE')); 	// PHONE
	stmt.setString(7,req.getParam('VS_INP_HIRE')); 		// HIRE_DATE
	stmt.setString(8,req.getUserCode()); 				// CREATED_BY
	
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