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
    let btnLoad = Matrix.getObject("btnLoad") as Button;
    let grdWordCloud = Matrix.getObject("grdWordCloud") as DataGrid;
    let ecWordCloud = Matrix.getObject("ecWordCloud") as ExternalComponent;

    // ── 텍스트 설정 ──
    lblTitle.Value = "Word Cloud - Technology Keyword Trends";
    btnLoad.Text = "Load Data";

    // ── Load Data 버튼 ──
    btnLoad.OnClick = function () {
        Matrix.doRefresh("grdWordCloud");
    };

    // ── 컴포넌트 로딩 완료 후 그리드 연결 ──
    ecWordCloud.OnComponentReady = function () {
        let model = ecWordCloud.getModel();
        if (!model) return;

        model.setConfig({
            WordField: 'WORD',
            CountField: 'COUNT',
            Shape: 'circle',
            Title: 'Technology Keyword Trends'
        });

        model.setGrid(grdWordCloud);

        model.OnWordClick = function (args) {
            lblStatus.Value = "  Clicked: " + args.word + " (" + args.count + ")";
        };
    };
};
