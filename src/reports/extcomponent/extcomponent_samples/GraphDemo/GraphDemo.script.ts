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
    let rdoForce = Matrix.getObject("rdoForce") as RadioButton;
    let rdoCircular = Matrix.getObject("rdoCircular") as RadioButton;
    let grdGraph = Matrix.getObject("grdGraph") as DataGrid;
    let ecGraph = Matrix.getObject("ecGraph") as ExternalComponent;

    // ── 텍스트 설정 ──
    lblTitle.Value = "Network Graph - Tech Organization";
    btnLoad.Text = "Load Data";

    // ── Load 버튼 ──
    btnLoad.OnClick = function () {
        Matrix.doRefresh("grdGraph");
    };

    // ── 레이아웃 변경 라디오 버튼 ──
    rdoForce.OnValueChange = function (sender, args) {
        if (args.IsChecked) {
            let model = ecGraph.getModel();
            if (model) {
                model.setConfig({ Layout: 'force' });
                model.Update();
            }
        }
    };

    rdoCircular.OnValueChange = function (sender, args) {
        if (args.IsChecked) {
            let model = ecGraph.getModel();
            if (model) {
                model.setConfig({ Layout: 'circular' });
                model.Update();
            }
        }
    };

    // ── 컴포넌트 로딩 완료 후 그리드 연결 ──
    ecGraph.OnComponentReady = function () {
        let model = ecGraph.getModel();
        if (!model) return;

        model.setGrid(grdGraph);

        model.OnNodeClick = function (args) {
            lblStatus.Value = "  Node: " + args.name;
        };

        model.OnLinkClick = function (args) {
            lblStatus.Value = "  " + args.source + " \u2192 " + args.target + " (" + args.value + ")";
        };
    };
};
