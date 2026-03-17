import { DataSet } from "@AUD_CLIENT/data/DataSet";

(function (global: any) {
    'use strict';

    interface SyntaxRules {
        keywords: RegExp | null;
        strings: RegExp | null;
        comments: RegExp | null;
        numbers: RegExp | null;
    }

    const KEYWORDS: Record<string, SyntaxRules | null> = {
        'javascript': {
            keywords: /\b(var|let|const|function|return|if|else|for|while|do|switch|case|break|continue|new|this|typeof|instanceof|try|catch|finally|throw|class|extends|import|export|default|from|async|await|yield|null|undefined|true|false|void|delete|in|of)\b/g,
            strings: /(["'`])(?:(?=(\\?))\2.)*?\1/g,
            comments: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
            numbers: /\b(\d+\.?\d*)\b/g
        },
        'typescript': null,
        'sql': {
            keywords: /\b(SELECT|FROM|WHERE|AND|OR|NOT|IN|IS|NULL|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|ALTER|DROP|TABLE|INDEX|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|ORDER|BY|GROUP|HAVING|UNION|ALL|DISTINCT|TOP|LIMIT|OFFSET|BETWEEN|LIKE|EXISTS|CASE|WHEN|THEN|ELSE|END|COUNT|SUM|AVG|MAX|MIN|COALESCE|ISNULL|CAST|CONVERT|DECLARE|BEGIN|COMMIT|ROLLBACK|EXEC|EXECUTE|PROCEDURE|VIEW)\b/gi,
            strings: /('(?:[^'\\]|\\.)*')/g,
            comments: /(--.*$|\/\*[\s\S]*?\*\/)/gm,
            numbers: /\b(\d+\.?\d*)\b/g
        },
        'json': {
            keywords: /\b(true|false|null)\b/g,
            strings: /("(?:[^"\\]|\\.)*")\s*(?=:)/g,
            comments: null,
            numbers: /\b(\d+\.?\d*)\b/g
        },
        'python': {
            keywords: /\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|raise|with|yield|lambda|pass|break|continue|and|or|not|in|is|None|True|False|self|print|global|nonlocal|assert|del)\b/g,
            strings: /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
            comments: /(#.*$)/gm,
            numbers: /\b(\d+\.?\d*)\b/g
        }
    };
    KEYWORDS['typescript'] = KEYWORDS['javascript'];

    class CodeEditorComponent implements IComponentBridge {
        private container: HTMLElement | null = null;
        private config: any = {};
        private wrapperEl: HTMLDivElement | null = null;
        private textareaEl: HTMLTextAreaElement | null = null;
        private highlightEl: HTMLPreElement | null = null;
        private lineNumbersEl: HTMLDivElement | null = null;
        private codeValue: string = '';

        Create(container: HTMLDivElement, config: any): void {
            this.container = container;
            this.config = config || {};
            const theme: string = this.config.Theme || 'dark';
            const fontSize: number = this.config.FontSize || 13;
            const showLines: boolean = this.config.ShowLineNumbers !== false;
            const readOnly: boolean = this.config.ReadOnly === true;

            this.wrapperEl = document.createElement('div');
            this.wrapperEl.className = 'code-editor-wrapper code-theme-' + theme;
            this.wrapperEl.style.fontSize = fontSize + 'px';

            if (showLines) {
                this.lineNumbersEl = document.createElement('div');
                this.lineNumbersEl.className = 'code-line-numbers';
                this.lineNumbersEl.textContent = '1';
                this.wrapperEl.appendChild(this.lineNumbersEl);
            }

            const editArea: HTMLDivElement = document.createElement('div');
            editArea.className = 'code-edit-area';

            this.highlightEl = document.createElement('pre');
            this.highlightEl.className = 'code-highlight';
            this.highlightEl.setAttribute('aria-hidden', 'true');
            editArea.appendChild(this.highlightEl);

            this.textareaEl = document.createElement('textarea');
            this.textareaEl.className = 'code-textarea';
            this.textareaEl.spellcheck = false;
            this.textareaEl.readOnly = readOnly;

            if (this.config.WordWrap) {
                this.textareaEl.style.whiteSpace = 'pre-wrap';
                this.highlightEl.style.whiteSpace = 'pre-wrap';
            }

            editArea.appendChild(this.textareaEl);
            this.wrapperEl.appendChild(editArea);
            container.appendChild(this.wrapperEl);

            const self = this;
            this.textareaEl.addEventListener('input', function () { self._onInput(); });
            this.textareaEl.addEventListener('scroll', function () { self._syncScroll(); });
            this.textareaEl.addEventListener('keydown', function (e: KeyboardEvent) { self._onKeyDown(e); });
        }

        Resize(width: number, height: number): void {
            if (this.wrapperEl) {
                this.wrapperEl.style.width = width + 'px';
                this.wrapperEl.style.height = height + 'px';
            }
        }

        Dispose(): void {
            if (this.container) { this.container.innerHTML = ''; }
            this.container = null;
            this.wrapperEl = null;
            this.textareaEl = null;
            this.highlightEl = null;
            this.lineNumbersEl = null;
            this.codeValue = '';
        }
        ApplyDataSource(ds:DataSet):void{
            
        }
        SetData(data: any): void {
            if (!data) return;
            let code: string = '';
            if (typeof data === 'string') { code = data; }
            else if (data.text || data.code) { code = data.text || data.code; }
            else if (data.rows && data.rows.length > 0) {
                const row = (data.rows || data.Rows)[0];
                code = String(Array.isArray(row) ? row[0] : row[Object.keys(row)[0]] || '');
            }
            this._setCode(code);
        }

        GetValue(): string[] { return [this.codeValue]; }

        SetValue(values: string[]): void {
            if (values && values.length > 0) { this._setCode(values[0]); }
        }

        Serialize(target: any): void { target.codeValue = this.codeValue; }

        Deserialize(source: any): void {
            if (source && source.codeValue) { this._setCode(source.codeValue); }
        }

        setLanguage(lang: string): void { this.config.Language = lang; this._highlight(); }

        setTheme(theme: string): void {
            if (this.wrapperEl) { this.wrapperEl.className = 'code-editor-wrapper code-theme-' + theme; }
        }

        getCode(): string { return this.codeValue; }

        setCode(code: string): void { this._setCode(code); }

        clear(): void { this._setCode(''); }

        setReadOnly(readOnly: boolean): void {
            if (this.textareaEl) { this.textareaEl.readOnly = readOnly; }
        }

        private _setCode(code: string): void {
            this.codeValue = code || '';
            if (this.textareaEl) { this.textareaEl.value = this.codeValue; }
            this._highlight();
            this._updateLineNumbers();
        }

        private _onInput(): void {
            this.codeValue = this.textareaEl!.value;
            this._highlight();
            this._updateLineNumbers();
        }

        private _onKeyDown(e: KeyboardEvent): void {
            if (e.key === 'Tab') {
                e.preventDefault();
                const ta = this.textareaEl!;
                const start: number = ta.selectionStart;
                const end: number = ta.selectionEnd;
                const tabSize: number = this.config.TabSize || 4;
                let spaces: string = '';
                for (let i = 0; i < tabSize; i++) spaces += ' ';
                ta.value = ta.value.substring(0, start) + spaces + ta.value.substring(end);
                ta.selectionStart = ta.selectionEnd = start + tabSize;
                this._onInput();
            }
        }

        private _syncScroll(): void {
            if (this.highlightEl && this.textareaEl) {
                this.highlightEl.scrollTop = this.textareaEl.scrollTop;
                this.highlightEl.scrollLeft = this.textareaEl.scrollLeft;
            }
            if (this.lineNumbersEl && this.textareaEl) {
                this.lineNumbersEl.scrollTop = this.textareaEl.scrollTop;
            }
        }

        private _highlight(): void {
            if (!this.highlightEl) return;
            let code: string = this._escapeHtml(this.codeValue);
            const lang: string = (this.config.Language || 'text').toLowerCase();
            const rules: SyntaxRules | null | undefined = KEYWORDS[lang];
            if (rules) {
                if (rules.comments) { code = code.replace(rules.comments, '<span class="hl-comment">$1</span>'); }
                if (rules.strings) { code = code.replace(rules.strings, '<span class="hl-string">$1</span>'); }
                if (rules.keywords) { code = code.replace(rules.keywords, '<span class="hl-keyword">$1</span>'); }
                if (rules.numbers) { code = code.replace(rules.numbers, '<span class="hl-number">$1</span>'); }
            }
            this.highlightEl.innerHTML = code + '\n';
        }

        private _updateLineNumbers(): void {
            if (!this.lineNumbersEl) return;
            const lines: string[] = this.codeValue.split('\n');
            const nums: string[] = [];
            for (let i = 1; i <= lines.length; i++) { nums.push(String(i)); }
            this.lineNumbersEl.innerHTML = nums.join('\n');
        }

        private _escapeHtml(text: string): string {
            return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }


    }

    global.AUD = global.AUD || {};
    global.AUD.CodeEditorComponent = CodeEditorComponent;

})(window);