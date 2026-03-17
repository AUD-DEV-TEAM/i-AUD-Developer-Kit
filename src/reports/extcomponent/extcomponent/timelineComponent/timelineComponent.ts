import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { DataGridRow } from "@AUD_CLIENT/control/grids/DataGridRow";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataTable } from "@AUD_CLIENT/data/DataTable";

(function (global: any) {
    'use strict';

    const DEFAULT_COLORS: string[] = ['#1565c0', '#2e7d32', '#f57c00', '#c62828', '#6a1b9a', '#00838f', '#4e342e', '#37474f'];

    interface ITimelineEvent {
        date: string;
        title: string;
        description: string;
        color: string;
        icon: string;
    }

    interface ITimelineConfig {
        DateField?: string;
        TitleField?: string;
        DescriptionField?: string;
        ColorField?: string;
        IconField?: string;
        Layout?: string;
        LineColor?: string;
        ShowDate?: boolean;
    }

    interface IColumnDef {
        Name?: string;
        name?: string;
    }

    interface IDataPayload {
        columns?: IColumnDef[];
        Columns?: IColumnDef[];
        rows?: any[];
        Rows?: any[];
    }

    interface IFieldMap {
        [key: string]: number;
    }

    class TimelineComponent implements IComponentBridge {
        private container: HTMLElement | null = null;
        private config: ITimelineConfig = {};
        private wrapperEl: HTMLDivElement | null = null;
        private events: ITimelineEvent[] = [];
        private grid: DataGrid | null = null;
        private lastDataSet: DataSet | null = null;

        Create(container: HTMLElement, config: ITimelineConfig): void {
            this.container = container;
            this.config = config || {};

            this.wrapperEl = document.createElement('div');
            this.wrapperEl.className = 'timeline-wrapper';
            container.appendChild(this.wrapperEl);
        }

        Resize(width: number, height: number): void {
            if (this.wrapperEl) {
                this.wrapperEl.style.height = height + 'px';
                this.wrapperEl.style.overflow = 'auto';
            }
        }

        Dispose(): void {
            if (this.container) {
                while (this.container.firstChild) {
                    this.container.removeChild(this.container.firstChild);
                }
            }
            this.container = null;
            this.wrapperEl = null;
            this.events = [];
            this.grid = null;
            this.lastDataSet = null;
        }

        /** 외부에서 DataSet을 전달받아 첫 번째 DataTable 기준으로 이벤트 생성 */
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
            // 그리드에 이미 데이터가 있으면 즉시 로드
            if (grid.GetRowCount() > 0) {
                this._loadFromGrid();
            }
        }

        /** config 값을 외부에서 변경 (필드 매핑, 옵션 등) */
        setConfig(overrides: any): void {
            if (!overrides) return;
            for (let key in overrides) {
                if (overrides.hasOwnProperty(key)) {
                    (this.config as any)[key] = overrides[key];
                }
            }
            // 레이아웃/스타일 변경 시 즉시 재렌더
            if (this.events.length > 0) {
                this._render();
            }
        }

        /** 현재 config 반환 */
        getConfig(): ITimelineConfig {
            return this.config;
        }

        /** 그리드의 Row 객체를 기준으로 이벤트 목록 생성 */
        private _loadFromGrid(): void {
            if (!this.grid) return;
            const rowCount: number = this.grid.GetRowCount();
            if (rowCount === 0) {
                this.events = [];
                this._render();
                return;
            }
            const dateField: string = this.config.DateField || 'DATE';
            const titleField: string = this.config.TitleField || 'TITLE';
            const descField: string = this.config.DescriptionField || 'DESCRIPTION';
            const colorField: string = this.config.ColorField || '';
            const iconField: string = this.config.IconField || '';

            this.events = [];
            for (let r = 0; r < rowCount; r++) {
                const row: DataGridRow = this.grid.GetRow(r);
                this.events.push({
                    date: String(row.GetValue(dateField) || ''),
                    title: String(row.GetValue(titleField) || ''),
                    description: descField ? String(row.GetValue(descField) || '') : '',
                    color: colorField ? String(row.GetValue(colorField) || '') : '',
                    icon: iconField ? String(row.GetValue(iconField) || '') : ''
                });
            }
            this._render();
        }

        Update(): void {
            if (this.grid && this.grid.GetRowCount() > 0) {
                this._loadFromGrid();
            } else if (this.lastDataSet && this.lastDataSet.GetTableCount() > 0) {
                this._loadFromDataTable(this.lastDataSet.GetTable(0));
            }
        }

        /** DataTable 기준으로 이벤트 목록 생성 */
        private _loadFromDataTable(dt: DataTable): void {
            if (!dt) return;
            const rowCount: number = dt.GetRowCount();
            if (rowCount === 0) {
                this.events = [];
                this._render();
                return;
            }
            const dateField: string = this.config.DateField || 'DATE';
            const titleField: string = this.config.TitleField || 'TITLE';
            const descField: string = this.config.DescriptionField || 'DESCRIPTION';
            const colorField: string = this.config.ColorField || '';
            const iconField: string = this.config.IconField || '';

            this.events = [];
            for (let r = 0; r < rowCount; r++) {
                this.events.push({
                    date: String(dt.getData(r, dateField) || ''),
                    title: String(dt.getData(r, titleField) || ''),
                    description: descField ? String(dt.getData(r, descField) || '') : '',
                    color: colorField ? String(dt.getData(r, colorField) || '') : '',
                    icon: iconField ? String(dt.getData(r, iconField) || '') : ''
                });
            }
            this._render();
        }

        SetData(data: IDataPayload): void {
            if (!data) return;

            const columns: IColumnDef[] = data.columns || data.Columns || [];
            const rows: any[] = data.rows || data.Rows || [];
            const dateField: string = this.config.DateField || 'DATE';
            const titleField: string = this.config.TitleField || 'TITLE';
            const descField: string = this.config.DescriptionField || 'DESCRIPTION';
            const colorField: string = this.config.ColorField || '';
            const iconField: string = this.config.IconField || '';

            const fieldMap: IFieldMap = {};
            for (let c = 0; c < columns.length; c++) {
                const name: string = columns[c].Name || columns[c].name || '';
                fieldMap[name] = c;
            }

            this.events = [];
            for (let r = 0; r < rows.length; r++) {
                const row = rows[r];
                this.events.push({
                    date: this._getCellValue(row, fieldMap[dateField], dateField),
                    title: this._getCellValue(row, fieldMap[titleField], titleField),
                    description: this._getCellValue(row, fieldMap[descField], descField),
                    color: colorField ? this._getCellValue(row, fieldMap[colorField], colorField) : '',
                    icon: iconField ? this._getCellValue(row, fieldMap[iconField], iconField) : ''
                });
            }

            this._render();
        }

        GetValue(): string[] {
            return [JSON.stringify(this.events)];
        }

        SetValue(values: string[]): void {
            if (values && values.length > 0) {
                try {
                    this.events = JSON.parse(values[0]);
                    this._render();
                } catch (e) { /* ignore parse errors */ }
            }
        }

        Serialize(target: any): void {
            target.events = this.events;
        }

        Deserialize(source: any): void {
            if (source && source.events) {
                this.events = source.events;
                this._render();
            }
        }

        addEvent(date: string, title: string, description?: string, color?: string): void {
            this.events.push({
                date: date,
                title: title,
                description: description || '',
                color: color || '',
                icon: ''
            });
            this._render();
        }

        removeEvent(index: number): void {
            if (index >= 0 && index < this.events.length) {
                this.events.splice(index, 1);
                this._render();
            }
        }

        clearEvents(): void {
            this.events = [];
            this._render();
        }

        getEvents(): ITimelineEvent[] {
            return this.events;
        }

        private _getCellValue(row: any, idx: number | undefined, field: string): string {
            if (Array.isArray(row)) {
                return idx != null && idx >= 0 ? String(row[idx] || '') : '';
            }
            return String(row[field] || '');
        }

        private _render(): void {
            if (!this.wrapperEl) return;

            while (this.wrapperEl.firstChild) {
                this.wrapperEl.removeChild(this.wrapperEl.firstChild);
            }

            const layout: string = this.config.Layout || 'left';
            const lineColor: string = this.config.LineColor || '#1565c0';
            const showDate: boolean = this.config.ShowDate !== false;

            const list: HTMLDivElement = document.createElement('div');
            list.className = 'timeline-list timeline-layout-' + layout;
            list.style.setProperty('--timeline-color', lineColor);

            for (let i = 0; i < this.events.length; i++) {
                const evt: ITimelineEvent = this.events[i];
                const color: string = evt.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];

                const item: HTMLDivElement = document.createElement('div');
                item.className = 'timeline-item';
                if (layout === 'alternate' && i % 2 === 1) {
                    item.classList.add('timeline-item-right');
                }

                const marker: HTMLDivElement = document.createElement('div');
                marker.className = 'timeline-marker';
                marker.style.backgroundColor = color;
                if (evt.icon) {
                    marker.textContent = evt.icon;
                    marker.classList.add('timeline-marker-icon');
                }
                item.appendChild(marker);

                const content: HTMLDivElement = document.createElement('div');
                content.className = 'timeline-content';
                content.style.borderLeftColor = color;

                if (showDate && evt.date) {
                    const dateEl: HTMLDivElement = document.createElement('div');
                    dateEl.className = 'timeline-date';
                    dateEl.textContent = evt.date;
                    content.appendChild(dateEl);
                }

                const titleEl: HTMLDivElement = document.createElement('div');
                titleEl.className = 'timeline-title';
                titleEl.textContent = evt.title;
                content.appendChild(titleEl);

                if (evt.description) {
                    const descEl: HTMLDivElement = document.createElement('div');
                    descEl.className = 'timeline-desc';
                    descEl.textContent = evt.description;
                    content.appendChild(descEl);
                }

                item.appendChild(content);
                list.appendChild(item);
            }

            this.wrapperEl.appendChild(list);
        }
    }

    global.AUD = global.AUD || {};
    global.AUD.TimelineComponent = TimelineComponent;
})(window);