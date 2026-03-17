import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
import { Label } from "@AUD_CLIENT/control/Label";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { ExternalComponent } from "@AUD_CLIENT/extcomponent/ExternalComponent";

let Matrix: Matrix;

Matrix.OnDocumentLoadComplete = function (sender, args) {

    // ── 컨트롤 참조 ──
    let lblTitle = Matrix.getObject("lblTitle") as Label;
    let lblStatus = Matrix.getObject("lblStatus") as Label;
    let btnLoadSample = Matrix.getObject("btnLoadSample") as Button;
    let btnAddCard = Matrix.getObject("btnAddCard") as Button;
    let btnClear = Matrix.getObject("btnClear") as Button;
    let btnSave = Matrix.getObject("btnSave") as Button;
    let grdKanban = Matrix.getObject("grdKanban") as DataGrid;
    let ecKanban = Matrix.getObject("ecKanban") as ExternalComponent;

    // ── 텍스트 설정 ──
    lblTitle.Value = "Kanban Board - Project Task Management";
    btnLoadSample.Text = "Load Data";
    btnAddCard.Text = "Add Card";
    btnClear.Text = "Clear";
    btnSave.Text = "Save";

    let cardCounter = 0;
    let changeCount = 0;

    // ── Load Data 버튼: 그리드 DataSource 재조회 (OnDataChanged → 칸반 자동 갱신) ──
    btnLoadSample.OnClick = function () {
        Matrix.doRefresh("grdKanban");
    };

    // ── Add Card 버튼: 그리드에 행 추가 → Calculate → OnDataChanged → 칸반 자동 갱신 ──
    btnAddCard.OnClick = function () {
        cardCounter++;
        let newRow = grdKanban.AppendRow();
        newRow.SetValue('TITLE', 'New Task #' + cardCounter);
        newRow.SetValue('STATUS', 'Backlog');
        newRow.SetValue('DESCRIPTION', 'Added at ' + new Date().toLocaleTimeString());
        newRow.SetValue('COLOR', '#ff9800');
        grdKanban.ReDraw();
        
        let model = ecKanban.getModel() as any;
        if (model){
            model.Update();
        }
    };

    // ── Clear 버튼: 그리드 데이터 전체 삭제 → Calculate → OnDataChanged → 칸반 자동 갱신 ──
    btnClear.OnClick = function () {
        
        grdKanban.ClearRows();
        grdKanban.ReDraw();
         let model = ecKanban.getModel() as any;
        if (model){
            model.Update();
        }
        changeCount = 0;
        lblStatus.Value = "  All cards cleared";
    };

    // ── Save 버튼: 수정된 행 조회 ──
    btnSave.OnClick = function () {
        let ds = grdKanban.GetDataSet();
        if (!ds) {
            Matrix.Alert("저장할 데이터가 없습니다.");
            return;
        }
        let dt = ds.GetTable(0);
        let changes = dt.GetChanges('U');
        let modifiedCount = changes.GetRowCount();
        if (modifiedCount === 0) {
            Matrix.Alert("변경된 항목이 없습니다.");
            return;
        }
        let msg = "변경된 항목 " + modifiedCount + "건:\n\n";
        for (let i = 0; i < modifiedCount; i++) {
            msg += "  - " + changes.getData(i, 'TITLE') + " → " + changes.getData(i, 'STATUS') + "\n";
        }
        Matrix.Alert(msg);
    };

    // ── 컴포넌트 로딩 완료 후 초기화 ──
    ecKanban.OnComponentReady = function () {
        let model = ecKanban.getModel() as any;
        if (!model) return;

        // 필드 매핑 설정
        model.setConfig({
            CardTitleField: 'TITLE',
            CardStatusField: 'STATUS',
            CardDescField: 'DESCRIPTION',
            CardColorField: 'COLOR'
        });

        // 그리드 연결 (데이터가 있으면 자동 로드)
        model.setGrid(grdKanban);

        // ── OnCardMoving: 이동 전 검증 ──
        model.OnCardMoving = function (args) {
            if (args.fromStatus === 'Done' && args.toStatus === 'Backlog') {
                Matrix.Alert("완료된 작업은 Backlog로 되돌릴 수 없습니다.");
                args.cancel = true;
                return;
            }
        };

        // ── OnCardMoved: 이동 후 상태 표시 (그리드 ReDraw는 컴포넌트 내부에서 자동 처리) ──
        model.OnCardMoved = function (args) {
            changeCount++;
            lblStatus.Value = "  [" + args.title + "] " + args.fromStatus + " → " + args.toStatus
                + "  (변경 " + changeCount + "건)";
        };
    };
};
