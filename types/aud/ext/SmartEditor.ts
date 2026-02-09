/**
* SmartEditor 뷰어 컨트롤러
*/
export interface SmartEditor{

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

  /** 
   * Cross Site Scripting Filter
   *
  * @param useYn Whether to use filter boolean value
  */
  SetXssFilter(useYn: boolean): void;

}
