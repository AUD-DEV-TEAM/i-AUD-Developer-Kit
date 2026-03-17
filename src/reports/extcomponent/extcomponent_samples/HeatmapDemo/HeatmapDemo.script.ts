import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { ExternalComponent } from "@AUD_CLIENT/extcomponent/ExternalComponent";
import { Button } from "@AUD_CLIENT/control/Button";
import { Label } from "@AUD_CLIENT/control/Label";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { CheckBox } from "@AUD_CLIENT/control/CheckBox";

let Matrix: Matrix;

Matrix.OnDocumentLoadComplete = function (sender, args) {

    // ── 컨트롤 참조 ──
    let ecHeatmap = Matrix.getObject("ecHeatmap") as ExternalComponent;
    let grdHeatmap = Matrix.getObject("grdHeatmap") as DataGrid;
    let btnLoad = Matrix.getObject("btnLoad") as Button;
    let btnExport = Matrix.getObject("btnExport") as Button;
    let cmbMinColor = Matrix.getObject("cmbMinColor") as ComboBox;
    let cmbMaxColor = Matrix.getObject("cmbMaxColor") as ComboBox;
    let chkLabel = Matrix.getObject("chkLabel") as CheckBox;
    let lblStatus = Matrix.getObject("lblStatus") as Label;

    // ── ComboBox 항목 추가 ──
    let minColors = ["#ffffff", "#e3f2fd", "#f3e5f5", "#fff3e0", "#e8f5e9", "#fce4ec"];
    let maxColors = ["#304ffe", "#0d47a1", "#4a148c", "#e65100", "#1b5e20", "#b71c1c"];

    for (let i = 0; i < minColors.length; i++) {
        cmbMinColor.AddItem(minColors[i], minColors[i]);
    }
    for (let i = 0; i < maxColors.length; i++) {
        cmbMaxColor.AddItem(maxColors[i], maxColors[i]);
    }

    cmbMinColor.Value = "#ffffff";
    cmbMaxColor.Value = "#304ffe";

    // ── Load Data 버튼 ──
    btnLoad.OnClick = function () {
        Matrix.doRefresh("grdHeatmap");
    };

    // ── Min Color 변경 ──
    cmbMinColor.OnValueChanged = function (s, e) {
        let model = ecHeatmap.getModel();
        if (!model) return;
        model.setConfig({ MinColor: cmbMinColor.Value });
        model.Update();
    };

    // ── Max Color 변경 ──
    cmbMaxColor.OnValueChanged = function (s, e) {
        let model = ecHeatmap.getModel();
        if (!model) return;
        model.setConfig({ MaxColor: cmbMaxColor.Value });
        model.Update();
    };

    // ── Show Label 토글 ──
    chkLabel.OnValueChange = function (s, e) {
        let model = ecHeatmap.getModel();
        if (!model) return;
        model.setConfig({ ShowLabel: chkLabel.Checked });
        model.Update();
    };

    // ── Export PNG ──
    btnExport.OnClick = function () {
        let model = ecHeatmap.getModel();
        if (model) model.exportImage();
    };

    // ── 컴포넌트 로딩 완료 후 그리드 연결 ──
    ecHeatmap.OnComponentReady = function () {
        let model = ecHeatmap.getModel();
        if (!model) return;

        model.setConfig({
            Title: "Weekly Activity Heatmap"
        });

        model.setGrid(grdHeatmap);

        model.OnCellClick = function (args: { row: string; col: string; value: number }) {
            lblStatus.Value = "  " + args.row + " " + args.col + " : " + args.value;
        };
    };
};
