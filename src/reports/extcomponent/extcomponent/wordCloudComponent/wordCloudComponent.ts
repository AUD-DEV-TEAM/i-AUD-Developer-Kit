import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { DataGridRow } from "@AUD_CLIENT/control/grids/DataGridRow";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataTable } from "@AUD_CLIENT/data/DataTable";

(function (global: any) {
    'use strict';

    const COLORS: string[] = [
        '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
        '#9b59b6', '#1abc9c', '#e67e22', '#34495e',
        '#c0392b', '#2980b9', '#27ae60', '#d35400',
        '#8e44ad', '#16a085', '#f1c40f', '#7f8c8d'
    ];

    class WordCloudComponent implements IComponentBridge {
        private container: HTMLDivElement | null = null;
        private chart: any = null;
        private config: any = {};
        private grid: DataGrid | null = null;
        private lastDataSet: DataSet | null = null;

        /** 워드 클릭 이벤트 */
        OnWordClick: ((args: { word: string, count: number }) => void) | null = null;

        Create(container: HTMLDivElement, config: any): void {
            this.container = container;
            this.config = config || {};
            this.chart = echarts.init(container);

            if (this.config.BackgroundColor && this.config.BackgroundColor !== '#ffffff') {
                container.style.backgroundColor = this.config.BackgroundColor;
            }

            // 클릭 이벤트 등록
            const self = this;
            this.chart.on('click', function (params: any) {
                if (params.componentType === 'series' && self.OnWordClick) {
                    self.OnWordClick({
                        word: params.name,
                        count: params.value
                    });
                }
            });
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
            this.OnWordClick = null;
        }

        GetValue(): string[] { return []; }
        SetValue(values: string[]): void { }
        Serialize(target: any): void { }
        Deserialize(source: any): void { }

        /** 외부에서 DataSet을 전달받아 첫 번째 DataTable 기준으로 워드 클라우드 렌더링 */
        ApplyDataSource(ds: DataSet): void {
            if (!ds || !this.chart) return;
            if (ds.GetTableCount() === 0) return;
            this.lastDataSet = ds;
            this._loadFromDataTable(ds.GetTable(0));
        }

        /** 바인딩할 DataGrid를 설정하고 OnDataChanged 이벤트 등록 */
        setGrid(grid: DataGrid): void {
            this.grid = grid;
            const _this = this;
            grid.OnDataChanged = function (sender, args) {
                if (!_this.grid || sender.Name !== _this.grid.Name) return;
                _this._loadFromGrid();
            };
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

        /** 현재 데이터로 다시 렌더링 */
        Update(): void {
            if (this.grid && this.grid.GetRowCount() > 0) {
                this._loadFromGrid();
            } else if (this.lastDataSet && this.lastDataSet.GetTableCount() > 0) {
                this._loadFromDataTable(this.lastDataSet.GetTable(0));
            }
        }

        /** ECharts 인스턴스 반환 */
        getEChartsInstance(): any {
            return this.chart;
        }

        /** PNG data URL 내보내기 */
        exportImage(): string {
            if (!this.chart) return '';
            return this.chart.getDataURL({ type: 'png', backgroundColor: '#fff' });
        }

        /** 그리드의 Row 기준으로 워드 클라우드 데이터 구성 */
        private _loadFromGrid(): void {
            if (!this.grid || !this.chart) return;
            const rowCount: number = this.grid.GetRowCount();
            if (rowCount === 0) return;

            const wordField: string = this.config.WordField || 'WORD';
            const countField: string = this.config.CountField || 'COUNT';

            const data: Array<{ name: string, value: number, textStyle: { color: string } }> = [];

            for (let r = 0; r < rowCount; r++) {
                const row: DataGridRow = this.grid.GetRow(r);
                const word: string = String(row.GetValue(wordField) || '');
                const count: number = Number(row.GetValue(countField)) || 0;

                if (word) {
                    data.push({
                        name: word,
                        value: count,
                        textStyle: { color: COLORS[r % COLORS.length] }
                    });
                }
            }

            this._renderChart(data);
        }

        /** DataTable 기준으로 워드 클라우드 데이터 구성 */
        private _loadFromDataTable(dt: DataTable): void {
            if (!dt || !this.chart) return;
            const rowCount: number = dt.GetRowCount();
            if (rowCount === 0) return;

            const wordField: string = this.config.WordField || 'WORD';
            const countField: string = this.config.CountField || 'COUNT';

            const data: Array<{ name: string, value: number, textStyle: { color: string } }> = [];

            for (let r = 0; r < rowCount; r++) {
                const word: string = String(dt.getData(r, wordField) || '');
                const count: number = Number(dt.getData(r, countField)) || 0;

                if (word) {
                    data.push({
                        name: word,
                        value: count,
                        textStyle: { color: COLORS[r % COLORS.length] }
                    });
                }
            }

            this._renderChart(data);
        }

        /** ECharts 옵션을 조립하여 렌더링 */
        private _renderChart(data: Array<{ name: string, value: number, textStyle: { color: string } }>): void {
            if (!this.chart || data.length === 0) return;

            const option: any = {
                tooltip: {
                    show: true,
                    formatter: function (params: any) {
                        return params.name + ': ' + params.value;
                    }
                },
                series: [{
                    type: 'wordCloud',
                    shape: this.config.Shape || 'circle',
                    gridSize: this.config.GridSize || 8,
                    sizeRange: [
                        this.config.MinFontSize || 14,
                        this.config.MaxFontSize || 80
                    ],
                    rotationRange: [
                        this.config.MinRotation !== undefined ? this.config.MinRotation : -45,
                        this.config.MaxRotation !== undefined ? this.config.MaxRotation : 45
                    ],
                    rotationStep: 15,
                    left: 'center',
                    top: 'center',
                    width: '90%',
                    height: '90%',
                    drawOutOfBound: false,
                    textStyle: {
                        fontFamily: this.config.FontFamily || 'sans-serif'
                    },
                    emphasis: {
                        textStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0,0,0,0.3)'
                        }
                    },
                    data: data
                }]
            };

            if (this.config.Title) {
                option.title = {
                    text: this.config.Title,
                    left: 'center',
                    textStyle: { fontSize: 14 }
                };
            }

            this.chart.setOption(option, true);
        }
    }

    global.AUD = global.AUD || {};
    global.AUD.WordCloudComponent = WordCloudComponent;

})(window);
