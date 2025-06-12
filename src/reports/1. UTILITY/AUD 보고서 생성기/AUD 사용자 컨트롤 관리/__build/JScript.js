var GRD_MAIN = Matrix.getObject("GRD_MAIN");
var VS_CONTROL_KW = Matrix.getObject("VS_CONTROL_KW");
var VS_USE_YN = Matrix.getObject("VS_USE_YN");
var btnAdd = Matrix.getObject("btnAdd");
var btnSave = Matrix.getObject("btnSave");
var btnFilter = Matrix.getObject("btnFilter");
var btnDelete = Matrix.getObject("btnDelete");
var CONTROL_BODY = Matrix.getObject("CONTROL_BODY");
var btnValidate = Matrix.getObject("btnValidate");
/**
 * 데이터 저장 하기
 * @returns
 */
var SaveData = function () {
    if (!GRD_MAIN.Validate()) {
        Matrix.Information("입력 필수 항목을 선택해 주세요", "AUD");
        return;
    }
    Matrix.RunScript("GRD_MAIN", "SAVE_CONTROLS", function (p) {
        if (p.Success == false) {
            Matrix.Alert(p.Message);
            return;
        }
        else {
            Matrix.Information("정상적으로 처리되었습니다.", "AUD");
            Matrix.doRefresh("GRD_MAIN");
        }
    });
};
/**
 * 데이터 조회
 */
var QueryData = function () {
    if (GRD_MAIN.IsModified()) {
        Matrix.Confirm("수정된 내용이 있습니다.\n저장하시겠습니까?", "저장 확인", function (ok) {
            if (ok) {
                SaveData();
            }
            else {
                Matrix.doRefresh("GRD_MAIN");
            }
        }, 0);
        return;
    }
    Matrix.doRefresh("GRD_MAIN");
};
btnFilter.OnClick = function (sender, args) {
    QueryData();
};
// enter로 검색
VS_CONTROL_KW.OnTextKeypress = function (sender, args) {
    if (args.Event.isEnter()) {
        QueryData();
    }
};
btnAdd.OnClick = function (sender, args) {
    var nRow = GRD_MAIN.AppendRow();
};
btnDelete.OnClick = function (sender, args) {
    var rows = GRD_MAIN.GetSelectedRows();
    if (rows.length < 1) {
        Matrix.Information("삭제하실 목록을 선택해 주세요", "AUD");
        return;
    }
    Matrix.Confirm("선택하신 목록을 삭제하시겠습니까?", "삭제확인", function (ok) {
        if (ok) {
            for (var r = rows.length - 1; r >= 0; r--) {
                GRD_MAIN.RemoveRow(rows[r], true);
            }
        }
    }, 0);
};
GRD_MAIN.OnCreateNewRow = function (sender, args) {
    var nRow = args.Record;
    nRow.SetValue("CONTROL_CODE", "*");
    nRow.SetValue("CONTROL_WIDTH", 150);
    nRow.SetValue("CONTROL_HEIGHT", 23);
    nRow.SetValue("DELETE_YN", "N");
};
btnSave.OnClick = function (sender, args) {
    SaveData();
};
/**
 * JSON 모델 정합성 검사
 *
 * @param sender
 * @param args
 * @returns
 */
btnValidate.OnClick = function (sender, args) {
    try {
        var currentRow = GRD_MAIN.GetCurrentRow();
        if (!currentRow) {
            Matrix.Information("컨트롤 목록을 추가 하시거나 선택해 주세요", "AUD");
            return;
        }
        if (!CONTROL_BODY.Text) {
            Matrix.Information("컨트롤 정보가 없습니다.\n디자이너에서 복사한 데이터를 넣어 주세요", "AUD", function () {
                CONTROL_BODY.Focus();
            });
            return;
        }
        var model = JSON.parse(CONTROL_BODY.Text);
        var ctlModel = void 0;
        if (model.Elements && Array.isArray(model.Elements)) {
            ctlModel = model.Elements[0];
        }
        else {
            ctlModel = model;
        }
        var text = JSON.stringify(ctlModel, null, "  ");
        currentRow.SetValue("CONTROL_WIDTH", ctlModel.Position.Width);
        currentRow.SetValue("CONTROL_HEIGHT", ctlModel.Position.Height);
        currentRow.SetValue("CONTROL_TYPE", ctlModel.Type);
        if (!currentRow.GetValue("CONTROL_NAME")) {
            currentRow.SetValue("CONTROL_NAME", ctlModel.Name);
        }
        currentRow.SetValue("CONTROL_BODY", text);
        CONTROL_BODY.Text = text;
        GRD_MAIN.ReDraw();
    }
    catch (e) {
        alert("control 모델 파싱 오류 " + e.Message);
    }
};
