import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { DataGridRow } from "@AUD_CLIENT/control/grids/DataGridRow";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataTable } from "@AUD_CLIENT/data/DataTable";

(function (global: any) {
    'use strict';

    class GraphComponent implements IComponentBridge {
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
            var self = this;
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

        /** 외부에서 DataSet을 전달받아 첫 번째 DataTable 기준으로 Graph 렌더링 */
        ApplyDataSource(ds: DataSet): void {
            if (!ds || !this.chart) return;
            if (ds.GetTableCount() === 0) return;
            this.lastDataSet = ds;
            this._loadFromDataTable(ds.GetTable(0));
        }

        /** 바인딩할 DataGrid를 설정하고 OnDataChanged 이벤트 등록 */
        setGrid(grid: DataGrid): void {
            this.grid = grid;
            var _this = this;
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
            for (var key in overrides) {
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

        /** 그리드의 Row 기준으로 Graph 데이터 구성 */
        private _loadFromGrid(): void {
            if (!this.grid || !this.chart) return;
            var rowCount: number = this.grid.GetRowCount();
            if (rowCount === 0) return;

            var sourceField: string = this.config.SourceField || 'SOURCE';
            var targetField: string = this.config.TargetField || 'TARGET';
            var valueField: string = this.config.ValueField || 'VALUE';

            // 노드 수집 (중복 제거) + 링크 카운트로 노드 크기 결정
            var nodeSet: Record<string, number> = {};
            var links: Array<{ source: string, target: string, value: number }> = [];

            for (var r = 0; r < rowCount; r++) {
                var row: DataGridRow = this.grid.GetRow(r);
                var source: string = String(row.GetValue(sourceField) || '');
                var target: string = String(row.GetValue(targetField) || '');
                var value: number = Number(row.GetValue(valueField)) || 0;

                if (source && target) {
                    nodeSet[source] = (nodeSet[source] || 0) + value;
                    nodeSet[target] = (nodeSet[target] || 0) + value;
                    links.push({ source: source, target: target, value: value });
                }
            }

            this._renderChart(nodeSet, links);
        }

        /** DataTable 기준으로 Graph 데이터 구성 */
        private _loadFromDataTable(dt: DataTable): void {
            if (!dt || !this.chart) return;
            var rowCount: number = dt.GetRowCount();
            if (rowCount === 0) return;

            var sourceField: string = this.config.SourceField || 'SOURCE';
            var targetField: string = this.config.TargetField || 'TARGET';
            var valueField: string = this.config.ValueField || 'VALUE';

            var nodeSet: Record<string, number> = {};
            var links: Array<{ source: string, target: string, value: number }> = [];

            for (var r = 0; r < rowCount; r++) {
                var source: string = String(dt.getData(r, sourceField) || '');
                var target: string = String(dt.getData(r, targetField) || '');
                var value: number = Number(dt.getData(r, valueField)) || 0;

                if (source && target) {
                    nodeSet[source] = (nodeSet[source] || 0) + value;
                    nodeSet[target] = (nodeSet[target] || 0) + value;
                    links.push({ source: source, target: target, value: value });
                }
            }

            this._renderChart(nodeSet, links);
        }

        /** 공통 ECharts 옵션 조립 및 렌더링 */
        private _renderChart(nodeSet: Record<string, number>, links: Array<{ source: string, target: string, value: number }>): void {
            if (!this.chart) return;

            var layout: string = this.config.Layout || 'force';
            var symbolSize: number = this.config.SymbolSize || 30;
            var lineWidth: number = this.config.LineWidth || 2;
            var showLabel: boolean = this.config.ShowLabel !== false;
            var fontSize: number = this.config.FontSize || 12;
            var repulsion: number = this.config.Repulsion || 200;

            // 노드 배열 구성 (크기를 연결 가중치에 비례)
            var maxWeight: number = 1;
            for (var name in nodeSet) {
                if (nodeSet.hasOwnProperty(name)) {
                    if (nodeSet[name] > maxWeight) {
                        maxWeight = nodeSet[name];
                    }
                }
            }

            var nodes: Array<{ name: string, symbolSize: number, value: number }> = [];
            for (var name in nodeSet) {
                if (nodeSet.hasOwnProperty(name)) {
                    var weight: number = nodeSet[name];
                    var size: number = Math.max(symbolSize * 0.5, symbolSize * (weight / maxWeight));
                    nodes.push({ name: name, symbolSize: size, value: weight });
                }
            }

            var option: any = {
                tooltip: {
                    trigger: 'item',
                    formatter: function (params: any) {
                        if (params.dataType === 'edge') {
                            return params.data.source + ' → ' + params.data.target + '<br/>Value: ' + params.data.value;
                        }
                        return params.name + '<br/>Weight: ' + params.data.value;
                    }
                },
                series: [{
                    type: 'graph',
                    layout: layout,
                    roam: true,
                    draggable: true,
                    force: {
                        repulsion: repulsion,
                        gravity: 0.1,
                        edgeLength: [50, 200],
                        layoutAnimation: true
                    },
                    label: {
                        show: showLabel,
                        position: 'right',
                        fontSize: fontSize
                    },
                    edgeLabel: {
                        show: false
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.3,
                        width: lineWidth
                    },
                    emphasis: {
                        focus: 'adjacency',
                        lineStyle: {
                            width: lineWidth * 2
                        }
                    },
                    data: nodes,
                    links: links
                }],
                animationDuration: this.config.AnimationDuration || 800,
                animationEasingUpdate: 'quinticInOut'
            };

            if (layout === 'circular') {
                option.series[0].circular = {
                    rotateLabel: true
                };
                option.series[0].label.position = 'right';
            }

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
    global.AUD.GraphComponent = GraphComponent;

})(window);
