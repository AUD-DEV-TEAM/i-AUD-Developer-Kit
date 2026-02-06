import { Matrix } from "@AUD_SERVER/matrix/script/Matrix"; 

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