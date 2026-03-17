import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { DataGridRow } from "@AUD_CLIENT/control/grids/DataGridRow";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataTable } from "@AUD_CLIENT/data/DataTable";

(function (global: any) {
    'use strict';

    class RadialTreeComponent implements IComponentBridge {
        private container: HTMLDivElement | null = null;
        private chart: any = null;
        private config: any = {};
        private grid: DataGrid | null = null;
        private lastDataSet: DataSet | null = null;
        /** id → DataGridRow 매핑 (ECharts 데이터에 넣지 않고 별도 보관) */
        private _rowMap: Record<string, DataGridRow> = {};

        /** 노드 클릭 이벤트 */
        OnNodeClick: ((args: { name: string, id: string, parentId: string, row: DataGridRow | null }) => void) | null = null;

        Create(container: HTMLDivElement, config: any): void {
            this.container = container;
            this.config = config || {};
            this.chart = echarts.init(container);

            const self = this;
            this.chart.on('click', function (params: any) {
                if (self.OnNodeClick && params.data) {
                    const id: string = params.data._id || '';
                    self.OnNodeClick({
                        name: params.data.name || '',
                        id: id,
                        parentId: params.data._parentId || '',
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

        /** 외부에서 DataSet을 전달받아 첫 번째 DataTable 기준으로 트리 렌더링 */
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
        getEChartsInstance(): any { return this.chart; }

        /** PNG data URL 내보내기 */
        exportImage(): string {
            if (!this.chart) return '';
            return this.chart.getDataURL({ type: 'png', backgroundColor: '#fff' });
        }

        /** 그리드의 Row 기준으로 트리 데이터 구성 후 렌더링 */
        private _loadFromGrid(): void {
            if (!this.grid || !this.chart) return;
            const rowCount: number = this.grid.GetRowCount();
            if (rowCount === 0) return;

            const idField: string = this.config.IdField || 'ID';
            const parentField: string = this.config.ParentIdField || 'PARENT_ID';
            const nameField: string = this.config.NameField || 'NAME';

            // 플랫 데이터 → 트리 구조 변환 (DataGridRow는 _rowMap에 별도 보관)
            this._rowMap = {};
            const map: Record<string, any> = {};
            const items: Array<{ id: string, parentId: string }> = [];

            for (let r = 0; r < rowCount; r++) {
                const row: DataGridRow = this.grid.GetRow(r);
                const id: string = String(row.GetValue(idField) || '');
                const parentId: string = String(row.GetValue(parentField) || '');
                const name: string = String(row.GetValue(nameField) || '');
                this._rowMap[id] = row;
                items.push({ id: id, parentId: parentId });
                // ECharts에 전달할 데이터: 순수 plain object만 (row 객체 제외)
                map[id] = { name: name, children: [], _id: id, _parentId: parentId };
            }

            const roots: any[] = [];
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (!item.parentId || !map[item.parentId]) {
                    roots.push(map[item.id]);
                } else {
                    map[item.parentId].children.push(map[item.id]);
                }
            }

            let treeData: any;
            if (roots.length === 1) {
                treeData = roots[0];
            } else {
                treeData = { name: this.config.RootName || 'Root', children: roots, _id: '', _parentId: '' };
            }

            // 옵션 조립
            const layout: string = this.config.Layout || 'radial';
            const symbolSize: number = this.config.SymbolSize || 10;
            const lineColor: string = this.config.LineColor || '#ccc';
            const labelSize: number = this.config.FontSize || 11;

            const option: any = {
                tooltip: { trigger: 'item', triggerOn: 'mousemove' },
                series: [{
                    type: 'tree',
                    layout: layout,
                    data: [treeData],
                    symbolSize: symbolSize,
                    initialTreeDepth: this.config.InitialDepth != null ? this.config.InitialDepth : -1,
                    label: {
                        show: this.config.ShowLabel !== false,
                        fontSize: labelSize,
                        position: layout === 'radial' ? 'radial' : 'left'
                    },
                    leaves: {
                        label: {
                            position: layout === 'radial' ? 'radial' : 'right'
                        }
                    },
                    lineStyle: {
                        color: lineColor,
                        width: 1.5,
                        curveness: 0.5
                    },
                    emphasis: { focus: 'descendant' },
                    expandAndCollapse: true,
                    animationDuration: this.config.AnimationDuration || 550,
                    animationDurationUpdate: 750
                }]
            };

            if (layout !== 'radial') {
                option.series[0].left = '10%';
                option.series[0].right = '20%';
                option.series[0].top = '5%';
                option.series[0].bottom = '5%';
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

        /** DataTable 기준으로 트리 데이터 구성 후 렌더링 (row 참조 없음) */
        private _loadFromDataTable(dt: DataTable): void {
            if (!dt || !this.chart) return;
            const rowCount: number = dt.GetRowCount();
            if (rowCount === 0) return;

            const idField: string = this.config.IdField || 'ID';
            const parentField: string = this.config.ParentIdField || 'PARENT_ID';
            const nameField: string = this.config.NameField || 'NAME';

            this._rowMap = {};
            const map: Record<string, any> = {};
            const items: Array<{ id: string, parentId: string }> = [];

            for (let r = 0; r < rowCount; r++) {
                const id: string = String(dt.getData(r, idField) || '');
                const parentId: string = String(dt.getData(r, parentField) || '');
                const name: string = String(dt.getData(r, nameField) || '');
                items.push({ id: id, parentId: parentId });
                map[id] = { name: name, children: [], _id: id, _parentId: parentId };
            }

            const roots: any[] = [];
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (!item.parentId || !map[item.parentId]) {
                    roots.push(map[item.id]);
                } else {
                    map[item.parentId].children.push(map[item.id]);
                }
            }

            let treeData: any;
            if (roots.length === 1) {
                treeData = roots[0];
            } else {
                treeData = { name: this.config.RootName || 'Root', children: roots, _id: '', _parentId: '' };
            }

            const layout: string = this.config.Layout || 'radial';
            const symbolSize: number = this.config.SymbolSize || 10;
            const lineColor: string = this.config.LineColor || '#ccc';
            const labelSize: number = this.config.FontSize || 11;

            const option: any = {
                tooltip: { trigger: 'item', triggerOn: 'mousemove' },
                series: [{
                    type: 'tree',
                    layout: layout,
                    data: [treeData],
                    symbolSize: symbolSize,
                    initialTreeDepth: this.config.InitialDepth != null ? this.config.InitialDepth : -1,
                    label: {
                        show: this.config.ShowLabel !== false,
                        fontSize: labelSize,
                        position: layout === 'radial' ? 'radial' : 'left'
                    },
                    leaves: {
                        label: { position: layout === 'radial' ? 'radial' : 'right' }
                    },
                    lineStyle: { color: lineColor, width: 1.5, curveness: 0.5 },
                    emphasis: { focus: 'descendant' },
                    expandAndCollapse: true,
                    animationDuration: this.config.AnimationDuration || 550,
                    animationDurationUpdate: 750
                }]
            };

            if (layout !== 'radial') {
                option.series[0].left = '10%';
                option.series[0].right = '20%';
                option.series[0].top = '5%';
                option.series[0].bottom = '5%';
            }

            if (this.config.Title) {
                option.title = { text: this.config.Title, left: 'center', textStyle: { fontSize: 14 } };
            }

            this.chart.setOption(option, true);
        }
    }

    global.AUD = global.AUD || {};
    global.AUD.RadialTreeComponent = RadialTreeComponent;

})(window);
