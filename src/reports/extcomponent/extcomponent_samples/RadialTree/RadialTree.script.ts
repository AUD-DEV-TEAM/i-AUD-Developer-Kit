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
    let rdoRadial = Matrix.getObject("rdoRadial") as RadioButton;
    let rdoOrthogonal = Matrix.getObject("rdoOrthogonal") as RadioButton;
    let grdTree = Matrix.getObject("grdTree") as DataGrid;
    let ecRadialTree = Matrix.getObject("ecRadialTree") as ExternalComponent;

    // ── 텍스트 설정 ──
    lblTitle.Value = "Radial Tree - Technology Stack";
    btnLoad.Text = "Load";

    // ── Load 버튼 ──
    btnLoad.OnClick = function () {
        Matrix.doRefresh("grdTree");
    };

    // ── 레이아웃 변경 라디오 버튼 ──
    rdoRadial.OnValueChange = function (sender, args) {
        if (args.IsChecked) {
            let model = ecRadialTree.getModel();
            if (model) {
                model.setConfig({ Layout: 'radial' });
                model.Update();
                lblStatus.Value = "  Radial layout";
            }
        }
    };

    rdoOrthogonal.OnValueChange = function (sender, args) {
        if (args.IsChecked) {
            let model = ecRadialTree.getModel();
            if (model) {
                model.setConfig({ Layout: 'orthogonal' });
                model.Update();
                lblStatus.Value = "  Orthogonal layout";
            }
        }
    };

    // ── 컴포넌트 로딩 완료 후 그리드 연결 ──
    ecRadialTree.OnComponentReady = function () {
        let model = ecRadialTree.getModel();
        if (!model) return;

        model.setGrid(grdTree);

        model.OnNodeClick = function (args) {
            lblStatus.Value = "  " + args.name + (args.parentId ? " (parent: " + args.parentId + ")" : " (root)");
        };
    };
};
