import { DataSet } from "@AUD_CLIENT/data/DataSet";

(function (global: any) {
    'use strict';

    class MarkdownComponent implements IComponentBridge {
        private container: HTMLElement | null = null;
        private config: any = {};
        private contentEl: HTMLDivElement | null = null;
        private rawMarkdown: string = '';

        Create(container: HTMLDivElement, config: any): void {
            this.container = container;
            this.config = config || {};
            const theme: string = this.config.Theme || 'light';
            const padding: number = this.config.Padding != null ? this.config.Padding : 20;

            this.contentEl = document.createElement('div');
            this.contentEl.className = 'markdown-body markdown-theme-' + theme;
            this.contentEl.style.padding = padding + 'px';
            this.contentEl.style.fontSize = (this.config.FontSize || 14) + 'px';
            container.appendChild(this.contentEl);

            if (typeof marked !== 'undefined') {
                marked.setOptions({
                    gfm: this.config.EnableGFM !== false,
                    breaks: this.config.EnableBreaks === true
                });
            }
        }

        Resize(width: number, height: number): void {
            if (this.contentEl) {
                this.contentEl.style.height = height + 'px';
                this.contentEl.style.overflow = 'auto';
            }
        }

        Dispose(): void {
            if (this.container) {
                this._clearElement(this.container);
            }
            this.container = null;
            this.contentEl = null;
            this.rawMarkdown = '';
        }

        SetData(data: any): void {
            if (!data) return;
            let md: string = '';
            if (typeof data === 'string') { md = data; }
            else if (data.text) { md = data.text; }
            else if (data.markdown) { md = data.markdown; }
            else if (data.rows && data.rows.length > 0) {
                const rows = data.rows || data.Rows || [];
                const row = rows[0];
                md = String(Array.isArray(row) ? row[0] : row[Object.keys(row)[0]] || '');
            }
            if (md) { this._render(md); }
        }

        GetValue(): string[] { return [this.rawMarkdown]; }

        SetValue(values: string[]): void {
            if (values && values.length > 0) { this._render(values[0]); }
        }

        ApplyDataSource(ds:DataSet):void{
            
        }
        Serialize(target: any): void { target.rawMarkdown = this.rawMarkdown; }

        Deserialize(source: any): void {
            if (source && source.rawMarkdown) { this._render(source.rawMarkdown); }
        }

        setMarkdown(md: string): void { this._render(md); }

        getMarkdown(): string { return this.rawMarkdown; }

        setTheme(theme: string): void {
            if (this.contentEl) { this.contentEl.className = 'markdown-body markdown-theme-' + theme; }
        }

        clear(): void {
            this.rawMarkdown = '';
            if (this.contentEl) { this._clearElement(this.contentEl); }
        }

        appendMarkdown(md: string): void {
            this.rawMarkdown += md;
            this._render(this.rawMarkdown);
        }

        private _render(md: string): void {
            this.rawMarkdown = md || '';
            if (!this.contentEl) return;
            this._clearElement(this.contentEl);
            if (typeof marked !== 'undefined') {
                let html: string = marked.parse(this.rawMarkdown);
                if (this.config.SanitizeHTML !== false) {
                    html = this._sanitize(html);
                }
                // DOMParser로 안전하게 변환 후 노드 삽입
                let doc: Document = new DOMParser().parseFromString(html, 'text/html');
                let nodes: NodeList = doc.body.childNodes;
                while (nodes.length > 0) {
                    this.contentEl.appendChild(nodes[0]);
                }
            } else {
                // marked 미로드 시 텍스트만 표시
                let pre: HTMLPreElement = document.createElement('pre');
                pre.textContent = this.rawMarkdown;
                this.contentEl.appendChild(pre);
            }
        }

        private _sanitize(html: string): string {
            return html
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
                .replace(/\bon\w+\s*=/gi, 'data-removed=');
        }

        /** 자식 노드 전부 제거 (innerHTML = '' 대체) */
        private _clearElement(el: HTMLElement): void {
            while (el.lastChild) {
                el.removeChild(el.lastChild);
            }
        }
    }

    global.AUD = global.AUD || {};
    global.AUD.MarkdownComponent = MarkdownComponent;

})(window);
