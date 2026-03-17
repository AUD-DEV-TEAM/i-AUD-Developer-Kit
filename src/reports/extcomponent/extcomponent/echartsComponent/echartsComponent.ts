import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { DataGridRow } from "@AUD_CLIENT/control/grids/DataGridRow";
import { DataGridColumn } from "@AUD_CLIENT/control/grids/DataGridColumn";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataTable } from "@AUD_CLIENT/data/DataTable";
import { DataColumn } from "@AUD_CLIENT/data/DataColumn";

(function (global: any) {
    'use strict';

    const PALETTES: Record<string, string[] | null> = {
        'default': null,
        'pastel':      ['#f3a683','#f7d794','#778beb','#786fa6','#e77f67','#cf6a87','#63cdda','#ea8685','#596275','#574b90'],
        'vivid':       ['#e74c3c','#3498db','#2ecc71','#f39c12','#9b59b6','#1abc9c','#e67e22','#34495e','#e91e63','#00bcd4'],
        'monochrome':  ['#212121','#424242','#616161','#757575','#9e9e9e','#bdbdbd','#e0e0e0','#eeeeee','#f5f5f5','#fafafa'],
        'warm':        ['#d32f2f','#f44336','#ff5722','#ff9800','#ffc107','#ffeb3b','#ff7043','#e64a19','#bf360c','#f9a825'],
        'cool':        ['#0d47a1','#1565c0','#1976d2','#1e88e5','#42a5f5','#64b5f6','#26c6da','#00acc1','#00897b','#43a047']
    };

    const CHART_TYPE_MAP: Record<string, string> = {
        'bar': 'bar', 'line': 'line', 'pie': 'pie',
        'scatter': 'scatter', 'radar': 'radar',
        'heatmap': 'heatmap', 'treemap': 'treemap', 'funnel': 'funnel',
        'area': 'area', 'horizontalBar': 'horizontalBar',
        'stackedBar': 'stackedBar', 'stackedLine': 'stackedLine', 'stackedArea': 'stackedArea'
    };

    /** 커스텀 차트 타입 → ECharts 시리즈 타입 매핑 */
    function resolveSeriesType(chartType: string): string {
        if (chartType === 'area' || chartType === 'stackedLine' || chartType === 'stackedArea') return 'line';
        if (chartType === 'horizontalBar' || chartType === 'stackedBar') return 'bar';
        return chartType;
    }

    /** 커스텀 차트 타입에 따른 시리즈 추가 속성 */
    function getSeriesExtras(chartType: string): any {
        let extras: any = {};
        if (chartType === 'area') { extras.areaStyle = {}; }
        if (chartType === 'stackedBar') { extras.stack = 'total'; }
        if (chartType === 'stackedLine') { extras.stack = 'total'; }
        if (chartType === 'stackedArea') { extras.stack = 'total'; extras.areaStyle = {}; }
        return extras;
    }

    class EChartsComponent implements IComponentBridge {
        private container: HTMLDivElement | null = null;
        private chart: any = null;
        private config: any = {};
        private grid: DataGrid | null = null;
        private lastDataSet: DataSet | null = null;
        private lastOption: any = null;

        Create(container: HTMLDivElement, config: any): void {
            this.container = container;
            this.config = config || {};
            const theme: string = this.config.Theme || 'default';
            this.chart = echarts.init(container, theme === 'default' ? null : theme);
            if (this.config.BackgroundColor && this.config.BackgroundColor !== '#ffffff') {
                container.style.backgroundColor = this.config.BackgroundColor;
            }
        }

        Resize(width: number, height: number): void {
            if (this.chart) {
                this.chart.resize({ width: width, height: height });
            }
        }

        Dispose(): void {
            if (this.chart) {
                this.chart.dispose();
                this.chart = null;
            }
            this.container = null;
            this.grid = null;
            this.lastDataSet = null;
            this.lastOption = null;
        }

        GetValue(): string[] { return []; }

        SetValue(values: string[]): void { }

        Serialize(target: any): void { }

        Deserialize(source: any): void { }

        /** 바인딩할 DataGrid를 설정하고 OnDataChanged 이벤트 등록 */
        setGrid(grid: DataGrid): void {
            this.grid = grid;
            const _this = this;
            grid.OnDataChanged = function (sender, args) {
                if (!_this.grid || sender.Name !== _this.grid.Name) return;
                _this._loadFromGrid();
            };
            // 그리드에 이미 데이터가 있으면 즉시 로드
            if (grid.GetRowCount() > 0) {
                this._loadFromGrid();
            }
        }

        /** config 값을 외부에서 변경 */
        setConfig(overrides: any): void {
            if (!overrides) return;
            for (let key in overrides) {
                if (overrides.hasOwnProperty(key)) {
                    this.config[key] = overrides[key];
                }
            }
        }

        getConfig(): any { return this.config; }

        /** 현재 데이터로 다시 렌더링 (config 변경 후 호출) */
        Update(): void {
            if (this.grid && this.grid.GetRowCount() > 0) {
                this._loadFromGrid();
            } else if (this.lastDataSet && this.lastDataSet.GetTableCount() > 0) {
                this._loadFromDataTable(this.lastDataSet.GetTable(0));
            }
        }
        
        /** 외부에서 DataSet을 전달받아 첫 번째 DataTable 기준으로 차트 렌더링 */
        ApplyDataSource(ds: DataSet): void {
            if (!ds || !this.chart) return;
            if (ds.GetTableCount() === 0) return;
            this.lastDataSet = ds;
            const dt: DataTable = ds.GetTable(0);
            this._loadFromDataTable(dt);
        }

        /** 차트 타입 변경 후 다시 렌더링 */
        setChartType(type: string): void {
            this.config.ChartType = type;
            this.Update();
        }

        /** PNG data URL 내보내기 */
        exportImage(): string {
            if (!this.chart) return '';
            return this.chart.getDataURL({ type: 'png', backgroundColor: '#fff' });
        }

        /** ECharts 옵션 직접 설정 */
        setEChartsOption(option: any, notMerge?: boolean): void {
            if (!this.chart) return;
            this.chart.setOption(option, !!notMerge);
            this.lastOption = this.chart.getOption();
        }

        /** ECharts 인스턴스 반환 */
        getEChartsInstance(): any {
            return this.chart;
        }

        /** echarts 라이브러리 객체 반환 (init, registerTheme 등) */
        getECharts(): any {
            return echarts;
        }

        /** 그리드의 Row/Column 기준으로 차트를 렌더링 */
        private _loadFromGrid(): void {
            if (!this.grid || !this.chart) return;
            const rowCount: number = this.grid.GetRowCount();
            if (rowCount === 0) return;

            const fields: DataGridColumn[] = this.grid.GetFields();
            const chartType: string = CHART_TYPE_MAP[this.config.ChartType] || 'bar';

            // 카테고리(문자열) 컬럼 / 숫자 컬럼 분류
            let catField: string = '';
            const numFields: string[] = [];
            for (let i = 0; i < fields.length; i++) {
                const field: DataGridColumn = fields[i];
                const name: string = field.Name as string;
                const isNum: boolean = field.DataType === 0; // enDataType.Numeric = 0
                if (!catField && !isNum) {
                    catField = name;
                } else if (isNum) {
                    numFields.push(name);
                }
            }

            // 카테고리 값 수집
            const categories: string[] = [];
            for (let r = 0; r < rowCount; r++) {
                const row: DataGridRow = this.grid.GetRow(r);
                categories.push(catField ? String(row.GetValue(catField) || '') : String(r));
            }

            // 시리즈 생성
            const sType: string = resolveSeriesType(chartType);
            const extras: any = getSeriesExtras(chartType);
            const isPie: boolean = chartType === 'pie';

            const series: any[] = [];
            for (let s = 0; s < numFields.length; s++) {
                const fieldName: string = numFields[s];
                const seriesData: number[] = [];
                for (let r2 = 0; r2 < rowCount; r2++) {
                    const row2: DataGridRow = this.grid.GetRow(r2);
                    const v = row2.GetValue(fieldName);
                    seriesData.push(v != null ? Number(v) : 0);
                }

                const seriesItem: any = {
                    name: fieldName,
                    type: isPie ? 'pie' : sType,
                    data: isPie
                        ? categories.map(function (cat: string, idx: number) { return { name: cat, value: seriesData[idx] }; })
                        : seriesData
                };

                // 추가 속성 (stack, areaStyle 등)
                for (let ek in extras) {
                    if (extras.hasOwnProperty(ek)) { seriesItem[ek] = extras[ek]; }
                }

                if (this.config.LabelPosition && this.config.LabelPosition !== 'none') {
                    seriesItem.label = { show: true, position: this.config.LabelPosition };
                }

                series.push(seriesItem);
            }

            this._applyOption(chartType, series, categories, numFields);
        }

        /** DataTable 기준으로 차트를 렌더링 */
        private _loadFromDataTable(dt: DataTable): void {
            if (!dt || !this.chart) return;
            const rowCount: number = dt.GetRowCount();
            if (rowCount === 0) return;

            const colNames: string[] = dt.GetColumnNames();
            const chartType: string = CHART_TYPE_MAP[this.config.ChartType] || 'bar';

            // 카테고리(문자열) 컬럼 / 숫자 컬럼 분류
            let catField: string = '';
            const numFields: string[] = [];
            for (let i = 0; i < colNames.length; i++) {
                const col: DataColumn = dt.GetColumn(colNames[i]);
                const isNum: boolean = col.DataType === 0; // enDataType.Numeric = 0
                if (!catField && !isNum) {
                    catField = colNames[i];
                } else if (isNum) {
                    numFields.push(colNames[i]);
                }
            }

            // 카테고리 값 수집
            const categories: string[] = [];
            for (let r = 0; r < rowCount; r++) {
                categories.push(catField ? String(dt.getData(r, catField) || '') : String(r));
            }

            // 시리즈 생성
            const sType: string = resolveSeriesType(chartType);
            const extras: any = getSeriesExtras(chartType);
            const isPie: boolean = chartType === 'pie';

            const series: any[] = [];
            for (let s = 0; s < numFields.length; s++) {
                const fieldName: string = numFields[s];
                const seriesData: number[] = [];
                for (let r2 = 0; r2 < rowCount; r2++) {
                    const v = dt.getData(r2, fieldName);
                    seriesData.push(v != null ? Number(v) : 0);
                }

                const seriesItem: any = {
                    name: fieldName,
                    type: isPie ? 'pie' : sType,
                    data: isPie
                        ? categories.map(function (cat: string, idx: number) { return { name: cat, value: seriesData[idx] }; })
                        : seriesData
                };

                for (let ek in extras) {
                    if (extras.hasOwnProperty(ek)) { seriesItem[ek] = extras[ek]; }
                }

                if (this.config.LabelPosition && this.config.LabelPosition !== 'none') {
                    seriesItem.label = { show: true, position: this.config.LabelPosition };
                }

                series.push(seriesItem);
            }

            this._applyOption(chartType, series, categories, numFields);
        }

        /** 시리즈 + 카테고리로 최종 옵션을 조립하여 차트에 적용 (공통) */
        private _applyOption(chartType: string, series: any[], categories: string[], numFields: string[]): void {
            if (!this.chart) return;

            // Radar 특수 처리
            if (chartType === 'radar') {
                const indicator: Array<{ name: string }> = [];
                for (let ri = 0; ri < numFields.length; ri++) {
                    indicator.push({ name: numFields[ri] });
                }
                // radar는 시리즈 데이터를 재구성해야 함 — 원본 시리즈에서 값 추출
                const radarValues: any[] = [];
                for (let ci = 0; ci < categories.length; ci++) {
                    const vals: number[] = [];
                    for (let si = 0; si < series.length; si++) {
                        vals.push(series[si].data[ci] || 0);
                    }
                    radarValues.push({ name: categories[ci], value: vals });
                }
                const option: any = this._buildBaseOption(series);
                option.radar = { indicator: indicator };
                option.series = [{ type: 'radar', data: radarValues }];
                delete option.xAxis;
                delete option.yAxis;
                delete option.grid;
                this.lastOption = option;
                this.chart.setOption(option, true);
                return;
            }

            const option: any = this._buildBaseOption(series);
            const sType: string = resolveSeriesType(chartType);
            const needsAxis: boolean = ['bar', 'line', 'scatter', 'heatmap'].indexOf(sType) >= 0;

            if (needsAxis) {
                if (chartType === 'horizontalBar') {
                    // 가로 막대: 축 반전
                    option.yAxis = { type: 'category', data: categories };
                    option.xAxis = { type: 'value' };
                } else {
                    option.xAxis = { type: 'category', data: categories };
                    option.yAxis = { type: 'value' };
                }
                option.grid = this._buildGrid();
            }

            this.lastOption = option;
            this.chart.setOption(option, true);
        }

        /** 공통 옵션 생성 */
        private _buildBaseOption(series: any[]): any {
            const legendPos: string = this.config.LegendPosition || 'bottom';
            const showLegend: boolean = this.config.ShowLegend !== false;

            // legend 위치별 설정
            const legend: any = { show: showLegend };
            if (showLegend) {
                if (legendPos === 'top') {
                    legend.top = 30;         // 타이틀 아래
                    legend.left = 'center';
                } else if (legendPos === 'bottom') {
                    legend.bottom = 0;
                    legend.left = 'center';
                } else if (legendPos === 'left') {
                    legend.left = 0;
                    legend.top = 'middle';
                    legend.orient = 'vertical';
                } else if (legendPos === 'right') {
                    legend.right = 0;
                    legend.top = 'middle';
                    legend.orient = 'vertical';
                }
            }

            const option: any = {
                tooltip: { show: this.config.ShowTooltip !== false },
                legend: legend,
                series: series,
                animationDuration: this.config.AnimationDuration || 800
            };

            const palette: string[] | null | undefined = PALETTES[this.config.ColorPalette];
            if (palette) {
                option.color = palette;
            }

            if (this.config.ShowToolbox) {
                option.toolbox = {
                    show: true,
                    feature: {
                        saveAsImage: { show: true },
                        dataZoom: { show: true },
                        restore: { show: true }
                    }
                };
            }

            const chartType: string = CHART_TYPE_MAP[this.config.ChartType] || 'bar';
            if (this.config.EnableDataZoom && ['bar', 'line', 'scatter'].indexOf(chartType) >= 0) {
                option.dataZoom = [
                    { type: 'inside', start: 0, end: 100 },
                    { type: 'slider', start: 0, end: 100 }
                ];
            }

            return option;
        }

        /** legend 위치에 따른 grid 여백 계산 */
        private _buildGrid(): any {
            const legendPos: string = this.config.LegendPosition || 'bottom';
            const showLegend: boolean = this.config.ShowLegend !== false;
            let grid: any = { left: '3%', right: '4%', top: 60, bottom: '3%', containLabel: true };
            if (showLegend) {
                if (legendPos === 'top') {
                    grid.top = 80;          // 타이틀(30) + legend(~50)
                } else if (legendPos === 'bottom') {
                    grid.bottom = 40;
                } else if (legendPos === 'left') {
                    grid.left = '15%';
                } else if (legendPos === 'right') {
                    grid.right = '15%';
                }
            }
            return grid;
        }
    }

    global.AUD = global.AUD || {};
    global.AUD.EChartsComponent = EChartsComponent;

})(window);
