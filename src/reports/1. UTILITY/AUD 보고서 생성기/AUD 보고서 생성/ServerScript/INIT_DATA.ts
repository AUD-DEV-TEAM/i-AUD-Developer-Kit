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

let sqls: Array<string> = [];
let stmt : ScriptPreparedStatement;
try{
    con.Connect("MTXRPTY");
    
    sqls.push("    SELECT   CONTROL_CODE");
    sqls.push("        ,CONTROL_NAME");
    sqls.push("        ,VAR_NAMES");
    sqls.push("        ,CONTROL_WIDTH");
    sqls.push("        ,CONTROL_HEIGHT ");
    sqls.push("    FROM AUD_USER_CONTROL");
    sqls.push("    WHERE DELETE_YN <> 'Y'");
    sqls.push("    ORDER BY CONTROL_NAME ASC ");
    
    stmt = con.PreparedStatement(sqls.join("\n"));
    
    let rs = stmt.ExecuteRecordSet();

    let  RESULT_CONTROLS = {};
    while(rs.next()){

        RESULT_CONTROLS[rs.getString('CONTROL_CODE')] = {
            "CONTROL_NAME" : rs.getString("CONTROL_NAME")
            ,"VAR_NAMES"     : rs.getString("VAR_NAMES")
            ,"CONTROL_WIDTH" : rs.getInt("CONTROL_WIDTH")
            ,"CONTROL_HEIGHT" : rs.getInt("CONTROL_HEIGHT") 
        };  
        RESULT_CONTROLS[rs.getString('CONTROL_NAME')] = {
            "CONTROL_NAME" : rs.getString("CONTROL_NAME")
            ,"VAR_NAMES"     : rs.getString("VAR_NAMES")
            ,"CONTROL_WIDTH" : rs.getInt("CONTROL_WIDTH")
            ,"CONTROL_HEIGHT" : rs.getInt("CONTROL_HEIGHT") 
        };  
    }
    stmt.close();
    stmt = null;

    con.DisConnect();

    res.WriteResponseText(JSON.stringify(RESULT_CONTROLS));


}catch(e){
    Matrix.ThrowException("INIT_DATA FAIL "+ e.message);
}finally{

    if(stmt != null){
        stmt.close();
    }
    con.DisConnect();
}