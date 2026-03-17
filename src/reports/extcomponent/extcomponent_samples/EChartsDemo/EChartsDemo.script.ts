import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { ExternalComponent } from "@AUD_CLIENT/extcomponent/ExternalComponent";
import { Button } from "@AUD_CLIENT/control/Button";
import { Label } from "@AUD_CLIENT/control/Label";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { CheckBox } from "@AUD_CLIENT/control/CheckBox";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

let Matrix: Matrix;

Matrix.OnDocumentLoadComplete = function (sender, args) {

    // ── 컨트롤 참조 ──
    let lblTitle = Matrix.getObject("lblTitle") as Label;
    let lblStatus = Matrix.getObject("lblStatus") as Label;
    let btnLoadData = Matrix.getObject("btnLoadData") as Button;
    let btnExport = Matrix.getObject("btnExport") as Button;
    let cmbChartType = Matrix.getObject("cmbChartType") as ComboBox;
    let cmbTheme = Matrix.getObject("cmbTheme") as ComboBox;
    let cmbPalette = Matrix.getObject("cmbPalette") as ComboBox;
    let cmbLabel = Matrix.getObject("cmbLabel") as ComboBox;
    let cmbLegend = Matrix.getObject("cmbLegend") as ComboBox;
    let chkTooltip = Matrix.getObject("chkTooltip") as CheckBox;
    let chkToolbox = Matrix.getObject("chkToolbox") as CheckBox;
    let chkDataZoom = Matrix.getObject("chkDataZoom") as CheckBox;
    let grdSales = Matrix.getObject("grdSales") as DataGrid;
    let ecChart = Matrix.getObject("ecChart") as ExternalComponent;

    // ── 텍스트 설정 ──
    lblTitle.Value = "ECharts Component - Sales Dashboard";
    btnLoadData.Text = "Load Data";
    btnExport.Text = "Export PNG";

    // ── ComboBox 항목 초기화 ──
    let chartTypes = ['bar', 'line', 'area', 'pie', 'scatter', 'radar', 'funnel', 'horizontalBar', 'stackedBar', 'stackedLine', 'stackedArea'];
    cmbChartType.ClearDataSet();
    for (let i = 0; i < chartTypes.length; i++) {
        cmbChartType.AddItem(chartTypes[i], chartTypes[i]);
    }
    cmbChartType.Value = 'bar';

    let themes = ['default', 'dark', 'vintage', 'macarons', 'roma', 'shine'];
    cmbTheme.ClearDataSet();
    for (let i = 0; i < themes.length; i++) {
        cmbTheme.AddItem(themes[i], themes[i]);
    }
    cmbTheme.Value = 'default';

    let palettes = ['default', 'pastel', 'vivid', 'monochrome', 'warm', 'cool'];
    cmbPalette.ClearDataSet();
    for (let i = 0; i < palettes.length; i++) {
        cmbPalette.AddItem(palettes[i], palettes[i]);
    }
    cmbPalette.Value = 'vivid';

    let labels = ['none', 'top', 'inside', 'outside', 'left', 'right'];
    cmbLabel.ClearDataSet();
    for (let i = 0; i < labels.length; i++) {
        cmbLabel.AddItem(labels[i], labels[i]);
    }
    cmbLabel.Value = 'none';

    let legendPositions = ['bottom', 'top', 'left', 'right', 'hide'];
    cmbLegend.ClearDataSet();
    for (let i = 0; i < legendPositions.length; i++) {
        cmbLegend.AddItem(legendPositions[i], legendPositions[i]);
    }
    cmbLegend.Value = 'bottom';

    let chartModel: any = null;

    // ── 차트 타이틀 적용 ──
    function applyTitle() {
        if (!chartModel) return;
        chartModel.setEChartsOption({
            title: { text: '월별 매출 현황', left: 'center', top: 5, textStyle: { fontSize: 14 } }
        });
    }

    // ── Load Data 버튼 ──
    btnLoadData.OnClick = function () {
        Matrix.doRefresh("grdSales");
    };

    // ── Export PNG 버튼 ──
    btnExport.OnClick = function () {
        if (!chartModel) return;
        let dataUrl = chartModel.exportImage();
        if (!dataUrl) {
            Matrix.Alert("차트 데이터가 없습니다.");
            return;
        }
        let win = window.open('', '_blank');
        if (win) {
            win.document.write('<img src="' + dataUrl + '" style="max-width:100%"/>');
            win.document.title = 'ECharts Export';
        }
    };

    // ── ChartType 변경 ──
    cmbChartType.OnValueChanged = function (s, e) {
        let val = e.Value;
        if (!val || !chartModel) return;
        chartModel.setChartType(val);
        applyTitle();
        lblStatus.Value = "  Chart type: " + val;
    };

    // ── Theme 변경 (ECharts 인스턴스 재생성 필요) ──
    cmbTheme.OnValueChanged = function (s, e) {
        let val = e.Value;
        if (!val || !chartModel) return;
        let inst = chartModel.getEChartsInstance();
        if (!inst) return;
        let container = inst.getDom();
        let width = container.clientWidth;
        let height = container.clientHeight;
        inst.dispose();
        let ec = chartModel.getECharts();
        let newInst = ec.init(container, val === 'default' ? null : val);
        newInst.resize({ width: width, height: height });
        (chartModel as any).chart = newInst;
        // config + 그리드 데이터로 재렌더
        chartModel.Update();
        applyTitle();
        lblStatus.Value = "  Theme: " + val;
    };

    // ── Palette 변경 ──
    cmbPalette.OnValueChanged = function (s, e) {
        let val = e.Value;
        if (!val || !chartModel) return;
        chartModel.setConfig({ ColorPalette: val });
        chartModel.Update();
        applyTitle();
        lblStatus.Value = "  Palette: " + val;
    };

    // ── LabelPosition 변경 ──
    cmbLabel.OnValueChanged = function (s, e) {
        let val = e.Value;
        if (!chartModel) return;
        chartModel.setConfig({ LabelPosition: val || 'none' });
        chartModel.Update();
        applyTitle();
        lblStatus.Value = "  Label: " + (val || 'none');
    };

    // ── Legend 위치 변경 ──
    cmbLegend.OnValueChanged = function (s, e) {
        let val = e.Value;
        if (!chartModel) return;
        if (val === 'hide') {
            chartModel.setConfig({ ShowLegend: false });
        } else {
            chartModel.setConfig({ ShowLegend: true, LegendPosition: val });
        }
        chartModel.Update();
        applyTitle();
        lblStatus.Value = "  Legend: " + val;
    };

    // ── Tooltip 토글 ──
    chkTooltip.OnValueChange = function () {
        if (!chartModel) return;
        chartModel.setConfig({ ShowTooltip: chkTooltip.IsChecked });
        chartModel.Update();
        applyTitle();
    };

    // ── Toolbox 토글 ──
    chkToolbox.OnValueChange = function () {
        if (!chartModel) return;
        chartModel.setConfig({ ShowToolbox: chkToolbox.IsChecked });
        chartModel.Update();
        applyTitle();
    };

    // ── DataZoom 토글 ──
    chkDataZoom.OnValueChange = function () {
        if (!chartModel) return;
        chartModel.setConfig({ EnableDataZoom: chkDataZoom.IsChecked });
        chartModel.Update();
        applyTitle();
    };

    // ── 컴포넌트 로딩 완료 후 초기화 ──
    ecChart.OnComponentReady = function () {
        chartModel = ecChart.getModel();
        if (!chartModel) return;

        // 그리드 연결 (데이터가 있으면 자동 로드)
        chartModel.setGrid(grdSales);
        applyTitle();

        lblStatus.Value = "  Chart ready | Change options above";
    };
};
