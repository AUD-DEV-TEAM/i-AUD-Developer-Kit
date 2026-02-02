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
	sql = "UPDATE SM_COMMON_CODE	 			"
		+ "\n    SET CODE_NAME  	= ?  		"
		+ "\n      , SORT_ORDER 	= ?  		"
		+ "\n      , USE_YN 		= ?  		"
		+ "\n      , UPDATED_AT  	= NOW()		"
		+ "\n      , UPDATED_BY  	= ?     	"
		+ "\n  WHERE GROUP_CD     	= ?   		"
		+ "\n    AND CODE     		= ?;   		"
		
	stmt = con.PreparedStatement(sql);
	
	stmt.setString(1,req.getParam('VS_CODE_NAME')); // CODE_NAME
	stmt.setInt(2,req.getParam('VN_SORT')); 		// SORT_ORDER
	stmt.setString(3,req.getParam('VS_USE_YN')); 	// USE_YN
	stmt.setString(4,req.getUserCode()); 			// UPDATED_BY
	stmt.setString(5,req.getParam('VS_GROUP_CODE'));// GROUP_CD
	stmt.setString(6,req.getParam('VS_INP_CODE'));	// CODE
	
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