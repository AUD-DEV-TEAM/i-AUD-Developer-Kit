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
	
	let IDX = 0;
	stmt.setString(++IDX,req.getParam('VS_INP_YMD'));		// SALES_DATE
	stmt.setString(++IDX,req.getParam('VS_INP_PIC'));		// EMP_ID
	stmt.setString(++IDX,req.getParam('VS_INP_CUST'));		// CUST_ID
	stmt.setString(++IDX,req.getParam('VS_INP_PROD'));		// PROD_ID
	stmt.setInt(++IDX,req.getParam('VN_INP_QTY'));			// QTY
	stmt.setInt(++IDX,req.getParam('VN_INP_PRICE'));		// UNIT_PRICE
	stmt.setInt(++IDX,req.getParam('VN_INP_COST'));			// COST_AMOUNT
	stmt.setString(++IDX,req.getParam('VS_INP_STATUS'));	// SALES_STATUS
	stmt.setString(++IDX,req.getUserCode());				// UPDATED_BY
	stmt.setString(++IDX,req.getParam('VS_INP_ID'));		// SALES_ID
	
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