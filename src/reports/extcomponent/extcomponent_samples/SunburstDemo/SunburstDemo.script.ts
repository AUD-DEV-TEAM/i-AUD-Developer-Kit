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
    let grdSunburst = Matrix.getObject("grdSunburst") as DataGrid;
    let ecSunburst = Matrix.getObject("ecSunburst") as ExternalComponent;

    // ── 텍스트 설정 ──
    lblTitle.Value = "Sunburst Chart - 조직별 예산";
    btnLoad.Text = "Load";

    // ── Load 버튼 ──
    btnLoad.OnClick = function () {
        Matrix.doRefresh("grdSunburst");
    };

    // ── 컴포넌트 로딩 완료 후 그리드 연결 ──
    ecSunburst.OnComponentReady = function () {
        let model = ecSunburst.getModel();
        if (!model) return;

        model.setConfig({
            IdField: 'ID',
            ParentIdField: 'PARENT_ID',
            NameField: 'NAME',
            ValueField: 'VALUE',
            Title: '조직별 예산 현황'
        });

        model.setGrid(grdSunburst);

        model.OnNodeClick = function (args) {
            lblStatus.Value = "  " + args.name + " (value: " + args.value + ")" + (args.parentId ? " parent: " + args.parentId : " (root)");
        };
    };
};
