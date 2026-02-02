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
	sql = "\n UPDATE SM_PRODUCT        "
		+ "\n    SET PROD_NAME  = ?     "
		+ "\n      , CATEGORY   = ?    	"
		+ "\n      , STD_PRICE  = ?     "
		+ "\n      , COST_PRICE = ?    	"
		+ "\n      , STD_UNIT	= ?  	"
		+ "\n      , UPDATED_AT = NOW()	"
		+ "\n      , UPDATED_BY = ?    	"
		+ "\n  WHERE PROD_ID    = ?;    "

	stmt = con.PreparedStatement(sql);
	
	stmt.setString(1,req.getParam('VS_INP_PROD'));	// PROD_NAME
	stmt.setString(2,req.getParam('VS_INP_CAT')); 	// CATEGORY
	stmt.setInt(3,req.getParam('VS_INP_PRICE')); 	// STD_PRICE
	stmt.setInt(4,req.getParam('VS_INP_COST')); 	// COST_PRICE
	stmt.setString(5,req.getParam('VS_INP_UNIT')); 	// STD_UNIT
	stmt.setString(6,req.getUserCode()); 			// CREATED_BY
	stmt.setString(7,req.getParam('VS_PROD_ID')); 	// PROD_ID
	
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