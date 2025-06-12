// Please do not modify or delete the following variables: "CALL_BACK", "Matrix". 
var req = Matrix.getRequest();
var res = Matrix.getResponse();
var session = Matrix.getSession();
var util = Matrix.getUtility();
var fso = Matrix.getFileSystemObject();
var con = Matrix.getConnection();
var gen = Matrix.getQueryGenerator();
if (!req.getParam("VS_SAVE_REPORT_INFO")) {
    Matrix.ThrowException("정보가 존재하지 않습니다.[VS_SAVE_REPORT_INFO]");
}
Matrix.WriteLog("VS_SAVE_REPORT_INFO=" + req.getParam("VS_SAVE_REPORT_INFO"));
var SAVE_REPORT_INFO = JSON.parse(req.getParam("VS_SAVE_REPORT_INFO"));
var ReportFileHelper = /** @class */ (function () {
    function ReportFileHelper(conn) {
        this.mConn = conn;
        this.DATE_TIME_NOW = Matrix.getQueryGenerator().getDateTimeNowString(conn.getDbType());
    }
    /**
     * 보고서 정보 UPDATE
     */
    ReportFileHelper.prototype.UpdateReport = function () {
        var stmt = null;
        var sqls = [];
        try {
            var IDX = 0;
            sqls = [];
            sqls.push(" UPDATE MTX_REPORT ");
            sqls.push(" SET REPORT_PATH = ?");
            sqls.push("   , REPORT_SIZE = ?");
            sqls.push("   , REPORT_NAME = ?");
            sqls.push("   , REPORT_DESC = ?");
            sqls.push("   , FOLDER_CODE = ?");
            sqls.push("   , MODIFY_CODE = ?");
            sqls.push("   , MODIFY_DATE = " + this.DATE_TIME_NOW);
            sqls.push("  WHERE REPORT_CODE = ?");
            stmt = this.mConn.PreparedStatement(sqls.join("\n"));
            IDX = 0;
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_PATH);
            stmt.setInt(++IDX, SAVE_REPORT_INFO.REPORT_SIZE);
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_NAME);
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_DESC);
            stmt.setString(++IDX, SAVE_REPORT_INFO.FOLDER_CODE);
            stmt.setString(++IDX, req.getUserCode());
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_CODE);
            stmt.executeUpdate();
            stmt.close();
            stmt = null;
        }
        catch (e) {
            Matrix.ThrowException("보고서 정보 업데이트 중 오류가 발생하였습니다.\n" + e.message);
        }
        finally {
            if (stmt != null) {
                stmt.close();
                stmt = null;
            }
        }
    };
    /**
     * 신규 보고서 생성하기
     */
    ReportFileHelper.prototype.NewReport = function () {
        var stmt = null;
        var sqls = [];
        try {
            var IDX = 0;
            sqls = [];
            sqls.push("    INSERT INTO MTX_REPORT (");
            sqls.push("            REPORT_CODE 		,REPORT_NAME 		,FOLDER_CODE ");
            sqls.push("           ,REPORT_SEQ 		,REPORT_PATH 		,REPORT_SIZE ");
            sqls.push("           ,MODULE_CODE 		,REPORT_DESC 		,ACCESS_CNT ");
            sqls.push("           ,OWNER_CODE 		,CREATE_DATE");
            sqls.push("   )VALUES(? 		,? 		,? ");
            sqls.push("           ,? 		,? 		,? ");
            sqls.push("           ,? 		,? 		,0 ");
            sqls.push("           ,? 		, " + this.DATE_TIME_NOW + ")");
            stmt = this.mConn.PreparedStatement(sqls.join("\n"));
            IDX = 0;
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_CODE);
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_NAME);
            stmt.setString(++IDX, SAVE_REPORT_INFO.FOLDER_CODE);
            stmt.setInt(++IDX, 0);
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_PATH);
            stmt.setInt(++IDX, SAVE_REPORT_INFO.REPORT_SIZE);
            stmt.setString(++IDX, "SD");
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_DESC);
            stmt.setString(++IDX, req.getUserCode());
            stmt.executeUpdate();
            stmt.close();
            stmt = null;
        }
        catch (e) {
            Matrix.ThrowException("보고서 생성 중 오류가 발생하였습니다.\n" + e.message);
        }
        finally {
            if (stmt != null) {
                stmt.close();
                stmt = null;
            }
        }
    };
    /**
     * 권한 생성 하기
     */
    ReportFileHelper.prototype.InsertAuthority = function () {
        var stmt = null;
        var IDX = 0;
        var sqls = [];
        try {
            Matrix.WriteLog("CREATE_REPORT.InsertAuthority REPORT_CODE=" + SAVE_REPORT_INFO.REPORT_CODE);
            //기존 권한 정보 제거
            sqls = [];
            sqls.push(" DELETE FROM MTX_AUTHORITY ");
            sqls.push(" WHERE AUTH_OBJECT_CODE = ? ");
            sqls.push("   AND AUTH_SUBJECT_CODE = ? ");
            sqls.push("   AND SUBJECT_CODE = 'U0' ");
            sqls.push("   AND OBJECT_CODE = 'R0' ");
            stmt = this.mConn.PreparedStatement(sqls.join("\n"));
            IDX = 0;
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_CODE);
            stmt.setString(++IDX, req.getUserCode());
            stmt.executeUpdate();
            stmt.close();
            stmt = null;
            //사용자 권한 추가
            sqls = [];
            sqls.push("    INSERT INTO MTX_AUTHORITY (");
            sqls.push("        AUTH_SUBJECT_CODE 	,AUTH_OBJECT_CODE 	,SUBJECT_CODE ");
            sqls.push("        ,OBJECT_CODE 		,AUTHORITY_NO 		,CREATE_DATE )");
            sqls.push("    VALUES (?                , ?                 , 'U0' ");
            sqls.push("          ,'R0' 		        ,3         		    ," + this.DATE_TIME_NOW + ")");
            stmt = this.mConn.PreparedStatement(sqls.join("\n"));
            IDX = 0;
            stmt.setString(++IDX, req.getUserCode());
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_CODE);
            stmt.executeUpdate();
            stmt.close();
            stmt = null;
        }
        catch (e) {
            Matrix.ThrowException("권한 추가 중 오류가 발생하였습니다.\n" + e.message);
        }
        finally {
            if (stmt != null) {
                stmt.close();
                stmt = null;
            }
        }
    };
    /**
     * 보고서의 저장 경로를 반환 합니다.
     **/
    ReportFileHelper.prototype.getReportPath = function (reportcode) {
        var sqls = [];
        var stmt;
        try {
            sqls.push("SELECT REPORT_PATH FROM MTX_REPORT");
            sqls.push("        WHERE REPORT_CODE = ? ");
            stmt = this.mConn.PreparedStatement(sqls.join("\n"));
            stmt.setString(1, reportcode);
            var rs = stmt.ExecuteRecordSet();
            var path = "";
            while (rs.next()) {
                path = rs.getString("REPORT_PATH");
            }
            stmt.close();
            stmt = null;
            return path;
        }
        catch (e) {
            Matrix.ThrowException("보고서 정보 조회 중 오류가 발생하였습니다.\n" + e.message);
        }
        finally {
            if (stmt) {
                stmt.close();
            }
        }
    };
    /**
     * 보고서를 생성합니다.
     */
    ReportFileHelper.prototype.CreateReportFile = function (oldModel) {
        var stmt;
        try {
            var newModel = JSON.parse(req.getServerScript("@REPORT_TEMPLATE"));
            newModel.ReportInfo.ReportCode = SAVE_REPORT_INFO.REPORT_CODE;
            newModel.ReportInfo.FolderCode = SAVE_REPORT_INFO.FOLDER_CODE;
            newModel.ReportInfo.SavePath = SAVE_REPORT_INFO.REPORT_PATH;
            newModel.ReportInfo.ReportName = SAVE_REPORT_INFO.REPORT_NAME;
            newModel.ReportInfo.Writer = req.getUserCode();
            newModel.ReportInfo.WriteDate = util.ToString(util.Now(), "yyyy-MM-dd HH:mm:ss");
            newModel.ReportInfo.Editor = req.getUserCode();
            newModel.ReportInfo.EditDate = util.ToString(util.Now(), "yyyy-MM-dd HH:mm:ss");
            var sqls = [];
            sqls.push("SELECT  T1.REPORT_CODE");
            sqls.push("        , T1.FORM_SEQ ");
            sqls.push("        , T1.FORM_NAME");
            sqls.push("        , T1.VISIBLE ");
            sqls.push("        , T2.CONTROL_NAME");
            sqls.push("        , T3.CONTROL_BODY");
            sqls.push("        , T2.CONTROL_LEFT");
            sqls.push("        , T2.CONTROL_TOP");
            sqls.push("        , T2.CONTROL_WIDTH");
            sqls.push("        , T2.CONTROL_HEIGHT");
            sqls.push("        , T2.VAR_NAMES");
            sqls.push("        , T2.CONTROL_LABEL");
            sqls.push("        , T2.INPUT_MUST");
            sqls.push("        , T2.TAB_INDEX ");
            sqls.push("FROM AUD_DOC_FORM T1 ");
            sqls.push("INNER JOIN AUD_DOC_CONTROL T2 ");
            sqls.push("        ON T1.REPORT_CODE = T2.REPORT_CODE");
            sqls.push("        AND T1.FORM_SEQ = T2.FORM_SEQ");
            sqls.push("INNER JOIN AUD_USER_CONTROL T3");
            sqls.push("        ON T2.CONTROL_CODE = T3.CONTROL_CODE");
            sqls.push("WHERE T1.REPORT_CODE = ? ");
            sqls.push("ORDER BY T1.FORM_SEQ ASC");
            sqls.push("            ,T2.CONTROL_SEQ ASC   ");
            stmt = this.mConn.PreparedStatement(sqls.join("\n"));
            stmt.setString(1, SAVE_REPORT_INFO.REPORT_CODE);
            var rs = stmt.ExecuteRecordSet();
            var formName = null;
            var FORM = null;
            var formActivate = true;
            var ctlModel = void 0;
            // let CTL_MODEL = {};
            var customProp = {};
            var FORM_TEMPLATE = newModel.Forms[0];
            newModel.Forms = [];
            var CONTROL_GROUP = null; // 그룹 컨트롤
            for (var i = 0; i < FORM_TEMPLATE.Elements.length; i++) {
                if (FORM_TEMPLATE.Elements[i].Name == "CONDITION") {
                    CONTROL_GROUP = FORM_TEMPLATE.Elements[i];
                    break;
                }
            }
            if (!CONTROL_GROUP) {
                Matrix.ThrowException("1. 컨트롤을 생성할 그룹 컨트롤이 없습니다. [CONDITION] 이라는 이름으로 그룹을 생성해 주세요.");
            }
            var FORM_IDX = 0;
            while (rs.next()) {
                if (formName == null || formName != rs.getString("FORM_NAME")) {
                    //create form
                    FORM = this.getForm(FORM_TEMPLATE, rs.getString("FORM_NAME"), formActivate, rs.getString("VISIBLE") != "N", FORM_IDX);
                    newModel.Forms.push(FORM);
                    CONTROL_GROUP = null;
                    for (var i = 0; i < FORM.Elements.length; i++) {
                        if (FORM.Elements[i].Name.indexOf("CONDITION") == 0) {
                            CONTROL_GROUP = FORM.Elements[i];
                            break;
                        }
                    }
                    if (!CONTROL_GROUP) {
                        Matrix.ThrowException("2. 컨트롤을 생성할 그룹 컨트롤이 없습니다. \n [CONDITION] 이라는 이름으로 그룹을 생성해 주세요.");
                    }
                    formName = rs.getString("FORM_NAME");
                    FORM_IDX++;
                }
                if (FORM) {
                    //Matrix.WriteLog("Name="+rs.getString("CONTROL_NAME") +" ,CONTROL_BODY=" + rs.getString("CONTROL_BODY"));
                    ctlModel = JSON.parse(rs.getString("CONTROL_BODY"));
                    ctlModel.Id = util.getUniqueKey("CTL_");
                    ctlModel.Name = rs.getString("CONTROL_NAME");
                    ctlModel.Position.Left = rs.getInt("CONTROL_LEFT");
                    ctlModel.Position.Top = rs.getInt("CONTROL_TOP");
                    ctlModel.Position.Width = rs.getInt("CONTROL_WIDTH");
                    ctlModel.Position.Height = rs.getInt("CONTROL_HEIGHT");
                    if (ctlModel.Type == "Label" && rs.getString("CONTROL_LABEL")) {
                        ctlModel.Text = rs.getString("CONTROL_LABEL");
                    }
                    customProp = { "VAR_NAMES": rs.getString("VAR_NAMES"),
                        "CONTROL_LABEL": rs.getString("CONTROL_LABEL"),
                        "INPUT_MUST": rs.getString("INPUT_MUST")
                    };
                    ctlModel.Custom = JSON.stringify(customProp);
                    if (CONTROL_GROUP) {
                        CONTROL_GROUP.ChildElements.push(ctlModel);
                    }
                    else {
                        FORM.Elements.push(ctlModel);
                    }
                }
                formActivate = false;
            }
            stmt.close();
            stmt = null;
            //그룹하고 컨트롤 사이즈 조정
            for (var i = 0, i2 = newModel.Forms.length; i < i2; i++) {
                var frm = newModel.Forms[i];
                var conditionHeight = 0;
                for (var c = 0, c2 = frm.Elements.length; c < c2; c++) {
                    var ctl = frm.Elements[c];
                    if (ctl.Name.indexOf("CONDITION") == 0 && Array.isArray(ctl.ChildElements)) {
                        conditionHeight = 0;
                        for (var s = 0, s2 = ctl.ChildElements.length; s < s2; s++) {
                            var sC = ctl.ChildElements[s];
                            conditionHeight = Math.max(conditionHeight, sC.Position.Top + sC.Position.Height);
                        }
                        ctl.Position.Height = conditionHeight + 5;
                        break;
                    }
                }
                //컨디션이 아닌 녀석 위치 조정
                for (var c = 0, c2 = frm.Elements.length; c < c2; c++) {
                    var ctl = frm.Elements[c];
                    if (ctl.Name.indexOf("CONDITION") != 0) {
                        if (ctl.Position.Top > conditionHeight) {
                            ctl.Position.Top = conditionHeight + 10;
                        }
                    }
                }
            }
            //이전 모델의 컨틀로 정보 복원
            //이전 모델의 ServerScript하고 DataSource 복원
            if (oldModel) {
                newModel.DataSources = oldModel.DataSources;
                newModel.ServerScriptText = oldModel.ServerScriptText;
                newModel.ScriptText = oldModel.ScriptText;
                var oldControls = {};
                for (var i = 0, i2 = oldModel.Forms.length; i < i2; i++) {
                    var frm = oldModel.Forms[i];
                    for (var c = 0, c2 = frm.Elements.length; c < c2; c++) {
                        if (frm.Elements[c].Name.indexOf("CONDITION") != 0) {
                            oldControls[frm.Elements[c].Name] = frm.Elements[c];
                        }
                    }
                }
                //신규 문서에 동일한 이름 업데이트
                for (var i = 0, i2 = newModel.Forms.length; i < i2; i++) {
                    var frm = newModel.Forms[i];
                    for (var c = 0, c2 = frm.Elements.length; c < c2; c++) {
                        var ctl = frm.Elements[c];
                        if (oldControls.hasOwnProperty(ctl.Name)) {
                            var oldCtl = oldControls[ctl.Name];
                            if (oldCtl.Type == ctl.Type) {
                                oldCtl.Position.Top = ctl.Position.Top;
                                frm.Elements[c] = oldCtl;
                            }
                        }
                    }
                }
            }
            var savePath = fso.PathCombine([SAVE_REPORT_INFO.REPORT_PATH]);
            fso.DeleteFile(savePath);
            fso.WriteTextFile(savePath, JSON.stringify(newModel));
            SAVE_REPORT_INFO.REPORT_SIZE = fso.getFileInfo(savePath).getLength();
        }
        catch (e) {
            Matrix.ThrowException("보고서 파일 생성 오류 :" + e.message);
        }
        finally {
            if (stmt) {
                stmt.close();
            }
        }
    };
    /**
     * 폼 객체 반환
     * @param name
     * @param activate
     * @param visible
     * @returns
     */
    ReportFileHelper.prototype.getForm = function (form, name, activate, visible, idx) {
        var nForm = JSON.parse(JSON.stringify(form));
        nForm.Id = util.getUniqueKey("Form");
        nForm.Name = name;
        nForm.Activated = activate;
        nForm.Visible = visible;
        nForm.LanguageCode = "";
        if (idx > 0) {
            for (var i = 0; i < nForm.Elements.length; i++) {
                nForm.Elements[i].Id = util.getUniqueKey("CT");
                nForm.Elements[i].Name = nForm.Elements[i].Name + idx;
            }
        }
        return nForm;
    };
    /**
     * 보고서 백업 하기
     * @param reportCode
     */
    ReportFileHelper.prototype.BackupReport = function (reportCode) {
        req.setParam("_BACKUP_CMD_", "1");
        req.setParam("_REPORT_CODE_", reportCode);
        req.setParam("_BACKUP_COMMENT_", "자동 백업");
        var params = [reportCode, "보고서 생성기 자동 백업", req.getUserCode()];
        util.InvokeMethod("com.matrix.services.ReportVersionHistory", "BackupReport", params);
    };
    return ReportFileHelper;
}());
//----------------------------------------------------
try {
    con.Connect("MTXRPTY");
    con.BeginTransaction();
    var helper = new ReportFileHelper(con);
    var reportPath = helper.getReportPath(SAVE_REPORT_INFO.REPORT_CODE);
    var oldReportModel = null;
    if (fso.Exists(reportPath)) {
        SAVE_REPORT_INFO.REPORT_PATH = reportPath;
        oldReportModel = JSON.parse(fso.ReadTextFile(reportPath));
    }
    else {
        SAVE_REPORT_INFO.REPORT_PATH = SAVE_REPORT_INFO.FOLDER_CODE + "/" + SAVE_REPORT_INFO.REPORT_CODE + ".mtsd";
    }
    if (reportPath) {
        //신규
        //백업 하기
        helper.BackupReport(SAVE_REPORT_INFO.REPORT_CODE);
        helper.CreateReportFile(oldReportModel);
        helper.UpdateReport();
        helper.InsertAuthority();
    }
    else {
        //update
        helper.CreateReportFile(oldReportModel);
        helper.NewReport();
        helper.InsertAuthority();
    }
    con.CommitTransaction();
    con.DisConnect();
    con = null;
    res.WriteResponseText(JSON.stringify(SAVE_REPORT_INFO));
}
catch (e) {
    con.RollBackTransaction();
    Matrix.ThrowException("보고서 생성 중 오류가 발생하였습니다.\n" + e.message);
}
finally {
    if (con) {
        con.DisConnect();
    }
}
