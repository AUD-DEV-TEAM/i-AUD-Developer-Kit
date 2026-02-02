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
	
	// UPDATE
	sql = "\n UPDATE SM_EMPLOYEE        						"
		+ "\n    SET EMP_NAME   = ?     						"
		+ "\n      , DEPT_ID    = ?    							"
		+ "\n      , JOB_GRADE  = ?     						"
		+ "\n      , EMP_STATUS = ?    							"
		+ "\n      , EMAIL		= ?  							"
		+ "\n      , PHONE      = ?     						"
		+ "\n      , HIRE_DATE  = TO_TIMESTAMP(?, 'YYYYMMDD')	"
		+ "\n      , UPDATED_AT = NOW()							"
		+ "\n      , UPDATED_BY = ?    							"
		+ "\n  WHERE EMP_ID     = ?;    						"

	stmt = con.PreparedStatement(sql);
	
	stmt.setString(1,req.getParam('VS_INP_NAME'));		// EMP_NAME
	stmt.setString(2,req.getParam('VS_INP_DEPT'));		// DEPT_ID
	stmt.setString(3,req.getParam('VS_INP_POSITION')); 	// JOB_GRADE
	stmt.setString(4,req.getParam('VS_INP_STATUS')); 	// EMP_STATUS
	stmt.setString(5,req.getParam('VS_INP_EMAIL')); 	// EMAIL
	stmt.setString(6,req.getParam('VS_INP_PHONE')); 	// PHONE
	stmt.setString(7,req.getParam('VS_INP_HIRE')); 		// HIRE_DATE
	stmt.setString(8,req.getUserCode()); 				// CREATED_BY
	stmt.setString(9,req.getParam('VS_EMP_ID'));		// EMP_ID
	
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