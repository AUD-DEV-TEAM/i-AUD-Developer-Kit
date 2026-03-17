import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
import { Label } from "@AUD_CLIENT/control/Label";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { ExternalComponent } from "@AUD_CLIENT/extcomponent/ExternalComponent";

let Matrix: Matrix;

Matrix.OnDocumentLoadComplete = function (sender, args) {

    // ── 컨트롤 참조 ──
    let lblTitle = Matrix.getObject("lblTitle") as Label;
    let lblStatus = Matrix.getObject("lblStatus") as Label;
    let btnSetValue = Matrix.getObject("btnSetValue") as Button;
    let btnRandom = Matrix.getObject("btnRandom") as Button;
    let btnReset = Matrix.getObject("btnReset") as Button;
    let nbValue = Matrix.getObject("nbValue") as NumberBox;
    let cmbScheme = Matrix.getObject("cmbScheme") as ComboBox;
    let ecGauge1 = Matrix.getObject("ecGauge1") as ExternalComponent;
    let ecGauge2 = Matrix.getObject("ecGauge2") as ExternalComponent;
    let ecGauge3 = Matrix.getObject("ecGauge3") as ExternalComponent;

    // ── 초기 텍스트 ──
    lblTitle.Value = "Gauge Component Demo";
    btnSetValue.Text = "Set Value";
    btnRandom.Text = "Random";
    btnReset.Text = "Reset";

    // ── 콤보박스 색상 테마 목록 ──
    cmbScheme.AddItem("green-red", "Green → Red");
    cmbScheme.AddItem("blue", "Blue");
    cmbScheme.AddItem("rainbow", "Rainbow");
    cmbScheme.AddItem("monochrome", "Monochrome");
    cmbScheme.Value = "green-red";

    // ── Set Value 버튼 ──
    btnSetValue.OnClick = function () {
        let val = Number(nbValue.Value);
        if (isNaN(val)) {
            lblStatus.Value = "  Please enter a valid number";
            return;
        }
        setAllGauges(val);
        lblStatus.Value = "  Value set to " + val;
    };

    // ── Random 버튼 ──
    btnRandom.OnClick = function () {
        let v1 = Math.round(Math.random() * 100);
        let v2 = Math.round(Math.random() * 100);
        let v3 = Math.round(Math.random() * 100);
        setGaugeValue(ecGauge1, v1);
        setGaugeValue(ecGauge2, v2);
        setGaugeValue(ecGauge3, v3);
        lblStatus.Value = "  Random: " + v1 + ", " + v2 + ", " + v3;
    };

    // ── Reset 버튼 ──
    btnReset.OnClick = function () {
        setAllGauges(0);
        lblStatus.Value = "  Gauges reset to 0";
    };

    // ── 색상 테마 변경 ──
    cmbScheme.OnValueChanged = function () {
        let scheme = cmbScheme.Value;
        applyScheme(ecGauge1, scheme);
        applyScheme(ecGauge2, scheme);
        applyScheme(ecGauge3, scheme);
        lblStatus.Value = "  Color scheme: " + scheme;
    };

    // ── 유틸 함수 ──
    function setGaugeValue(ec: any, val: number): void {
        let model = ec.getModel();
        if (model) {
            model.SetData({ value: val });
        }
    }

    function setAllGauges(val: number): void {
        setGaugeValue(ecGauge1, val);
        setGaugeValue(ecGauge2, val);
        setGaugeValue(ecGauge3, val);
    }

    function applyScheme(ec: any, scheme: string): void {
        let model = ec.getModel();
        if (model) {
            model.setColorScheme(scheme);
        }
    }

    // ── 컴포넌트 로딩 완료 후 초기값 설정 ──
    let loadedCount = 0;
    function onGaugeLoaded(): void {
        loadedCount++;
        if (loadedCount === 3) {
            lblStatus.Value = "  3 gauges loaded | Enter a value and click Set Value";
        }
    }

    ecGauge1.OnComponentReady = function () {
        let model = ecGauge1.getModel() as any;
        model.setTitle("CPU Usage");
        model.SetData({ value: 65 });
        onGaugeLoaded();
    };

    ecGauge2.OnComponentReady = function () {
        let model = ecGauge2.getModel() as any;
        model.setTitle("Memory");
        model.setColorScheme("blue");
        model.SetData({ value: 42 });
        onGaugeLoaded();
    };

    ecGauge3.OnComponentReady = function () {
        let model = ecGauge3.getModel() as any;
        model.setTitle("Disk I/O");
        model.setColorScheme("rainbow");
        model.SetData({ value: 88 });
        onGaugeLoaded();
    };
};