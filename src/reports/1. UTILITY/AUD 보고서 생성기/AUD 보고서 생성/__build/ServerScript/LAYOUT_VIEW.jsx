// Please do not modify or delete the following variables: "CALL_BACK", "Matrix". 
var req = Matrix.getRequest();
var res = Matrix.getResponse();
var session = Matrix.getSession();
var util = Matrix.getUtility();
var fso = Matrix.getFileSystemObject();
var con = Matrix.getConnection();
var wbModel = req.getParam("VS_FORM_LAYOUT");
if (!wbModel) {
    wbModel = req.getServerScript("@LAYOUT_JSON");
}
var wb = Matrix.CreateWorkBookByJson(wbModel);
wb.Calculate();
wb.getJsonConverter().WriteResponse(res, "V1");
