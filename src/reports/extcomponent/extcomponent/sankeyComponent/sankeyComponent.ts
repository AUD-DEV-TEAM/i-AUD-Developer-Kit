import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { DataGridRow } from "@AUD_CLIENT/control/grids/DataGridRow";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataTable } from "@AUD_CLIENT/data/DataTable";

(function (global: any) {
    'use strict';

    class SankeyComponent implements IComponentBridge {
        private container: HTMLDivElement | null = null;
        private chart: any = null;
        private config: any = {};
        private grid: DataGrid | null = null;
        private lastDataSet: DataSet | null = null;

        /** 노드 클릭 이벤트 */
        OnNodeClick: ((args: { name: string, row: DataGridRow | null }) => void) | null = null;

        /** 링크 클릭 이벤트 */
        OnLinkClick: ((args: { source: string, target: string, value: number }) => void) | null = null;

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
                if (params.dataType === 'node' && self.OnNodeClick) {
                    self.OnNodeClick({ name: params.name, row: null });
                } else if (params.dataType === 'edge' && self.OnLinkClick) {
                    self.OnLinkClick({
                        source: params.data.source,
                        target: params.data.target,
                        value: params.data.value
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
            this.OnNodeClick = null;
            this.OnLinkClick = null;
        }

        GetValue(): string[] { return []; }
        SetValue(values: string[]): void { }
        Serialize(target: any): void { }
        Deserialize(source: any): void { }

        /** 외부에서 DataSet을 전달받아 첫 번째 DataTable 기준으로 Sankey 렌더링 */
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

        /** 그리드의 Row 기준으로 Sankey 데이터 구성 */
        private _loadFromGrid(): void {
            if (!this.grid || !this.chart) return;
            const rowCount: number = this.grid.GetRowCount();
            if (rowCount === 0) return;

            const sourceField: string = this.config.SourceField || 'SOURCE';
            const targetField: string = this.config.TargetField || 'TARGET';
            const valueField: string = this.config.ValueField || 'VALUE';

            // 노드 수집 (중복 제거)
            const nodeSet: Record<string, boolean> = {};
            const links: Array<{ source: string, target: string, value: number }> = [];

            for (let r = 0; r < rowCount; r++) {
                const row: DataGridRow = this.grid.GetRow(r);
                const source: string = String(row.GetValue(sourceField) || '');
                const target: string = String(row.GetValue(targetField) || '');
                const value: number = Number(row.GetValue(valueField)) || 0;

                if (source && target) {
                    nodeSet[source] = true;
                    nodeSet[target] = true;
                    links.push({ source: source, target: target, value: value });
                }
            }

            const nodes: Array<{ name: string }> = [];
            for (let name in nodeSet) {
                if (nodeSet.hasOwnProperty(name)) {
                    nodes.push({ name: name });
                }
            }

            // 옵션 조립
            const orient: string = this.config.Orient || 'horizontal';
            const nodeWidth: number = this.config.NodeWidth || 20;
            const nodeGap: number = this.config.NodeGap || 10;
            const labelPos: string = orient === 'horizontal' ? 'right' : 'bottom';

            const option: any = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [{
                    type: 'sankey',
                    orient: orient,
                    nodeWidth: nodeWidth,
                    nodeGap: nodeGap,
                    layoutIterations: 32,
                    emphasis: { focus: 'adjacency' },
                    label: {
                        show: this.config.ShowLabel !== false,
                        position: labelPos,
                        fontSize: this.config.FontSize || 12
                    },
                    lineStyle: {
                        color: 'gradient',
                        curveness: 0.5
                    },
                    data: nodes,
                    links: links
                }],
                animationDuration: this.config.AnimationDuration || 800
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

        /** DataTable 기준으로 Sankey 데이터 구성 */
        private _loadFromDataTable(dt: DataTable): void {
            if (!dt || !this.chart) return;
            const rowCount: number = dt.GetRowCount();
            if (rowCount === 0) return;

            const sourceField: string = this.config.SourceField || 'SOURCE';
            const targetField: string = this.config.TargetField || 'TARGET';
            const valueField: string = this.config.ValueField || 'VALUE';

            const nodeSet: Record<string, boolean> = {};
            const links: Array<{ source: string, target: string, value: number }> = [];

            for (let r = 0; r < rowCount; r++) {
                const source: string = String(dt.getData(r, sourceField) || '');
                const target: string = String(dt.getData(r, targetField) || '');
                const value: number = Number(dt.getData(r, valueField)) || 0;

                if (source && target) {
                    nodeSet[source] = true;
                    nodeSet[target] = true;
                    links.push({ source: source, target: target, value: value });
                }
            }

            const nodes: Array<{ name: string }> = [];
            for (let name in nodeSet) {
                if (nodeSet.hasOwnProperty(name)) {
                    nodes.push({ name: name });
                }
            }

            const orient: string = this.config.Orient || 'horizontal';
            const nodeWidth: number = this.config.NodeWidth || 20;
            const nodeGap: number = this.config.NodeGap || 10;
            const labelPos: string = orient === 'horizontal' ? 'right' : 'bottom';

            const option: any = {
                tooltip: { trigger: 'item', triggerOn: 'mousemove' },
                series: [{
                    type: 'sankey',
                    orient: orient,
                    nodeWidth: nodeWidth,
                    nodeGap: nodeGap,
                    layoutIterations: 32,
                    emphasis: { focus: 'adjacency' },
                    label: {
                        show: this.config.ShowLabel !== false,
                        position: labelPos,
                        fontSize: this.config.FontSize || 12
                    },
                    lineStyle: { color: 'gradient', curveness: 0.5 },
                    data: nodes,
                    links: links
                }],
                animationDuration: this.config.AnimationDuration || 800
            };

            if (this.config.Title) {
                option.title = { text: this.config.Title, left: 'center', textStyle: { fontSize: 14 } };
            }

            this.chart.setOption(option, true);
        }
    }

    global.AUD = global.AUD || {};
    global.AUD.SankeyComponent = SankeyComponent;

})(window);
