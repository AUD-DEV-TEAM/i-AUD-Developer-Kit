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
	sql = "UPDATE SM_INVENTORY			 "
		+ "\n    SET PROD_ID  	 = ?     "
		+ "\n      , STORAGE_LOC = ?     "
		+ "\n      , CURR_QTY 	 = ?     "
		+ "\n      , SAFE_QTY	 = ?  	 "
		+ "\n      , UPDATED_AT  = NOW() "
		+ "\n      , UPDATED_BY  = ?     "
		+ "\n  WHERE INV_ID    	 = ?;    "
		
	stmt = con.PreparedStatement(sql);
	
	let IDX = 0;
	stmt.setString(++IDX,req.getParam('VS_INP_PRODUCT'));	// PROD_ID
	stmt.setString(++IDX,req.getParam('VS_INP_STORAGE'));	// STORAGE_LOC
	stmt.setInt(++IDX,req.getParam('VN_INP_CURR'));			// CURR_QTY
	stmt.setInt(++IDX,req.getParam('VN_INP_SAFE'));			// SAFE_QTY
	stmt.setString(++IDX,req.getUserCode());				// UPDATED_BY
	stmt.setString(++IDX,req.getParam('VS_INV_ID'));		// INV_ID
	
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