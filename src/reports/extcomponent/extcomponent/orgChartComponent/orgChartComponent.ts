import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { DataGridRow } from "@AUD_CLIENT/control/grids/DataGridRow";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataTable } from "@AUD_CLIENT/data/DataTable";

(function (global: any) {
    'use strict';

    interface IOrgNode {
        id: string;
        parentId: string;
        name: string;
        title: string;
        row: DataGridRow | null;
    }

    interface IOrgTreeNode {
        data: IOrgNode;
        children: IOrgTreeNode[];
        isVirtual?: boolean;
    }

    interface IOrgChartConfig {
        IdField?: string;
        ParentIdField?: string;
        NameField?: string;
        TitleField?: string;
        Direction?: string;
        NodeColor?: string;
        NodeWidth?: number;
        NodeHeight?: number;
        EnableCollapse?: boolean;
    }

    interface ICollapsedSet {
        [id: string]: boolean;
    }

    class OrgChartComponent implements IComponentBridge {
        private container: HTMLElement | null = null;
        private config: IOrgChartConfig = {};
        private scrollEl: HTMLDivElement | null = null;
        private chartEl: HTMLDivElement | null = null;
        private grid: DataGrid | null = null;
        private lastDataSet: DataSet | null = null;
        private nodes: IOrgNode[] = [];
        private tree: IOrgTreeNode | null = null;
        private collapsedSet: ICollapsedSet = {};

        /** 노드 클릭 이벤트 */
        OnNodeClick: ((args: { row: DataGridRow | null, id: string, name: string, title: string }) => void) | null = null;

        Create(container: HTMLElement, config: IOrgChartConfig): void {
            this.container = container;
            this.config = config || {};

            this.scrollEl = document.createElement('div');
            this.scrollEl.className = 'orgchart-scroll';
            container.appendChild(this.scrollEl);

            this.chartEl = document.createElement('div');
            this.chartEl.className = 'orgchart-container';
            this.scrollEl.appendChild(this.chartEl);
        }

        Resize(width: number, height: number): void {
            if (this.scrollEl) {
                this.scrollEl.style.width = width + 'px';
                this.scrollEl.style.height = height + 'px';
            }
        }

        Dispose(): void {
            if (this.container) {
                while (this.container.firstChild) {
                    this.container.removeChild(this.container.firstChild);
                }
            }
            this.container = null;
            this.scrollEl = null;
            this.chartEl = null;
            this.grid = null;
            this.lastDataSet = null;
            this.nodes = [];
            this.tree = null;
            this.collapsedSet = {};
            this.OnNodeClick = null;
        }

        /** 외부에서 DataSet을 전달받아 첫 번째 DataTable 기준으로 노드 생성 */
        ApplyDataSource(ds: DataSet): void {
            if (!ds) return;
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

        /** 그리드의 Row 객체를 기준으로 노드를 생성 */
        private _loadFromGrid(): void {
            if (!this.grid) return;
            const rowCount: number = this.grid.GetRowCount();
            const idField: string = this.config.IdField || 'ID';
            const parentField: string = this.config.ParentIdField || 'PARENT_ID';
            const nameField: string = this.config.NameField || 'NAME';
            const titleField: string = this.config.TitleField || 'TITLE';

            this.nodes = [];
            for (let r = 0; r < rowCount; r++) {
                const row: DataGridRow = this.grid.GetRow(r);
                this.nodes.push({
                    id: String(row.GetValue(idField) || ''),
                    parentId: String(row.GetValue(parentField) || ''),
                    name: String(row.GetValue(nameField) || ''),
                    title: titleField ? String(row.GetValue(titleField) || '') : '',
                    row: row
                });
            }
            this.tree = this._buildTree();
            this._render();
        }

        /** DataTable 기준으로 노드를 생성 (row 참조 없음) */
        private _loadFromDataTable(dt: DataTable): void {
            if (!dt) return;
            const rowCount: number = dt.GetRowCount();
            const idField: string = this.config.IdField || 'ID';
            const parentField: string = this.config.ParentIdField || 'PARENT_ID';
            const nameField: string = this.config.NameField || 'NAME';
            const titleField: string = this.config.TitleField || 'TITLE';

            this.nodes = [];
            for (let r = 0; r < rowCount; r++) {
                this.nodes.push({
                    id: String(dt.getData(r, idField) || ''),
                    parentId: String(dt.getData(r, parentField) || ''),
                    name: String(dt.getData(r, nameField) || ''),
                    title: titleField ? String(dt.getData(r, titleField) || '') : '',
                    row: null
                });
            }
            this.tree = this._buildTree();
            this._render();
        }

        /** config 값을 외부에서 변경 */
        setConfig(overrides: any): void {
            if (!overrides) return;
            for (let key in overrides) {
                if (overrides.hasOwnProperty(key)) {
                    (this.config as any)[key] = overrides[key];
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
            } else if (this.nodes.length > 0) {
                this.tree = this._buildTree();
                this._render();
            }
        }

        GetValue(): string[] { return []; }

        SetValue(values: string[]): void { }

        Serialize(target: any): void { }

        Deserialize(source: any): void { }

        collapseNode(nodeId: string): void {
            this.collapsedSet[nodeId] = true;
            this._render();
        }

        expandNode(nodeId: string): void {
            delete this.collapsedSet[nodeId];
            this._render();
        }

        expandAll(): void {
            this.collapsedSet = {};
            this._render();
        }

        collapseAll(): void {
            for (let i = 0; i < this.nodes.length; i++) {
                this.collapsedSet[this.nodes[i].id] = true;
            }
            this._render();
        }

        getNodes(): IOrgNode[] {
            return this.nodes;
        }

        private _buildTree(): IOrgTreeNode | null {
            const map: { [id: string]: IOrgTreeNode } = {};
            const roots: IOrgTreeNode[] = [];

            for (let i = 0; i < this.nodes.length; i++) {
                const node: IOrgNode = this.nodes[i];
                map[node.id] = { data: node, children: [] };
            }

            for (let j = 0; j < this.nodes.length; j++) {
                const n: IOrgNode = this.nodes[j];
                if (!n.parentId || !map[n.parentId]) {
                    roots.push(map[n.id]);
                } else {
                    map[n.parentId].children.push(map[n.id]);
                }
            }

            if (roots.length === 1) return roots[0];
            if (roots.length === 0) return null;
            return {
                data: { id: '__root__', name: '', title: '', parentId: '', row: null },
                children: roots,
                isVirtual: true
            };
        }

        private _render(): void {
            if (!this.chartEl || !this.tree) return;

            while (this.chartEl.firstChild) {
                this.chartEl.removeChild(this.chartEl.firstChild);
            }

            const direction: string = this.config.Direction || 'top-to-bottom';
            this.chartEl.className = 'orgchart-container orgchart-dir-' + direction;

            const rootEl: HTMLElement | null = this._renderNode(this.tree);
            if (rootEl) {
                this.chartEl.appendChild(rootEl);
            }
        }

        private _renderNode(treeNode: IOrgTreeNode): HTMLElement | null {
            if (!treeNode) return null;

            const data: IOrgNode = treeNode.data;
            const nodeColor: string = this.config.NodeColor || '#6a1b9a';
            const nodeWidth: number = this.config.NodeWidth || 140;
            const nodeHeight: number = this.config.NodeHeight || 60;
            const enableCollapse: boolean = this.config.EnableCollapse !== false;
            const isCollapsed: boolean = this.collapsedSet[data.id] === true;
            const hasChildren: boolean = !!(treeNode.children && treeNode.children.length > 0);
            const self = this;

            const group: HTMLDivElement = document.createElement('div');
            group.className = 'orgchart-group';

            if (!treeNode.isVirtual) {
                const card: HTMLDivElement = document.createElement('div');
                card.className = 'orgchart-node';
                card.style.width = nodeWidth + 'px';
                card.style.minHeight = nodeHeight + 'px';

                const header: HTMLDivElement = document.createElement('div');
                header.className = 'orgchart-node-header';
                header.style.backgroundColor = nodeColor;
                header.textContent = data.name;
                card.appendChild(header);

                if (data.title) {
                    const body: HTMLDivElement = document.createElement('div');
                    body.className = 'orgchart-node-body';
                    body.textContent = data.title;
                    card.appendChild(body);
                }

                // 노드 클릭 이벤트
                card.style.cursor = 'pointer';
                card.addEventListener('click', function (e: MouseEvent) {
                    // 토글 버튼 클릭은 제외
                    if ((e.target as HTMLElement).classList.contains('orgchart-toggle')) return;
                    if (self.OnNodeClick) {
                        self.OnNodeClick({ row: data.row, id: data.id, name: data.name, title: data.title });
                    }
                });

                if (hasChildren && enableCollapse) {
                    const toggleBtn: HTMLButtonElement = document.createElement('button');
                    toggleBtn.className = 'orgchart-toggle';
                    toggleBtn.textContent = isCollapsed ? '+' : '\u2212';
                    toggleBtn.setAttribute('data-id', data.id);
                    toggleBtn.addEventListener('click', function () {
                        const id: string | null = this.getAttribute('data-id');
                        if (id) {
                            if (self.collapsedSet[id]) {
                                delete self.collapsedSet[id];
                            } else {
                                self.collapsedSet[id] = true;
                            }
                            self._render();
                        }
                    });
                    card.appendChild(toggleBtn);
                }

                group.appendChild(card);
            }

            if (hasChildren && !isCollapsed) {
                const childrenEl: HTMLDivElement = document.createElement('div');
                childrenEl.className = 'orgchart-children';
                for (let i = 0; i < treeNode.children.length; i++) {
                    const childEl: HTMLElement | null = this._renderNode(treeNode.children[i]);
                    if (childEl) {
                        childrenEl.appendChild(childEl);
                    }
                }
                group.appendChild(childrenEl);
            }

            return group;
        }
    }

    global.AUD = global.AUD || {};
    global.AUD.OrgChartComponent = OrgChartComponent;
})(window);
