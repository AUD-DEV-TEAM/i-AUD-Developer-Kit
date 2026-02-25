/**
 * CodeEditor 컴포넌트
 *
 * CodeMirror 기반 코드 에디터 AddIn 컴포넌트.
 * JavaScript, SQL 등 다양한 언어의 구문 강조와 편집 기능을 제공합니다.
 *
 * **주의**: `Matrix.getObject()`는 AddIn 래퍼를 반환합니다.
 * 실제 컴포넌트에 접근하려면 반드시 `getScriptClass()`를 호출하세요.
 *
 * @example
 * ```ts
 * import { AddIn } from "@AUD_CLIENT/control/AddIn";
 * import { CodeEditor } from "@AUD_CLIENT/ext/CodeEditor";
 *
 * let addIn = Matrix.getObject("myEditor") as AddIn;
 * let editor = addIn.getScriptClass() as CodeEditor;
 *
 * editor.Mode = "javascript";
 * editor.Theme = "dracula";
 * editor.setValue("console.log('Hello');");
 * ```
 */
export interface CodeEditor {

    /** 컨트롤의 루트 HTML 엘리먼트 */
    Element: HTMLDivElement;

    /** 언어 모드 (예: "javascript", "text/x-sql") */
    Mode: string;

    /** 테마 (예: "eclipse", "dracula") */
    Theme: string;

    /** 읽기 전용 여부 */
    ReadOnly: boolean;

    // ── 메서드 ──

    /** 에디터 내용을 가져옵니다 */
    getValue(): string;

    /** 에디터 내용을 설정합니다 */
    setValue(code: string): void;

    /** 커서 위치에 텍스트를 삽입합니다 */
    insertText(text: string): void;

    /** 에디터에 포커스를 줍니다 */
    focus(): void;

    /** CodeMirror 옵션을 설정합니다 (예: "lineNumbers", "lineWrapping") */
    setOption(name: string, value: any): void;

    /** CodeMirror 옵션을 조회합니다 */
    getOption(name: string): any;

    /** CodeMirror 인스턴스 직접 접근 (고급 사용) */
    getCodeMirror(): any;

    // ── 이벤트 ──

    /** 크기 변경 이벤트 */
    OnResize: ((control: CodeEditor, args: { Width: number; Height: number }) => void) | null;

    /** 업데이트 이벤트 */
    OnUpdate: ((control: CodeEditor, args: { Width: number; Height: number }) => void) | null;

    /** 에디터 내용 변경 이벤트 */
    OnChange: ((control: CodeEditor, args: { value: string; origin: string; lineCount: number }) => void) | null;

    /** 커서 이동 이벤트 */
    OnCursorActivity: ((control: CodeEditor, args: { line: number; ch: number }) => void) | null;
}
