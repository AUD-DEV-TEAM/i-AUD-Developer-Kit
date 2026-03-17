import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { DataGridRow } from "@AUD_CLIENT/control/grids/DataGridRow";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataTable } from "@AUD_CLIENT/data/DataTable";

(function (global: any) {
    'use strict';

    interface KanbanCard {
        title: string;
        status: string;
        description: string;
        color: string;
        rowIndex: number;
        row: DataGridRow | null;
    }

    interface KanbanColumn {
        name: string;
        el: HTMLDivElement;
        body: HTMLDivElement;
        countBadge: HTMLSpanElement;
    }

    class KanbanComponent implements IComponentBridge {
        private container: HTMLDivElement | null = null;
        private config: any = {};
        private boardEl: HTMLDivElement | null = null;
        private columns: KanbanColumn[] = [];
        private cards: KanbanCard[] = [];
        private grid: DataGrid | null = null;
        private lastDataSet: DataSet | null = null;

        // 마우스 드래그 상태
        private _dragIndex: number = -1;
        private _dragEl: HTMLDivElement | null = null;
        private _ghostEl: HTMLDivElement | null = null;
        private _mouseMoveHandler: ((e: MouseEvent) => void) | null = null;

        /** 카드 이동 전 이벤트. args.cancel = true 시 이동 취소 */
        OnCardMoving: ((args: { row: DataGridRow | null, title: string, fromStatus: string, toStatus: string, cancel: boolean }) => void) | null = null;

        /** 카드 이동 후 이벤트 */
        OnCardMoved: ((args: { row: DataGridRow | null, title: string, fromStatus: string, toStatus: string }) => void) | null = null;

        Create(container: HTMLDivElement, config: any): void {
            this.container = container;
            this.config = config || {};
            this.boardEl = document.createElement('div');
            this.boardEl.className = 'kanban-board';
            container.appendChild(this.boardEl);
            const colStr: string = this.config.Columns || 'To Do,In Progress,Done';
            const colNames: string[] = colStr.split(',');
            for (let i = 0; i < colNames.length; i++) {
                this._createColumn(colNames[i].trim());
            }

            // 마우스 드래그: mouseup 으로 드롭 처리
            if (this.config.EnableDragDrop !== false) {
                const self = this;

                this._mouseMoveHandler = function (e: MouseEvent) {
                    if (self._dragIndex < 0 || !self._ghostEl) return;
                    self._ghostEl.style.left = (e.pageX + 8) + 'px';
                    self._ghostEl.style.top = (e.pageY - 16) + 'px';
                };
                document.addEventListener('mousemove', this._mouseMoveHandler);

                container.addEventListener('mouseup', function (e: MouseEvent) {
                    if (self._dragIndex < 0) return;
                    let target: HTMLElement | null = e.target as HTMLElement;
                    while (target && target !== container) {
                        if (target.classList.contains('kanban-column-body')) {
                            let targetCol: string | null = target.getAttribute('data-column');
                            if (targetCol) {
                                self._moveCard(self._dragIndex, targetCol);
                            }
                            break;
                        }
                        target = target.parentElement;
                    }
                    self._endDrag();
                });

                document.addEventListener('mouseup', function () {
                    if (self._dragIndex < 0) return;
                    self._endDrag();
                });
            }
        }

        Resize(width: number, height: number): void {
            if (this.boardEl) { this.boardEl.style.height = height + 'px'; }
        }

        Dispose(): void {
            if (this.container) {
                while (this.container.firstChild) {
                    this.container.removeChild(this.container.firstChild);
                }
            }
            this.container = null;
            this.boardEl = null;
            this.columns = [];
            this.cards = [];
            this.grid = null;
            this.lastDataSet = null;
            this._endDrag();
            if (this._mouseMoveHandler) {
                document.removeEventListener('mousemove', this._mouseMoveHandler);
                this._mouseMoveHandler = null;
            }
            this.OnCardMoving = null;
            this.OnCardMoved = null;
        }

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

        /** 그리드의 Row 객체를 기준으로 카드를 생성 */
        private _loadFromGrid(): void {
            if (!this.grid || !this.boardEl) return;
            const rowCount: number = this.grid.GetRowCount();
            if (rowCount === 0) {
                this.cards = [];
                this._renderCards();
                return;
            }
            const titleField: string = this.config.CardTitleField || 'TITLE';
            const statusField: string = this.config.CardStatusField || 'STATUS';
            const descField: string = this.config.CardDescField || 'DESCRIPTION';
            const colorField: string = this.config.CardColorField || '';
            this.cards = [];
            for (let r = 0; r < rowCount; r++) {
                const row: DataGridRow = this.grid.GetRow(r);
                const card: KanbanCard = {
                    title: String(row.GetValue(titleField) || ''),
                    status: String(row.GetValue(statusField) || ''),
                    description: descField ? String(row.GetValue(descField) || '') : '',
                    color: colorField ? String(row.GetValue(colorField) || '') : '',
                    rowIndex: r,
                    row: row
                };
                this.cards.push(card);
            }
            this._renderCards();
        }

        Update(): void {
            if (this.grid && this.grid.GetRowCount() > 0) {
                this._loadFromGrid();
            } else if (this.lastDataSet && this.lastDataSet.GetTableCount() > 0) {
                this._loadFromDataTable(this.lastDataSet.GetTable(0));
            }
        }

        GetValue(): string[] {
            return [];
        }

        /** 외부에서 DataSet을 전달받아 첫 번째 DataTable 기준으로 카드 생성 */
        ApplyDataSource(ds: DataSet): void {
            if (!ds || !this.boardEl) return;
            if (ds.GetTableCount() === 0) return;
            this.lastDataSet = ds;
            this._loadFromDataTable(ds.GetTable(0));
        }

        /** DataTable 기준으로 카드를 생성 (row 참조 없음 — 드래그 시 그리드 동기화 불가) */
        private _loadFromDataTable(dt: DataTable): void {
            if (!dt || !this.boardEl) return;
            const rowCount: number = dt.GetRowCount();
            if (rowCount === 0) {
                this.cards = [];
                this._renderCards();
                return;
            }
            const titleField: string = this.config.CardTitleField || 'TITLE';
            const statusField: string = this.config.CardStatusField || 'STATUS';
            const descField: string = this.config.CardDescField || 'DESCRIPTION';
            const colorField: string = this.config.CardColorField || '';
            this.cards = [];
            for (let r = 0; r < rowCount; r++) {
                const card: KanbanCard = {
                    title: String(dt.getData(r, titleField) || ''),
                    status: String(dt.getData(r, statusField) || ''),
                    description: descField ? String(dt.getData(r, descField) || '') : '',
                    color: colorField ? String(dt.getData(r, colorField) || '') : '',
                    rowIndex: r,
                    row: null
                };
                this.cards.push(card);
            }
            this._renderCards();
        }
        SetValue(values: string[]): void {
            
        }

        Serialize(target: any): void { }

        Deserialize(source: any): void { }

        /** config 값을 외부에서 변경 (필드 매핑, 옵션 등) */
        setConfig(overrides: any): void {
            if (!overrides) return;
            for (let key in overrides) {
                if (overrides.hasOwnProperty(key)) {
                    this.config[key] = overrides[key];
                }
            }
        }

        /** 현재 config 반환 */
        getConfig(): any {
            return this.config;
        }

        getCards(): KanbanCard[] { return this.cards; }

        clearCards(): void { this.cards = []; this._renderCards(); }

        /** 카드 이동: row.SetValue → grid.ReDraw → 이벤트 */
        private _moveCard(cardIndex: number, toStatus: string): void {
            const card: KanbanCard = this.cards[cardIndex];
            if (!card || card.status === toStatus) return;

            const fromStatus: string = card.status;

            // OnCardMoving: 이동 전 검증 (cancel 가능)
            if (this.OnCardMoving) {
                const movingArgs = {
                    row: card.row,
                    title: card.title,
                    fromStatus: fromStatus,
                    toStatus: toStatus,
                    cancel: false
                };
                this.OnCardMoving(movingArgs);
                if (movingArgs.cancel) return;
            }

            // 카드 상태 변경
            card.status = toStatus;

            // 그리드 원본 Row 업데이트 (RowStatus 자동 'U')
            if (card.row) {
                const statusField: string = this.config.CardStatusField || 'STATUS';
                card.row.SetValue(statusField, toStatus);
            }

            this._renderCards();

            // 그리드 화면 갱신
            if (this.grid) {
                this.grid.ReDraw();
            }

            // OnCardMoved: 이동 후 통지
            if (this.OnCardMoved) {
                this.OnCardMoved({
                    row: card.row,
                    title: card.title,
                    fromStatus: fromStatus,
                    toStatus: toStatus
                });
            }
        }

        /** 드래그 종료: ghost 제거 + 상태 초기화 */
        private _endDrag(): void {
            if (this._dragEl) {
                this._dragEl.classList.remove('kanban-card-dragging');
            }
            if (this._ghostEl && this._ghostEl.parentElement) {
                this._ghostEl.parentElement.removeChild(this._ghostEl);
            }
            this._dragIndex = -1;
            this._dragEl = null;
            this._ghostEl = null;
            for (let c = 0; c < this.columns.length; c++) {
                this.columns[c].body.classList.remove('kanban-drop-target');
            }
        }

        /** 카드 복제본(ghost)을 생성하여 document.body에 추가 */
        private _createGhost(sourceEl: HTMLDivElement, e: MouseEvent): void {
            const ghost: HTMLDivElement = sourceEl.cloneNode(true) as HTMLDivElement;
            ghost.className = 'kanban-card kanban-ghost';
            ghost.style.position = 'fixed';
            ghost.style.left = (e.pageX + 8) + 'px';
            ghost.style.top = (e.pageY - 16) + 'px';
            ghost.style.width = sourceEl.offsetWidth + 'px';
            ghost.style.pointerEvents = 'none';
            ghost.style.zIndex = '99999';
            ghost.style.opacity = '0.85';
            ghost.style.boxShadow = '0 8px 24px rgba(0,0,0,0.18)';
            ghost.style.transition = 'none';
            document.body.appendChild(ghost);
            this._ghostEl = ghost;
        }

        private _createColumn(name: string): void {
            const col: HTMLDivElement = document.createElement('div');
            col.className = 'kanban-column';
            col.setAttribute('data-column', name);
            const headerColor: string = this.config.HeaderColor || '#7b1fa2';
            const header: HTMLDivElement = document.createElement('div');
            header.className = 'kanban-column-header';
            header.style.borderTopColor = headerColor;
            const headerTitle: HTMLSpanElement = document.createElement('span');
            headerTitle.className = 'kanban-column-title';
            headerTitle.textContent = name;
            header.appendChild(headerTitle);
            const countBadge: HTMLSpanElement = document.createElement('span');
            countBadge.className = 'kanban-column-count';
            countBadge.textContent = '0';
            header.appendChild(countBadge);
            col.appendChild(header);
            const body: HTMLDivElement = document.createElement('div');
            body.className = 'kanban-column-body';
            body.setAttribute('data-column', name);
            col.appendChild(body);

            if (this.config.EnableDragDrop !== false) {
                const self = this;
                body.addEventListener('mouseenter', function () {
                    if (self._dragIndex >= 0) {
                        this.classList.add('kanban-drop-target');
                    }
                });
                body.addEventListener('mouseleave', function () {
                    this.classList.remove('kanban-drop-target');
                });
            }

            this.boardEl!.appendChild(col);
            this.columns.push({ name: name, el: col, body: body, countBadge: countBadge });
        }

        private _renderCards(): void {
            for (let c = 0; c < this.columns.length; c++) {
                const body: HTMLDivElement = this.columns[c].body;
                while (body.firstChild) {
                    body.removeChild(body.firstChild);
                }
            }
            const self = this;
            const counts: Record<string, number> = {};
            for (let i = 0; i < this.cards.length; i++) {
                const card: KanbanCard = this.cards[i];
                const colBody: HTMLDivElement | null = this._findColumnBody(card.status);
                if (!colBody) continue;
                const cardEl: HTMLDivElement = document.createElement('div');
                cardEl.className = 'kanban-card';
                if (card.color) { cardEl.style.borderLeftColor = card.color; }

                if (this.config.EnableDragDrop !== false) {
                    cardEl.setAttribute('data-index', String(i));
                    cardEl.addEventListener('mousedown', function (e: MouseEvent) {
                        e.preventDefault();
                        self._dragIndex = parseInt(this.getAttribute('data-index') || '-1', 10);
                        self._dragEl = this;
                        this.classList.add('kanban-card-dragging');
                        self._createGhost(this, e);
                    });
                }

                const titleEl: HTMLDivElement = document.createElement('div');
                titleEl.className = 'kanban-card-title';
                titleEl.textContent = card.title;
                cardEl.appendChild(titleEl);
                if (card.description) {
                    const descEl: HTMLDivElement = document.createElement('div');
                    descEl.className = 'kanban-card-desc';
                    descEl.textContent = card.description;
                    cardEl.appendChild(descEl);
                }
                colBody.appendChild(cardEl);
                counts[card.status] = (counts[card.status] || 0) + 1;
            }
            for (let j = 0; j < this.columns.length; j++) {
                this.columns[j].countBadge.textContent = String(counts[this.columns[j].name] || 0);
            }
        }

        private _findColumnBody(status: string): HTMLDivElement | null {
            for (let i = 0; i < this.columns.length; i++) {
                if (this.columns[i].name === status) { return this.columns[i].body; }
            }
            return null;
        }
    }

    global.AUD = global.AUD || {};
    global.AUD.KanbanComponent = KanbanComponent;

})(window);
