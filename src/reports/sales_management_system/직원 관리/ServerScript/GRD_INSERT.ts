import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection";

 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK : Function;
let Matrix : Matrix;

const req = Matrix.getRequest(); // request

let con = Matrix.getConnection(); // dbms connection
let sql = "";
let stmt;

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
	
	let IDX = 0;
	stmt.setString(++IDX,req.getParam('VS_INP_NAME'));		// EMP_NAME
	stmt.setString(++IDX,req.getParam('VS_INP_DEPT'));		// DEPT_ID
	stmt.setString(++IDX,req.getParam('VS_INP_POSITION'));	// JOB_GRADE
	stmt.setString(++IDX,req.getParam('VS_INP_STATUS'));	// EMP_STATUS
	stmt.setString(++IDX,req.getParam('VS_INP_EMAIL'));		// EMAIL
	stmt.setString(++IDX,req.getParam('VS_INP_PHONE'));		// PHONE
	stmt.setString(++IDX,req.getParam('VS_INP_HIRE'));		// HIRE_DATE
	stmt.setString(++IDX,req.getUserCode());				// CREATED_BY
	
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