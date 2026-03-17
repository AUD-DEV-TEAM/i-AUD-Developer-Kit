import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { DataGridRow } from "@AUD_CLIENT/control/grids/DataGridRow";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataTable } from "@AUD_CLIENT/data/DataTable";

(function (global: any) {
    'use strict';

    class SunburstComponent implements IComponentBridge {
        private container: HTMLDivElement | null = null;
        private chart: any = null;
        private config: any = {};
        private grid: DataGrid | null = null;
        private lastDataSet: DataSet | null = null;
        /** id → DataGridRow 매핑 (ECharts 데이터에 넣지 않고 별도 보관) */
        private _rowMap: Record<string, DataGridRow> = {};

        /** 노드 클릭 이벤트 */
        OnNodeClick: ((args: { name: string, id: string, parentId: string, value: number, row: DataGridRow | null }) => void) | null = null;

        Create(container: HTMLDivElement, config: any): void {
            this.container = container;
            this.config = config || {};
            this.chart = echarts.init(container);

            var self = this;
            this.chart.on('click', function (params: any) {
                if (self.OnNodeClick && params.data) {
                    var id: string = params.data._id || '';
                    self.OnNodeClick({
                        name: params.data.name || '',
                        id: id,
                        parentId: params.data._parentId || '',
                        value: params.data.value || 0,
                        row: self._rowMap[id] || null
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
            this._rowMap = {};
            this.OnNodeClick = null;
        }

        GetValue(): string[] { return []; }
        SetValue(values: string[]): void { }
        Serialize(target: any): void { }
        Deserialize(source: any): void { }

        /** 외부에서 DataSet을 전달받아 첫 번째 DataTable 기준으로 선버스트 렌더링 */
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
        getEChartsInstance(): any { return this.chart; }

        /** PNG data URL 내보내기 */
        exportImage(): string {
            if (!this.chart) return '';
            return this.chart.getDataURL({ type: 'png', backgroundColor: '#fff' });
        }

        /** 그리드의 Row 기준으로 트리 데이터 구성 후 렌더링 */
        private _loadFromGrid(): void {
            if (!this.grid || !this.chart) return;
            var rowCount: number = this.grid.GetRowCount();
            if (rowCount === 0) return;

            var idField: string = this.config.IdField || 'ID';
            var parentField: string = this.config.ParentIdField || 'PARENT_ID';
            var nameField: string = this.config.NameField || 'NAME';
            var valueField: string = this.config.ValueField || 'VALUE';

            // 플랫 데이터 → 트리 구조 변환 (DataGridRow는 _rowMap에 별도 보관)
            this._rowMap = {};
            var map: Record<string, any> = {};
            var items: Array<{ id: string, parentId: string }> = [];

            for (var r = 0; r < rowCount; r++) {
                var row: DataGridRow = this.grid.GetRow(r);
                var id: string = String(row.GetValue(idField) || '');
                var parentId: string = String(row.GetValue(parentField) || '');
                var name: string = String(row.GetValue(nameField) || '');
                var value: number = Number(row.GetValue(valueField)) || 0;
                this._rowMap[id] = row;
                items.push({ id: id, parentId: parentId });
                map[id] = { name: name, value: value, children: [], _id: id, _parentId: parentId };
            }

            var roots: any[] = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (!item.parentId || !map[item.parentId]) {
                    roots.push(map[item.id]);
                } else {
                    map[item.parentId].children.push(map[item.id]);
                }
            }

            // 부모 노드의 value가 0이면 자식 합산
            this._calcParentValues(roots);

            this._renderChart(roots);
        }

        /** DataTable 기준으로 트리 데이터 구성 후 렌더링 (row 참조 없음) */
        private _loadFromDataTable(dt: DataTable): void {
            if (!dt || !this.chart) return;
            var rowCount: number = dt.GetRowCount();
            if (rowCount === 0) return;

            var idField: string = this.config.IdField || 'ID';
            var parentField: string = this.config.ParentIdField || 'PARENT_ID';
            var nameField: string = this.config.NameField || 'NAME';
            var valueField: string = this.config.ValueField || 'VALUE';

            this._rowMap = {};
            var map: Record<string, any> = {};
            var items: Array<{ id: string, parentId: string }> = [];

            for (var r = 0; r < rowCount; r++) {
                var id: string = String(dt.getData(r, idField) || '');
                var parentId: string = String(dt.getData(r, parentField) || '');
                var name: string = String(dt.getData(r, nameField) || '');
                var value: number = Number(dt.getData(r, valueField)) || 0;
                items.push({ id: id, parentId: parentId });
                map[id] = { name: name, value: value, children: [], _id: id, _parentId: parentId };
            }

            var roots: any[] = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (!item.parentId || !map[item.parentId]) {
                    roots.push(map[item.id]);
                } else {
                    map[item.parentId].children.push(map[item.id]);
                }
            }

            // 부모 노드의 value가 0이면 자식 합산
            this._calcParentValues(roots);

            this._renderChart(roots);
        }

        /** 부모 노드의 value가 0이면 자식 합산 (재귀) */
        private _calcParentValues(nodes: any[]): number {
            var total = 0;
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                if (node.children && node.children.length > 0) {
                    var childSum = this._calcParentValues(node.children);
                    if (node.value === 0) {
                        node.value = childSum;
                    }
                }
                total += node.value;
            }
            return total;
        }

        /** ECharts sunburst 옵션 조립 및 렌더링 */
        private _renderChart(roots: any[]): void {
            if (!this.chart) return;

            var sortOrder: string = this.config.Sort || 'desc';
            var showLabel: boolean = this.config.ShowLabel !== false;
            var labelSize: number = this.config.FontSize || 11;
            var animDuration: number = this.config.AnimationDuration || 800;

            var option: any = {
                tooltip: {
                    trigger: 'item',
                    formatter: function (params: any) {
                        var name = params.data.name || '';
                        var val = params.data.value || 0;
                        return name + ': ' + val;
                    }
                },
                series: [{
                    type: 'sunburst',
                    data: roots,
                    radius: ['0%', '90%'],
                    sort: sortOrder,
                    emphasis: { focus: 'ancestor' },
                    label: {
                        show: showLabel,
                        fontSize: labelSize,
                        rotate: 'radial'
                    },
                    itemStyle: {
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor: '#fff'
                    },
                    animationDuration: animDuration,
                    animationDurationUpdate: 750
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
    global.AUD.SunburstComponent = SunburstComponent;

})(window);
