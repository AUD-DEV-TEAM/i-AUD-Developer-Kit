var req = Matrix.getRequest();
var res = Matrix.getResponse();
var util = Matrix.getUtility(); 
 var fso = Matrix.getFileSystemObject();
 var util = Matrix.getUtility();
 
 
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