import { Matrix } from "@AUD_SERVER/matrix/script/Matrix"; 
import { ScriptRecordSet } from "@AUD_SERVER/matrix/script/ScriptRecordSet"; 
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement"; 
import { ScriptDataRow } from "@AUD_SERVER/matrix/script/ScriptDataRow"; 
import { ScriptTextFileWriter } from "@AUD_SERVER/matrix/script/io/ScriptTextFileWriter"; 
import { ScriptRequestPacket } from "@AUD_SERVER/matrix/script/ScriptRequestPacket"; 
import { ScriptResponsePacket } from "@AUD_SERVER/matrix/script/ScriptResponsePacket"; 
import { ScriptUtility } from "@AUD_SERVER/matrix/script/ScriptUtility"; 
import { ScriptFileSystemObject } from "@AUD_SERVER/matrix/script/ScriptFileSystemObject";  
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection"; 
import { ScriptSession } from "@AUD_SERVER/matrix/script/ScriptSession"; 
import { ScriptQueryGenerator } from "@AUD_SERVER/matrix/script/ScriptQueryGenerator"; 

 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix". 
let CALL_BACK : Function;
let Matrix : Matrix; 
 
const req = Matrix.getRequest(); 
const res = Matrix.getResponse(); 
const session  = Matrix.getSession(); 
const util = Matrix.getUtility(); 
const fso = Matrix.getFileSystemObject(); 
let  con = Matrix.getConnection(); 
 
/*************************************************************
 * SAMPLE #1 single table insert
 *************************************************************/
 
var sql = "";  
var status = "";
var row = null;	
var stmt = null;
var stmtInsert = null;
var ROW_IDX  = 0;
try{
	//connection
	con.Connect("MTXRPTY");// set target dbms connection code
	con.BeginTransaction();  // begin transaction	 
	
	 
	//------------------------------------------------------
	// save table data
	//------------------------------------------------------	
	var table = req.getTable("OlapGrid"); //get grid's work data
	
	sql = "UPDATE MEX_USER_CRUD_DATA SET  M1=?, M2=?, M3=?  WHERE P1=?";
	stmt = con.PreparedStatement(sql);
	
	
	sql = " INSERT INTO MEX_USER_CRUD_DATA(P1,D1,D2,D3,D4,D5,D6,D7,D8,M1,M2,M3) "
	    + "                    VALUES (?, ?,?,?,?,?,?,?,?,?,?,?)";
	stmtInsert	 = con.PreparedStatement(sql);
	
	/* OLAP은 데이터가 많을 수 있으므로 Callback를 수행한다.  */
	table.FetchRows(CALL_BACK(function(row){
        ROW_IDX ++;
	  	status = row.getRowStatus(); 	
		var IDX = 0;
		if(status == "U"){		
			stmt.setDouble(++IDX , row.getDouble("M1"));
			stmt.setDouble(++IDX , row.getDouble("M2"));
			stmt.setDouble(++IDX , row.getDouble("M3"));			
			stmt.setString(++IDX , row.getString("P1")); 
			stmt.addBatch();
		}
		else if(status == "N"){		
			stmtInsert.setString(++IDX , util.getUniqueKey("P")); //primary key
			stmtInsert.setString(++IDX , row.getString("D1"));
			stmtInsert.setString(++IDX , row.getString("D2"));
			stmtInsert.setString(++IDX , row.getString("D3"));
			stmtInsert.setString(++IDX , row.getString("D4"));
			stmtInsert.setString(++IDX , row.getString("D5"));
			stmtInsert.setString(++IDX , row.getString("D6"));
			stmtInsert.setString(++IDX , row.getString("D7"));
			stmtInsert.setString(++IDX , row.getString("D8")); 
			stmtInsert.setDouble(++IDX , row.getDouble("M1"));
			stmtInsert.setDouble(++IDX , row.getDouble("M2"));
			stmtInsert.setDouble(++IDX , row.getDouble("M3"));
			stmtInsert.addBatch();
		}
		if(ROW_IDX > 100){
			stmt.executeBatch();	
			stmtInsert.executeBatch();	
			ROW_IDX = 0;
		} 
		return null;
    }));

	stmt.executeBatch();	
	stmtInsert.executeBatch();	
	  
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
}finally{
	if(stmt != null){
		try{			
			stmt.Close();
			stmt = null;
		}catch(e){
		}
	} 
	if(con != null){
		try{
			//con.RollBackTransaction();
			con.DisConnect();
			con = null;
		}catch(e){
		}
	}  
}