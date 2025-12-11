/**
* Web Editor Viewer Controller
*/
export interface WebEditor{

  /** 
   * 현재 편집기의 스크롤 위치를 반환합니다.
   *
   * @example
   * ```js
   * var top = editor.GetScrollTop();
   * ```
  */
  GetScrollTop(): number;

  /** 
   * GetValue
   *
  */
  GetValue(): string;

  /** 
   * Change editor mode
   *
  */
  SetEditorMode(): void;

  /** 
   * 편집기의 스크롤 위치를 설정합니다.
   *
   * @example
   * ```js
   * editor.SetScrollTop(0); //스크롤을 맨 위로 올립니다.
   * ```
  * @param top Top
  */
  SetScrollTop(top: number): void;

  /** 
   * SetValue
   *
  * @param text editor value
  */
  SetValue(text: string): void;

  /** 
   * Change viewer mode
   *
  */
  SetViewerMode(): void;

}
