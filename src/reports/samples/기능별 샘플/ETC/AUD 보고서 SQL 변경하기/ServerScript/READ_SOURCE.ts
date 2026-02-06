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
 
const req = Matrix.getRequest();  /* Request */ 
const res = Matrix.getResponse(); /* Response */ 
const session  = Matrix.getSession(); /* Session */ 
const util = Matrix.getUtility(); /* Utility */ 
const fso = Matrix.getFileSystemObject(); /* File Access */ 
let   con = Matrix.getConnection(); /* DataBase Connection */ 
  
 
 var path = req.getParam("VS_REPORT_PATH");
 var report = util.JsonParse(util.ReadTextFile(path));
 var JSON = res.getJsonResponseWriter();
 var scriptText = [];
 var ServerScriptText = report["ServerScriptText"];
 if(ServerScriptText){
 	for(var i=0;i<ServerScriptText.length;i++){
		scriptText.push("SERVER-------------------------" + ServerScriptText[i].Name);
		scriptText.push(util.getDecrypt(ServerScriptText[i].ScriptText));
	}
 }
 scriptText.push("CLIENT----------------------");
 scriptText.push(report["ScriptText"]);
 JSON.beginObject()
 	 .addProperty("ScriptText", scriptText.join("\n"))
     .endObject()
	 .close(); 
	 
 res.WriteResponseTextFile(path);