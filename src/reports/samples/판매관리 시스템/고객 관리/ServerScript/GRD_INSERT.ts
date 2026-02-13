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
let stmt : ScriptPreparedStatement = null;

try{
	//connection
	con.Connect("AUD_SAMPLE_DB");// set target dbms connection code
	con.BeginTransaction();  // begin transaction

	// INSERT
	sql = " INSERT INTO SM_CUSTOMER ( 															"
		+ "\n     CUST_ID 																		"
		+ "\n   , CUST_NAME																		"
		+ "\n   , BIZ_REG_NO  																	"
		+ "\n   , CUST_TYPE 																	"
		+ "\n   , CUST_GRADE  																	"
		+ "\n   , CREDIT_LIMIT  																"
		+ "\n   , PHONE 																		"
		+ "\n   , EMAIL 																		"
		+ "\n   , ADDR_MAIN 																	"
		+ "\n   , CREATED_AT  																	"
		+ "\n   , CREATED_BY  																	"
		+ "\n ) 																				"
		+ "\n VALUES (  																		"
		+ "\n 	(SELECT 'CUST'																	"
		+ "\n         || LPAD(CAST(																"
		+ "\n             	COALESCE(MAX(CAST(SUBSTR(CUST_ID, 5,3) AS INTEGER)), 0) + 1			"
		+ "\n            AS VARCHAR),3,'0') AS CUST_ID											"
		+ "\n 		FROM SM_CUSTOMER)															"
		+ "\n   , ?  																			"
		+ "\n   , ? 																			"
		+ "\n   , ?  																			"
		+ "\n   , ? 																			"
		+ "\n   , ? 																			"
		+ "\n   , ?  																			"
		+ "\n   , ?  																			"
		+ "\n   , ?  																			"
		+ "\n   , " + DATE_TIME_NOW + "															"
		+ "\n   , ? 																			"
		+ "\n );  																				";

	stmt = con.PreparedStatement(sql);

	let IDX = 0;
	stmt.setString(++IDX,req.getParam('VS_INP_NAME'));		// CUST_NAME
	stmt.setString(++IDX,req.getParam('VS_INP_REG_NO'));	// BIZ_REG_NO
	stmt.setString(++IDX,req.getParam('VS_INP_TYPE'));		// CUST_TYPE
	stmt.setString(++IDX,req.getParam('VS_INP_GRADE'));		// CUST_GRADE
	stmt.setInt(++IDX,Number(req.getParam('VN_INP_LIMIT')));	// CREDIT_LIMIT
	stmt.setString(++IDX,req.getParam('VS_INP_PHONE'));		// PHONE
	stmt.setString(++IDX,req.getParam('VS_INP_EMAIL'));		// EMAIL
	stmt.setString(++IDX,req.getParam('VS_INP_MAIN'));		// ADDR_MAIN
	stmt.setString(++IDX,req.getUserCode());				// CREATED_BY

	Matrix.WriteLog(sql);
	stmt.executeUpdate();
	stmt.close();
	stmt = null;

	// COMMIT
	con.CommitTransaction();

}catch(e){
	Matrix.WriteLog("ERROR" + e.message);
	if(con != null){
		try{
			con.RollBackTransaction();
		}catch(e){}
	}
	Matrix.ThrowException("고객 등록 중 오류가 발생하였습니다.");
}finally{
	if(stmt){
		stmt.close();
	}
	if(con){
		con.DisConnect();
	}
}
