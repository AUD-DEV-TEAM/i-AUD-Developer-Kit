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
    let rdoHorizontal = Matrix.getObject("rdoHorizontal") as RadioButton;
    let rdoVertical = Matrix.getObject("rdoVertical") as RadioButton;
    let grdSankey = Matrix.getObject("grdSankey") as DataGrid;
    let ecSankey = Matrix.getObject("ecSankey") as ExternalComponent;

    // ── 텍스트 설정 ──
    lblTitle.Value = "Sankey Chart - Customer Journey Flow";
    btnLoad.Text = "Load";

    // ── Load 버튼 ──
    btnLoad.OnClick = function () {
        Matrix.doRefresh("grdSankey");
    };

    // ── 방향 변경 라디오 버튼 ──
    rdoHorizontal.OnValueChange = function (sender, args) {
        if (args.IsChecked) {
            let model = ecSankey.getModel();
            if (model) {
                model.setConfig({ Orient: 'horizontal' });
                model.Update();
            }
        }
    };

    rdoVertical.OnValueChange = function (sender, args) {
        if (args.IsChecked) {
            let model = ecSankey.getModel();
            if (model) {
                model.setConfig({ Orient: 'vertical' });
                model.Update();
            }
        }
    };

    // ── 컴포넌트 로딩 완료 후 그리드 연결 ──
    ecSankey.OnComponentReady = function () {
        let model = ecSankey.getModel();
        if (!model) return;

        model.setGrid(grdSankey);

        model.OnNodeClick = function (args) {
            lblStatus.Value = "  Node: " + args.name;
        };

        model.OnLinkClick = function (args) {
            lblStatus.Value = "  " + args.source + " → " + args.target + " (" + args.value + ")";
        };
    };
};
