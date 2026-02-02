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
	sql = "INSERT INTO SM_COMMON_CODE (		"
		+ "\n     GROUP_CD	 				"
		+ "\n   , CODE						"
		+ "\n   , CODE_NAME					"
		+ "\n   , CODE_DESC  				"
		+ "\n   , SORT_ORDER 				"
		+ "\n   , USE_YN  					"
		+ "\n   , CREATED_AT  				"
		+ "\n   , CREATED_BY  				"
		+ "\n ) 							"
		+ "\n VALUES (  					"
		+ "\n     ?  						"
		+ "\n   , '$'  						"
		+ "\n   , ? 						"
		+ "\n   , ? 						"
		+ "\n   , 0 						"
		+ "\n   , 'Y' 						"
		+ "\n   , NOW()						"
		+ "\n   , ? 						"
		+ "\n );  							";
	
	stmt = con.PreparedStatement(sql);
	
	stmt.setString(1,req.getParam('VS_INP_GROUP_CODE'));// GROUP_CODE
	stmt.setString(2,req.getParam('VS_INP_GROUP_NAME'));// CODE_NAME
	stmt.setString(3,req.getParam('VS_INP_CODE_DESC')); // CODE_DESC
	stmt.setString(4,req.getUserCode()); 				// CREATED_BY
	
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