// Please do not modify or delete the following variables: "CALL_BACK", "Matrix". 
var req = Matrix.getRequest();
var res = Matrix.getResponse();
var session = Matrix.getSession();
var util = Matrix.getUtility();
var fso = Matrix.getFileSystemObject();
var con = Matrix.getConnection();
var sqls = [];
var stmt;
try {
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
    var rs = stmt.ExecuteRecordSet();
    var RESULT_CONTROLS = {};
    while (rs.next()) {
        RESULT_CONTROLS[rs.getString('CONTROL_CODE')] = {
            "CONTROL_NAME": rs.getString("CONTROL_NAME"),
            "VAR_NAMES": rs.getString("VAR_NAMES"),
            "CONTROL_WIDTH": rs.getInt("CONTROL_WIDTH"),
            "CONTROL_HEIGHT": rs.getInt("CONTROL_HEIGHT")
        };
        RESULT_CONTROLS[rs.getString('CONTROL_NAME')] = {
            "CONTROL_NAME": rs.getString("CONTROL_NAME"),
            "VAR_NAMES": rs.getString("VAR_NAMES"),
            "CONTROL_WIDTH": rs.getInt("CONTROL_WIDTH"),
            "CONTROL_HEIGHT": rs.getInt("CONTROL_HEIGHT")
        };
    }
    stmt.close();
    stmt = null;
    con.DisConnect();
    res.WriteResponseText(JSON.stringify(RESULT_CONTROLS));
}
catch (e) {
    Matrix.ThrowException("INIT_DATA FAIL " + e.message);
}
finally {
    if (stmt != null) {
        stmt.close();
    }
    con.DisConnect();
}
