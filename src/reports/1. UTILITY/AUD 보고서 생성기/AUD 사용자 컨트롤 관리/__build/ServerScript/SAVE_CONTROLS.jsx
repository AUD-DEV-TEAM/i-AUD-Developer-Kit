// Please do not modify or delete the following variables: "CALL_BACK", "Matrix". 
var req = Matrix.getRequest();
var util = Matrix.getUtility();
var con = Matrix.getConnection();
var sqls = [];
var GRD_MAIN = req.getTable("GRD_MAIN");
var updateStmt;
var insertStmt;
var deleteStmt;
var gen = Matrix.getQueryGenerator();
try {
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
    sqls.push("        ,'N'    ,? 		," + gen.getDateTimeNowString(con.getDbType()) + ") ");
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
    var cntOfInsert = 0;
    var cntOfUpdate = 0;
    var cntOfDelete = 0;
    for (var r = 0, r2 = GRD_MAIN.getRowCount(); r < r2; r++) {
        var row = GRD_MAIN.getRow(r);
        var IDX = 0;
        if ("N" == row.getRowStatus()) {
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
            cntOfInsert++;
        }
        else if ("U" == row.getRowStatus()) {
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
            cntOfUpdate++;
        }
        else if ("D" == row.getRowStatus()) {
            deleteStmt.clearParameters();
            deleteStmt.setString(++IDX, req.getUserCode());
            deleteStmt.setString(++IDX, row.getString("CONTROL_CODE"));
            deleteStmt.addBatch();
            cntOfDelete++;
        }
    }
    if (cntOfDelete > 0) {
        deleteStmt.executeBatch();
    }
    if (cntOfUpdate > 0) {
        updateStmt.executeBatch();
    }
    if (cntOfInsert > 0) {
        insertStmt.executeBatch();
    }
    insertStmt.close();
    insertStmt = null;
    deleteStmt.close();
    deleteStmt = null;
    updateStmt.close();
    updateStmt = null;
    con.CommitTransaction();
}
catch (e) {
    con.RollBackTransaction();
    Matrix.ThrowException("저장 실패 !!" + e.message);
}
finally {
    if (deleteStmt) {
        deleteStmt.close();
    }
    if (updateStmt) {
        updateStmt.close();
    }
    if (insertStmt) {
        insertStmt.close();
    }
    if (con) {
        con.DisConnect();
    }
}
