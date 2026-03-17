import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { ExternalComponent } from "@AUD_CLIENT/extcomponent/ExternalComponent";
import { Button } from "@AUD_CLIENT/control/Button";
import { Label } from "@AUD_CLIENT/control/Label";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { RadioButton } from "@AUD_CLIENT/control/RadioButton";

let Matrix: Matrix;

Matrix.OnDocumentLoadComplete = function (sender, args) {

    // ── 컨트롤 참조 ──
    let lblTitle = Matrix.getObject("lblTitle") as Label;
    let lblStatus = Matrix.getObject("lblStatus") as Label;
    let btnLoad = Matrix.getObject("btnLoad") as Button;
    let btnExpandAll = Matrix.getObject("btnExpandAll") as Button;
    let btnCollapseAll = Matrix.getObject("btnCollapseAll") as Button;
    let rdoVertical = Matrix.getObject("rdoVertical") as RadioButton;
    let rdoHorizontal = Matrix.getObject("rdoHorizontal") as RadioButton;
    let grdOrg = Matrix.getObject("grdOrg") as DataGrid;
    let ecOrgChart = Matrix.getObject("ecOrgChart") as ExternalComponent;

    // ── 텍스트 설정 ──
    lblTitle.Value = "Organization Chart";
    btnLoad.Text = "Load";
    btnExpandAll.Text = "Expand All";
    btnCollapseAll.Text = "Collapse All";

    // ── Load 버튼 ──
    btnLoad.OnClick = function () {
        Matrix.doRefresh("grdOrg");
    };

    // ── Expand All / Collapse All ──
    btnExpandAll.OnClick = function () {
        let model = ecOrgChart.getModel();
        if (model) {
            model.expandAll();
            lblStatus.Value = "  All nodes expanded";
        }
    };

    btnCollapseAll.OnClick = function () {
        let model = ecOrgChart.getModel();
        if (model) {
            model.collapseAll();
            lblStatus.Value = "  All nodes collapsed";
        }
    };

    // ── 방향 변경 라디오 버튼 ──
    rdoVertical.OnValueChange = function (sender, args) {
        if (args.IsChecked) {
            let model = ecOrgChart.getModel();
            if (model) {
                model.setConfig({ Direction: 'top-to-bottom' });
                model.Update();
            }
        }
    };

    rdoHorizontal.OnValueChange = function (sender, args) {
        if (args.IsChecked) {
            let model = ecOrgChart.getModel();
            if (model) {
                model.setConfig({ Direction: 'left-to-right' });
                model.Update();
            }
        }
    };

    // ── 컴포넌트 로딩 완료 후 그리드 연결 ──
    ecOrgChart.OnComponentReady = function () {
        let model = ecOrgChart.getModel();
        if (!model) return;

        model.setGrid(grdOrg);

        model.OnNodeClick = function (args) {
            lblStatus.Value = "  " + args.name + " (" + args.title + ")";
        };
    };
};
