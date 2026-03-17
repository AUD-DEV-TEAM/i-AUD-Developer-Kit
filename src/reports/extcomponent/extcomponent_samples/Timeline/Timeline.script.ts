import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { ExternalComponent } from "@AUD_CLIENT/extcomponent/ExternalComponent";
import { Button } from "@AUD_CLIENT/control/Button";
import { Label } from "@AUD_CLIENT/control/Label";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

let Matrix: Matrix;

Matrix.OnDocumentLoadComplete = function (sender, args) {

    // ── 컨트롤 참조 ──
    let lblTitle = Matrix.getObject("lblTitle") as Label;
    let lblStatus = Matrix.getObject("lblStatus") as Label;
    let btnLoadData = Matrix.getObject("btnLoadData") as Button;
    let btnAddEvent = Matrix.getObject("btnAddEvent") as Button;
    let btnClear = Matrix.getObject("btnClear") as Button;
    let grdTimeline = Matrix.getObject("grdTimeline") as DataGrid;
    let ecTimeline = Matrix.getObject("ecTimeline") as ExternalComponent;

    // ── 텍스트 설정 ──
    lblTitle.Value = "Timeline Component - Project Milestones";
    btnLoadData.Text = "Load Data";
    btnAddEvent.Text = "Add Event";
    btnClear.Text = "Clear";

    let addCounter = 0;

    // ── Load Data 버튼: 그리드 DataSource 재조회 (OnDataChanged → 타임라인 자동 갱신) ──
    btnLoadData.OnClick = function () {
        Matrix.doRefresh("grdTimeline");
    };

    // ── Add Event 버튼: 그리드에 행 추가 → Calculate → OnDataChanged → 타임라인 자동 갱신 ──
    btnAddEvent.OnClick = function () {
        addCounter++;
        let today = new Date();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        let dateStr = today.getFullYear() + '-'
            + (mm < 10 ? '0' + mm : '' + mm) + '-'
            + (dd < 10 ? '0' + dd : '' + dd);

        let newRow = grdTimeline.AppendRow();
        newRow.SetValue('DATE', dateStr);
        newRow.SetValue('TITLE', 'New Event #' + addCounter);
        newRow.SetValue('DESCRIPTION', 'Added at ' + today.toLocaleTimeString());
        newRow.SetValue('COLOR', '#e91e63');
        newRow.SetValue('ICON', '📌');
        grdTimeline.ReDraw();
        
        let model = ecTimeline.getModel();
        if(model){
            model.Update();
        }
    };

    // ── Clear 버튼 ──
    btnClear.OnClick = function () {
        
        grdTimeline.ClearRows();
        grdTimeline.ReDraw();
        
        let model = ecTimeline.getModel();
        if(model){
            model.Update();
        }
        lblStatus.Value = "  Timeline cleared";
    };

    // ── 컴포넌트 로딩 완료 후 초기화 ──
    ecTimeline.OnComponentReady = function () {
        let model = ecTimeline.getModel();
        if (!model) return;

        // 필드 매핑 설정
        model.setConfig({
            DateField: 'DATE',
            TitleField: 'TITLE',
            DescriptionField: 'DESCRIPTION',
            ColorField: 'COLOR',
            IconField: 'ICON'
        });

        // 그리드 연결 (데이터가 있으면 자동 로드)
        model.setGrid(grdTimeline);

        lblStatus.Value = "  Timeline ready";
    };
};
