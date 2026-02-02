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
	sql = " INSERT INTO SM_PRODUCT ( 															"
		+ "\n     PROD_ID 																		"
		+ "\n   , PROD_NAME																		"
		+ "\n   , CATEGORY																		"
		+ "\n   , STD_PRICE  																	"
		+ "\n   , COST_PRICE 																	"
		+ "\n   , STD_UNIT  																	"
		+ "\n   , CREATED_AT  																	"
		+ "\n   , CREATED_BY  																	"
		+ "\n ) 																				"
		+ "\n VALUES (  																		"
		+ "\n     (SELECT 'PROD'  																"
		+ "\n           || RIGHT('000' || 														"
		+ "\n                   CAST(COALESCE(MAX(SUBSTRING(PROD_ID, 5)),'0') AS INTEGER) + 1 	"
		+ "\n                 , 3) AS PROD_ID 													"
		+ "\n       FROM SM_PRODUCT) 															"
		+ "\n   , ? 																			"
		+ "\n   , ?  																			"
		+ "\n   , ? 																			"
		+ "\n   , ? 																			"
		+ "\n   , ?  																			"
		+ "\n   , NOW()																			"
		+ "\n   , ? 																			"
		+ "\n );  																				";
	
	stmt = con.PreparedStatement(sql);
	
	stmt.setString(1,req.getParam('VS_INP_PROD'));	// PROD_NAME
	stmt.setString(2,req.getParam('VS_INP_CAT')); 	// CATEGORY
	stmt.setInt(3,req.getParam('VS_INP_PRICE')); 	// STD_PRICE
	stmt.setInt(4,req.getParam('VS_INP_COST')); 	// COST_PRICE
	stmt.setString(5,req.getParam('VS_INP_UNIT')); 	// STD_UNIT
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