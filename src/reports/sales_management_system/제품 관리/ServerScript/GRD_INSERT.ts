import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement";

 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK : Function;
let Matrix : Matrix;

const req = Matrix.getRequest();  /* Request */
let   con = Matrix.getConnection(); /* DataBase Connection */
const gen = Matrix.getQueryGenerator();
const DATE_TIME_NOW = gen.getDateTimeNowString(con.getDbType());

let sql = "";
let stmt : ScriptPreparedStatement;

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
		+ "\n 	(SELECT 'PROD'																	"
		+ "\n         || CAST(																	"
		+ "\n             	COALESCE(MAX(CAST(SUBSTR(PROD_ID, 5,3) AS INTEGER)), 0) + 1			"
		+ "\n            AS VARCHAR) AS PROD_ID													"
		+ "\n 		FROM SM_PRODUCT)															"
		+ "\n   , ? 																			"
		+ "\n   , ?  																			"
		+ "\n   , ? 																			"
		+ "\n   , ? 																			"
		+ "\n   , ?  																			"
		+ "\n   , " + DATE_TIME_NOW + "															"
		+ "\n   , ? 																			"
		+ "\n );  																				";
	
	stmt = con.PreparedStatement(sql);
	
	let IDX = 0;
	stmt.setString(++IDX,req.getParam('VS_INP_PROD'));		// PROD_NAME
	stmt.setString(++IDX,req.getParam('VS_INP_CAT'));		// CATEGORY
	stmt.setInt(++IDX,Number(req.getParam('VS_INP_PRICE')));// STD_PRICE
	stmt.setInt(++IDX,Number(req.getParam('VS_INP_COST')));	// COST_PRICE
	stmt.setString(++IDX,req.getParam('VS_INP_UNIT'));		// STD_UNIT
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