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
const util = Matrix.getUtility(); 
let  con = Matrix.getConnection(); 

let sqls: Array<string> = [];
let GRD_MAIN = req.getTable("GRD_MAIN");
let updateStmt : ScriptPreparedStatement;
let insertStmt : ScriptPreparedStatement;
let deleteStmt : ScriptPreparedStatement;
let gen : ScriptQueryGenerator = Matrix.getQueryGenerator();
try{
    con.Connect("MTXRPTY");

    con.BeginTransaction();

    // INSERT STMT
    sqls = [];
    sqls.push("INSERT INTO AUD_USER_CONTROL (");
    sqls.push("    CONTROL_CODE 		,CONTROL_TYPE        ,CONTROL_NAME 		,CONTROL_DESC ");
    sqls.push("    ,CONTROL_BODY 		,VAR_NAMES      ,CONTROL_WIDTH 		,CONTROL_HEIGHT ");
    sqls.push("    ,DELETE_YN 		    ,CREATE_USER 		,CREATE_DATE )");
    sqls.push(" VALUES (? 		,? 		,?      ,? ");
    sqls.push("        ,? 		,? 		,?      ,? ");
    sqls.push("        ,'N'    ,? 		,"+ gen.getDateTimeNowString(con.getDbType()) +") ");
    insertStmt = con.PreparedStatement(sqls.join("\n"));
 
    //UPDATE STMT
    sqls = [];
    sqls.push("    UPDATE AUD_USER_CONTROL ");
    sqls.push("    SET  CONTROL_TYPE = ?  	");
    sqls.push("       ,  CONTROL_NAME = ?  	");
    sqls.push("       ,  CONTROL_DESC = ?  	");
    sqls.push("       ,  CONTROL_BODY = ?  	");
    sqls.push("       ,  VAR_NAMES = ?  	");
    sqls.push("       ,  CONTROL_WIDTH = ?  	");
    sqls.push("       ,  CONTROL_HEIGHT = ?  	");
    sqls.push("       ,  DELETE_YN = ?  	");
    sqls.push("       ,  MODIFY_USER = ?  	");
    sqls.push("       ,  MODIFY_DATE = " + gen.getDateTimeNowString(con.getDbType()));
    sqls.push("    WHERE  CONTROL_CODE = ? ");
    updateStmt = con.PreparedStatement(sqls.join("\n"));
 
    //DELETE STMT
    sqls = [];
    sqls.push("    UPDATE AUD_USER_CONTROL ");
    sqls.push("    SET   DELETE_YN = 'Y'  	");
    sqls.push("       ,  MODIFY_USER = ?  	");
    sqls.push("       ,  MODIFY_DATE = " + gen.getDateTimeNowString(con.getDbType()));
    sqls.push("    WHERE  CONTROL_CODE = ? ");
    deleteStmt = con.PreparedStatement(sqls.join("\n"));

    let cntOfInsert = 0;
    let cntOfUpdate = 0;
    let cntOfDelete = 0;
    
    for(let r=0,r2=GRD_MAIN.getRowCount(); r<r2;r++){
        let row = GRD_MAIN.getRow(r);
        let IDX = 0;
        if("N" == row.getRowStatus()){
            insertStmt.clearParameters();
            insertStmt.setString(++IDX, util.getUniqueKey("CTL"));
            insertStmt.setString(++IDX, row.getString("CONTROL_TYPE"));
            insertStmt.setString(++IDX, row.getString("CONTROL_NAME"));
            insertStmt.setString(++IDX, row.getString("CONTROL_DESC"));
            insertStmt.setCharacterStream(++IDX, row.getString("CONTROL_BODY"));
            insertStmt.setString(++IDX, row.getString("VAR_NAMES"));
            insertStmt.setInt(++IDX, row.getInt("CONTROL_WIDTH"));
            insertStmt.setInt(++IDX, row.getInt("CONTROL_HEIGHT"));
            insertStmt.setString(++IDX, req.getUserCode());
            insertStmt.addBatch();            
            cntOfInsert ++;
        } else if("U" == row.getRowStatus()){
            updateStmt.clearParameters();
            updateStmt.setString(++IDX, row.getString("CONTROL_TYPE"));
            updateStmt.setString(++IDX, row.getString("CONTROL_NAME"));
            updateStmt.setString(++IDX, row.getString("CONTROL_DESC"));
            updateStmt.setCharacterStream(++IDX, row.getString("CONTROL_BODY"));
            updateStmt.setString(++IDX, row.getString("VAR_NAMES"));
            updateStmt.setInt(++IDX, row.getInt("CONTROL_WIDTH"));
            updateStmt.setInt(++IDX, row.getInt("CONTROL_HEIGHT"));
            updateStmt.setString(++IDX, row.getString("DELETE_YN"));
            updateStmt.setString(++IDX, req.getUserCode());
            updateStmt.setString(++IDX, row.getString("CONTROL_CODE"));
            updateStmt.addBatch();
            cntOfUpdate ++;
        }else if("D" == row.getRowStatus()){
            deleteStmt.clearParameters();
            deleteStmt.setString(++IDX, req.getUserCode());
            deleteStmt.setString(++IDX, row.getString("CONTROL_CODE"));
            deleteStmt.addBatch();
            cntOfDelete ++;
        }
    }
        
    if(cntOfDelete > 0){
        deleteStmt.executeBatch();
    }
    if(cntOfUpdate > 0){
        updateStmt.executeBatch();
    }
    if(cntOfInsert > 0){
        insertStmt.executeBatch();
    }
    insertStmt.close();
    insertStmt = null;
    deleteStmt.close();
    deleteStmt = null;
    updateStmt.close();
    updateStmt = null;
    con.CommitTransaction();
    
}catch(e){
    con.RollBackTransaction();
    Matrix.ThrowException("저장 실패 !!" + e.message);
}finally{
    if(deleteStmt){
        deleteStmt.close();
    }
    if(updateStmt){
        updateStmt.close();
    }
    if(insertStmt){
        insertStmt.close();
    }
    if(con){
        con.DisConnect();
    }
}