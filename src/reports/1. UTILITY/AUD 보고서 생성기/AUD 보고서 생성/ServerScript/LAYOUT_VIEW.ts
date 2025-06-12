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
 

let wbModel = req.getParam("VS_FORM_LAYOUT"); 
if(!wbModel){
    wbModel  = req.getServerScript("@LAYOUT_JSON");  
}
 
let wb = Matrix.CreateWorkBookByJson(wbModel);
wb.Calculate();
wb.getJsonConverter().WriteResponse(res, "V1");