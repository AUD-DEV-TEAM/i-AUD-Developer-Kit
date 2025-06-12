var REPORT_FORM;
var COLTROL_LAYOUT;
var CONTROL_INFO = {};
var WORK_FOLDER_CODE = null; //작업 폴더 (폴더 트리 클릭 시 설정 됨)
var FOLDER_TREE = Matrix.getObject("FOLDER_TREE");
var REPORT_LIST = Matrix.getObject("REPORT_LIST");
var VS_REPORT_NAME_KW = Matrix.getObject("VS_REPORT_NAME_KW");
var TREE_FOLDER_CODE = Matrix.getObject("TREE_FOLDER_CODE");
var TBX_REPORT_CODE = Matrix.getObject("TBX_REPORT_CODE");
var TBX_REPORT_NAME = Matrix.getObject("TBX_REPORT_NAME");
var TBX_REPORT_DESC = Matrix.getObject("TBX_REPORT_DESC");
var TAB_INPUT = Matrix.getObject("TAB_INPUT");
var GRD_FORM_LIST = Matrix.getObject("GRD_FORM_LIST");
var GRD_CONTROL_LIST = Matrix.getObject("GRD_CONTROL_LIST");
var CBO_FORM_FILTER = Matrix.getObject("CBO_FORM_FILTER");
FOLDER_TREE.OnDataBindEnd = function (sender, args) {
    FOLDER_TREE.ExpandToLevel(1);
};
FOLDER_TREE.OnNodeClick = function (sender, args) {
    WORK_FOLDER_CODE = args.Node.GetValue("FOLDER_CODE");
    Matrix.AddGlobalParams("VS_FOLDER_CODE", WORK_FOLDER_CODE, 1);
    Matrix.doRefresh("REPORT_LIST");
};
VS_REPORT_NAME_KW.OnTextKeydown = function (sender, args) {
    if (args.Event.isEnter()) {
        Matrix.doRefresh("REPORT_LIST");
    }
};
/**
 *신규 보고서 생성
 */
Matrix.getObject("btnNewReport").OnClick = function (sender, args) {
    REPORT_FORM.NewReport();
};
/**
 * 보고서 정보 저장
 */
Matrix.getObject("btnSaveReport").OnClick = function (sender, args) {
    REPORT_FORM.SaveReport();
};
/**
 * 보고서 생성
 */
Matrix.getObject("btnCreateReport").OnClick = function (sender, args) {
    REPORT_FORM.CreateReport();
};
REPORT_LIST.OnCellDoubleClick = function (sender, args) {
    if (args.Field.Name == "CMD_DESIGNER") {
        REPORT_FORM.ShowDesigner(args.Row.GetValue("REPORT_CODE"));
    }
    else {
        REPORT_FORM.OpenReport(args.Row.GetValue("REPORT_CODE"));
    }
};
var ReportCreateForm = /** @class */ (function () {
    function ReportCreateForm() {
    }
    /**
     * 신규 레포트 생성하기
     */
    ReportCreateForm.prototype.NewReport = function () {
        TBX_REPORT_CODE.Text = "*";
        TBX_REPORT_NAME.Text = "";
        TBX_REPORT_DESC.Text = "";
        TREE_FOLDER_CODE.SetValue(WORK_FOLDER_CODE);
        Matrix.doRefresh("GRD_FORM_LIST,GRD_CONTROL_LIST");
        TAB_INPUT.SetActiveTabItemByIndex(0);
        Matrix.SetSheetActive("보고서 편집");
    };
    /**
     * Open
     */
    ReportCreateForm.prototype.OpenReport = function (code) {
        TBX_REPORT_CODE.Text = "*";
        TBX_REPORT_NAME.Text = "";
        TBX_REPORT_DESC.Text = "";
        TREE_FOLDER_CODE.SetValue(WORK_FOLDER_CODE);
        GRD_FORM_LIST.ClearData();
        GRD_FORM_LIST.ClearRowState();
        GRD_CONTROL_LIST.ClearData();
        GRD_CONTROL_LIST.ClearRowState();
        TAB_INPUT.SetActiveTabItemByIndex(0);
        Matrix.SetSheetActive("보고서 편집");
        Matrix.AddGlobalParams("VS_REPORT_CODE", code, 1);
        Matrix.Execute("AUD_REPORT_INFO", function (p) {
            if (p.Success == false) {
                Matrix.Alert(p.Message);
                return;
            }
            var ds = p.DataSet;
            var dt = ds.GetTable(0);
            if (dt.GetRowCount() < 1) {
                Matrix.Information("보고서 생성 정보를 찾을 수 없습니다.", "정보 없음");
                return;
            }
            var row = dt.GetRow(0);
            TBX_REPORT_CODE.Text = row.GetValue("REPORT_CODE");
            TBX_REPORT_NAME.Text = row.GetValue("REPORT_NAME");
            TBX_REPORT_DESC.Text = row.GetValue("REPORT_DESC");
            TREE_FOLDER_CODE.SetValue(row.GetValue("FOLDER_CODE"));
        });
        Matrix.doRefresh("GRD_FORM_LIST,GRD_CONTROL_LIST");
    };
    /**
     * 보고서 저장 하기
     * @returns
     */
    ReportCreateForm.prototype.SaveReport = function (callBack) {
        if (!TBX_REPORT_NAME.Text) {
            Matrix.Information("이름을 입력해 주세요.", "AUD", function () {
                TBX_REPORT_NAME.Focus();
            });
            return;
        }
        var folder = TREE_FOLDER_CODE.GetValue();
        if (!folder || folder.length == 0) {
            Matrix.Information("경로를 선택해 주세요.", "AUD", function () {
                TREE_FOLDER_CODE.Focus();
            });
            return;
        }
        var table = GRD_FORM_LIST.getDataTable();
        for (var r = 0, r2 = table.GetRowCount(); r < r2; r++) {
            var row = table.GetRow(r);
            if (row.RowState != "D") {
                row.RowState = "N";
            }
        }
        ;
        table = GRD_CONTROL_LIST.getDataTable();
        for (var r = 0, r2 = table.GetRowCount(); r < r2; r++) {
            var row = table.GetRow(r);
            if (row.RowState != "D") {
                row.RowState = "N";
            }
        }
        ;
        if (!GRD_FORM_LIST.Validate()) {
            Matrix.Information("입력 필수 항목을 확인해 주세요", "확인");
            TAB_INPUT.SetActiveTabItemByIndex(0);
            return;
        }
        if (!GRD_CONTROL_LIST.Validate()) {
            Matrix.Information("입력 필수 항목을 확인해 주세요", "확인");
            TAB_INPUT.SetActiveTabItemByIndex(1);
            return;
        }
        var saveReport = {
            "REPORT_CODE": TBX_REPORT_CODE.Text,
            "REPORT_NAME": TBX_REPORT_NAME.Text,
            "FOLDER_CODE": folder[0],
            "REPORT_DESC": TBX_REPORT_DESC.Text,
            "REPORT_PATH": "",
            "REPORT_SIZE": 0
        };
        Matrix.AddGlobalParams("VS_SAVE_REPORT_INFO", JSON.stringify(saveReport), 1);
        Matrix.RunScript("GRD_FORM_LIST,GRD_CONTROL_LIST", "SAVE_REPORT", function (p) {
            if (p.Success == false) {
                Matrix.Alert(p.Message);
                return;
            }
            var ds = p.DataSet;
            saveReport = ds;
            Matrix.AddGlobalParams("VS_REPORT_CODE", saveReport.REPORT_CODE, 1);
            TBX_REPORT_CODE.Text = saveReport.REPORT_CODE;
            TBX_REPORT_NAME.Text = saveReport.REPORT_NAME;
            Matrix.doRefresh("GRD_FORM_LIST,GRD_CONTROL_LIST");
            if (callBack) {
                callBack(saveReport);
            }
            else {
                Matrix.iMessage("저장되었습니다.");
            }
        });
        Matrix.RemoveGlobalParams("VS_SAVE_REPORT_INFO");
    };
    /**
     * 보고서 생성하기
     */
    ReportCreateForm.prototype.CreateReport = function () {
        var _this = this;
        this.SaveReport(function (saveReport) {
            Matrix.AddGlobalParams("VS_SAVE_REPORT_INFO", JSON.stringify(saveReport), 1);
            Matrix.RunScript("", "CREATE_REPORT", function (p) {
                if (p.Success == false) {
                    Matrix.Alert(p.Message);
                    return;
                }
                _this.ShowDesigner(saveReport.REPORT_CODE);
            });
            Matrix.RemoveGlobalParams("VS_SAVE_REPORT_INFO");
        });
    };
    ReportCreateForm.prototype.ShowDesigner = function (reportCode) {
        var url = Matrix.GetGlobalConfig().CONTEXT_PATH + "/AUD/designer.jsp?id=" + reportCode;
        window.open(url);
    };
    return ReportCreateForm;
}());
/**
 * 폼 추가
 */
Matrix.getObject("btnAddForm").OnClick = function (sender, args) {
    GRD_FORM_LIST.AppendRow();
};
/**
 * 폼 삭제
 */
Matrix.getObject("btnDeleteForm").OnClick = function (sender, args) {
    var rows = GRD_FORM_LIST.GetSelectedRows();
    if (rows.length < 1) {
        Matrix.Information("삭제하실 목록을 선택해 주세요", "AUD");
        return;
    }
    //폼으로 등록된 자식 컨트롤이 있는지 여부 검사
    //자식 컨트롤의 폼 리스트 확보
    var HasControlForms = {};
    for (var r = 0, r2 = GRD_CONTROL_LIST.GetRowCount(); r < r2; r++) {
        var row = GRD_CONTROL_LIST.GetRow(r);
        HasControlForms[row.GetValue("FORM_SEQ")] = 1;
    }
    for (var r = 0, r2 = rows.length; r < r2; r++) {
        if (HasControlForms.hasOwnProperty(rows[r].GetValue("FORM_SEQ"))) {
            Matrix.Information("폼 [" + rows[r].GetValue("FORM_NAME") + "]에 컨트롤이 존재합니다.\n컨트롤을 먼저 삭제 하시기 바랍니다.");
            return;
        }
    }
    Matrix.Confirm("선택하신 목록을 삭제하시겠습니까?", "삭제확인", function (ok) {
        if (ok) {
            GRD_FORM_LIST.RemoveRow();
        }
    }, 0);
};
GRD_FORM_LIST.OnDeletingRow = function (sender, args) {
    //폼으로 등록된 자식 컨트롤이 있는지 여부 검사
    //자식 컨트롤의 폼 리스트 확보
    var HasControlForms = {};
    for (var r = 0, r2 = GRD_CONTROL_LIST.GetRowCount(); r < r2; r++) {
        var row = GRD_CONTROL_LIST.GetRow(r);
        HasControlForms[row.GetValue("FORM_SEQ")] = 1;
    }
    if (HasControlForms.hasOwnProperty(args.Row.GetValue("FORM_SEQ"))) {
        Matrix.Information("폼 [" + args.Row.GetValue("FORM_NAME") + "]에 컨트롤이 존재합니다.\n컨트롤을 먼저 삭제 하시기 바랍니다.");
        args.Cancel = true;
        return;
    }
};
GRD_FORM_LIST.OnCreateNewRow = function (sender, args) {
    var maxSeq = 0;
    var FORM_NAMES = {};
    for (var r = 0, r2 = GRD_FORM_LIST.GetRowCount(); r < r2; r++) {
        var row = GRD_FORM_LIST.GetRow(r);
        maxSeq = Math.max(maxSeq, row.GetValue("FORM_SEQ"));
        FORM_NAMES[row.GetValue("FORM_NAME")] = 1;
    }
    var nameIDX = 1;
    var nName = "Form 1";
    while (FORM_NAMES.hasOwnProperty(nName)) {
        nameIDX++;
        nName = "Form " + nameIDX;
    }
    var nRow = args.Record;
    nRow.SetValue("REPORT_CODE", "*");
    nRow.SetValue("VISIBLE", "Y");
    nRow.SetValue("FORM_SEQ", maxSeq + 1);
    nRow.SetValue("FORM_NAME", nName);
};
/**
 * 컨트롤 추가
 */
Matrix.getObject("btnAddControl").OnClick = function (sender, args) {
    var currentRow = GRD_CONTROL_LIST.GetCurrentRow();
    if (!currentRow) {
        GRD_CONTROL_LIST.AppendRow();
    }
    else {
        var row = GRD_CONTROL_LIST.InsertRow();
        row.SetValue("CONTROL_SEQ", currentRow.GetValue("CONTROL_SEQ") + 1);
    }
    GRD_CONTROL_LIST.AddSort("CONTROL_SEQ", 2, false);
    SEQUENCE_UPDATE(GRD_CONTROL_LIST, "CONTROL_SEQ");
};
/**
 * 컨트롤 삭제
 */
Matrix.getObject("btnDeleteControl").OnClick = function (sender, args) {
    if (CBO_FORM_FILTER.Value == null) {
        Matrix.Information("폼을 선택해 주세요", "확인", function () {
            CBO_FORM_FILTER.Focus();
        });
        return;
    }
    var rows = GRD_CONTROL_LIST.GetSelectedRows();
    if (rows.length < 1) {
        Matrix.Information("삭제하실 목록을 선택해 주세요", "AUD");
        return;
    }
    Matrix.Confirm("선택하신 목록을 삭제하시겠습니까?", "삭제확인", function (ok) {
        if (ok) {
            for (var r = rows.length - 1; r >= 0; r--) {
                GRD_CONTROL_LIST.RemoveRowAt(r, true);
            }
            window.setTimeout(function () {
                GRD_CONTROL_LIST.AddSort("CONTROL_SEQ", 2, false);
                SEQUENCE_UPDATE(GRD_CONTROL_LIST, "CONTROL_SEQ");
            }, 100);
        }
    }, 0);
};
GRD_CONTROL_LIST.OnCreateNewRow = function (sender, args) {
    var nRow = args.Record;
    nRow.SetValue("REPORT_CODE", "*");
    nRow.SetValue("FORM_SEQ", CBO_FORM_FILTER.Value);
    nRow.SetValue("CONTROL_SEQ", 1);
    nRow.SetValue("INPUT_MUST", "N");
    nRow.SetValue("TAB_INDEX", 0);
};
GRD_CONTROL_LIST.OnEndEdit = function (sender, args) {
    if (args.Field.Name == "CONTROL_CODE") {
        var ctlInfo = CONTROL_INFO[args.AfterValue];
        if (ctlInfo) {
            args.Row.SetValue("VAR_NAMES", ctlInfo["VAR_NAMES"]);
            args.Row.SetValue("CONTROL_WIDTH", ctlInfo["CONTROL_WIDTH"]);
            args.Row.SetValue("CONTROL_HEIGHT", ctlInfo["CONTROL_HEIGHT"]);
            args.Row.SetValue("CONTROL_LABEL", ctlInfo["CONTROL_NAME"]);
            var varName = ctlInfo["VAR_NAMES"];
            if (varName && varName.indexOf(",") < 0) {
                args.Row.SetValue("CONTROL_NAME", getUniqueControlName(varName, args.Row));
            }
            else {
                args.Row.SetValue("CONTROL_NAME", getUniqueControlName(varName.split(",")[0], args.Row));
            }
        }
    }
    else if (args.Field.Name == "CONTROL_NAME") {
        window.setTimeout(function () {
            args.Row.SetValue("CONTROL_NAME", getUniqueControlName(args.AfterValue, args.Row));
            GRD_CONTROL_LIST.ReDraw();
        }, 100);
    }
    else if (args.Field.Name == "CONTROL_SEQ") {
        window.setTimeout(function () {
            GRD_CONTROL_LIST.AddSort("CONTROL_SEQ", 2, false);
            SEQUENCE_UPDATE(GRD_CONTROL_LIST, "CONTROL_SEQ");
        }, 100);
    }
};
GRD_CONTROL_LIST.OnDataBindEnd = function () {
    var fld = GRD_CONTROL_LIST.GetField("FORM_SEQ");
    fld.ClearFilter();
    fld.AddFilter(1, "=", parseInt(CBO_FORM_FILTER.Value), false);
    GRD_CONTROL_LIST.Calculate();
};
GRD_FORM_LIST.OnEndEdit = function (sender, args) {
    if (args.Field.Name == "FORM_SEQ") {
        window.setTimeout(function () {
            GRD_FORM_LIST.AddSort("FORM_SEQ", 2, false);
            SEQUENCE_UPDATE(GRD_FORM_LIST, "FORM_SEQ");
        }, 100);
    }
};
/**
 * 컨트롤 이름 유일하게 만들기
 * @param text
 * @param targetRow
 * @returns
 */
var getUniqueControlName = function (text, targetRow) {
    var table = GRD_CONTROL_LIST.getDataTable();
    var NAMES = {};
    for (var r = 0, r2 = table.GetRowCount(); r < r2; r++) {
        var row = table.GetRow(r);
        if (row != targetRow.Data) {
            NAMES[row.GetValue("CONTROL_NAME")] = 1;
        }
    }
    text = text.split(" ").join("_");
    [];
    var nName = text;
    var IDX = 0;
    while (NAMES.hasOwnProperty(nName)) {
        IDX++;
        nName = text + IDX;
    }
    return nName;
};
/**
 *  순서 번호 자동 처리
 */
var SEQUENCE_UPDATE = function (grid, seqFldName) {
    for (var r = 0, r2 = grid.GetRowCount(); r < r2; r++) {
        var row = grid.GetRow(r);
        row.SetValue(seqFldName, (r + 1));
    }
    grid.ReDraw();
};
/**
 * 탭 이동
 * @param sender
 * @param args
 */
TAB_INPUT.OnActiveTabChanged = function (sender, args) {
    if (args.TabName == "TAB_CONTROLS") {
        if (GRD_FORM_LIST.GetRowCount() < 1) {
            Matrix.Information("폼을 먼저 등록해 주시기 바랍니다.", "확인");
            TAB_INPUT.SetActiveTabItemByIndex(0);
            return;
        }
        var comboValue = CBO_FORM_FILTER.Value ? CBO_FORM_FILTER.Value : 1;
        var comboTable = CBO_FORM_FILTER.GetDataSet().GetTable(0);
        comboTable.ClearRows();
        var table = GRD_CONTROL_LIST.GetColumnDataTable("FORM_SEQ");
        table.ClearRows();
        for (var r = 0, r2 = GRD_FORM_LIST.GetRowCount(); r < r2; r++) {
            var row = GRD_FORM_LIST.GetRow(r);
            table.AppendRow([row.GetValue("FORM_SEQ"), row.GetValue("FORM_NAME")]);
            comboTable.AppendRow([row.GetValue("FORM_SEQ"), row.GetValue("FORM_NAME")]);
        }
        GRD_CONTROL_LIST.SetColumnDataTable("FORM_SEQ", table);
        CBO_FORM_FILTER.SetDataSet(comboTable.ToDataSet());
        if (comboValue) {
            CBO_FORM_FILTER.Value = comboValue;
        }
    }
};
CBO_FORM_FILTER.OnValueChanged = function (sender, args) {
    var fld = GRD_CONTROL_LIST.GetField("FORM_SEQ");
    fld.ClearFilter();
    if (args.Value) {
        fld.AddFilter(1, "=", parseInt(args.Value), false);
    }
    GRD_CONTROL_LIST.Calculate();
    COLTROL_LAYOUT.LoadLayout();
};
var ControlLayoutManager = /** @class */ (function () {
    function ControlLayoutManager() {
        var _this = this;
        this.CTL_LAYOUT = Matrix.getObject("CTL_LAYOUT");
        this.CTL_LAYOUT.OnCellBeginEdit = function (sender, args) {
            if (args.Cell.Row >= 3 && args.Cell.Column >= 2) {
                args.LOVList = _this.getControlList(args.Cell);
            }
        };
        this.btnMerge = Matrix.getObject("btnMerge");
        this.btnMerge.OnClick = function () {
            _this.mergeCell();
        };
        this.CTL_LAYOUT.Viewer().setDisplayHeadings(true);
        this.btnSaveLayout = Matrix.getObject("btnSaveLayout");
        this.btnSaveLayout.OnClick = function () {
            _this.saveLayout();
        };
        this.MX_CONTROL = Matrix.getObject("MX_CONTROL");
    }
    ControlLayoutManager.prototype.getControlList = function (cell) {
        var result = [];
        var ctls = this.getControlCells();
        result.push("");
        for (var r = 0, r2 = GRD_CONTROL_LIST.GetRowCount(); r < r2; r++) {
            var row = GRD_CONTROL_LIST.GetRow(r);
            var ctlName = row.GetValue("CONTROL_NAME");
            if (ctlName) {
                if (!ctls.hasOwnProperty(ctlName)) {
                    result.push(ctlName);
                }
                else {
                    var ctl = ctls[ctlName];
                    if (ctl.R == cell.Row && ctl.C == cell.Column) {
                        result.push(ctlName);
                    }
                }
            }
        }
        return result;
    };
    ControlLayoutManager.prototype.mergeCell = function () {
        var selection = this.CTL_LAYOUT.getSelection();
        selection.Merge();
    };
    ControlLayoutManager.prototype.getControlCells = function () {
        var RESULT = {};
        for (var r = 3; r <= 11; r++) {
            for (var c = 2; c <= 16; c++) {
                var cell = this.CTL_LAYOUT.getCell(r, c);
                if (cell && !cell.Merged) {
                    var value = cell.getValue();
                    if (value) {
                        var ctlName = value;
                        if (RESULT.hasOwnProperty(ctlName)) {
                            cell.setValue("");
                        }
                        else {
                            RESULT[ctlName] = {
                                "R": r,
                                "C": c
                            };
                        }
                    }
                }
            }
        }
        return RESULT;
    };
    ControlLayoutManager.prototype.LoadLayout = function () {
        var id = parseInt(CBO_FORM_FILTER.Value);
        Matrix.AddGlobalParams("VS_FORM_LAYOUT", "", 1);
        for (var r = 0, r2 = GRD_FORM_LIST.GetRowCount(); r < r2; r++) {
            var row = GRD_FORM_LIST.GetRow(r);
            if (parseInt(row.GetValue("FORM_SEQ")) == id) {
                Matrix.AddGlobalParams("VS_FORM_LAYOUT", row.GetValue("LAYOUT_MODEL"), 1);
                break;
            }
        }
        this.CTL_LAYOUT.Viewer().IsDesignMode = true;
        Matrix.doRefresh("CTL_LAYOUT");
        Matrix.RemoveGlobalParams("VS_FORM_LAYOUT");
    };
    /**
     * layout 저장 및 위치 계산 하기
     */
    ControlLayoutManager.prototype.saveLayout = function () {
        var id = parseInt(CBO_FORM_FILTER.Value);
        for (var r = 0, r2 = GRD_FORM_LIST.GetRowCount(); r < r2; r++) {
            var row = GRD_FORM_LIST.GetRow(r);
            if (parseInt(row.GetValue("FORM_SEQ")) == id) {
                this.CTL_LAYOUT.Viewer().IsDesignMode = true;
                var model = this.CTL_LAYOUT.getWorkBook().Serialize();
                this.CTL_LAYOUT.Viewer().IsDesignMode = false;
                row.SetValue("LAYOUT_MODEL", JSON.stringify(model));
                break;
            }
        }
        var controls = this.getControlCells();
        var beginPosition = {
            Left: parseInt(this.MX_CONTROL.getRange("E2").getValue() + ""),
            Top: parseInt(this.MX_CONTROL.getRange("G2").getValue() + "")
        };
        var margin = {
            Column: parseInt(this.MX_CONTROL.getRange("E4").getValue() + ""),
            Row: parseInt(this.MX_CONTROL.getRange("G4").getValue() + "")
        };
        //WIDTH 값 가져오기
        var WIDTHS = [];
        for (var c = 2; c <= 16; c++) {
            var cell = this.CTL_LAYOUT.getCell(2, c);
            if (cell && !cell.Merged) {
                WIDTHS.push(parseInt(cell.getValue()));
            }
        }
        //HEIGHT 가져오기
        var HEIGHT = [];
        for (var r = 3; r <= 11; r++) {
            var cell = this.CTL_LAYOUT.getCell(r, 1);
            if (cell && !cell.Merged) {
                HEIGHT.push(parseInt(cell.getValue()));
            }
        }
        for (var r = 0, r2 = GRD_CONTROL_LIST.GetRowCount(); r < r2; r++) {
            var row = GRD_CONTROL_LIST.GetRow(r);
            var ctlName = row.GetValue("CONTROL_NAME");
            if (!controls.hasOwnProperty(ctlName)) {
                Matrix.iMessage("컨트롤[" + ctlName + "]의 위치가 설정되지 않았습니다.");
            }
            else {
                //위치 적용 하기
                var pos = controls[ctlName];
                var cell = this.CTL_LAYOUT.getCell(pos.R, pos.C);
                var idx = pos.C - 2;
                var _left = beginPosition.Left;
                if (idx > 0) {
                    _left += margin.Column;
                }
                for (var w = 0; w < idx; w++) {
                    _left += WIDTHS[w];
                    if (w > 0) {
                        _left += margin.Column;
                    }
                }
                row.SetValue("CONTROL_LEFT", _left);
                var _width = WIDTHS[idx];
                if (cell.ColSpan > 1) {
                    for (var w = idx + 1; w < idx + cell.ColSpan; w++) {
                        _width += WIDTHS[w];
                    }
                }
                row.SetValue("CONTROL_WIDTH", _width);
                idx = pos.R - 3;
                var _top = beginPosition.Top;
                if (idx > 0) {
                    _top += margin.Row;
                }
                for (var h = 0; h < idx; h++) {
                    _top += HEIGHT[h];
                    if (h > 0) {
                        _top += margin.Row;
                    }
                }
                row.SetValue("CONTROL_TOP", _top);
                var _heightt = HEIGHT[idx];
                if (cell.RowSpan > 1) {
                    for (var h = idx + 1; h < idx + cell.RowSpan; h++) {
                        _heightt += HEIGHT[h];
                    }
                }
                row.SetValue("CONTROL_HEIGHT", _heightt);
            }
        }
        GRD_CONTROL_LIST.Validate();
        //GRD_CONTROL_LIST.ReDraw();
        Matrix.iMessage("컨트롤의 사이즈 및 위치가 새로 게산 되었습니다.");
    };
    return ControlLayoutManager;
}());
;
COLTROL_LAYOUT = new ControlLayoutManager();
Matrix.OnDocumentLoadComplete = function (sender, args) {
    Matrix.SetSheetActive(0);
    Matrix.RunScript("", "INIT_DATA", function (p) {
        if (p.Success == false) {
            Matrix.Alert(p.Message);
            return;
        }
        CONTROL_INFO = p.DataSet;
    });
};
REPORT_FORM = new ReportCreateForm();
