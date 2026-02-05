import { ScriptCellStyle } from "../../../../com/matrix/script/excel/ScriptCellStyle";
/**
* 다중 스타일 항목
*/
export interface ScriptFontSetting{

  /** 
   * 항목의 스타일 정보를 반환합니다.
   *
  */
  getCellStyle(): ScriptCellStyle;

  /** 
   * 텍스트를 반환합니다.
   *
  */
  getText(): string;

  /** 
   * 항목의 스타일을 수정합니다.
   *
  * @param style Style
  */
  setCellStyle(style: ScriptCellStyle): void;

  /** 
   * 텍스트를 수정합니다.
   *
  * @param text text
  */
  setText(text: string): void;

}
