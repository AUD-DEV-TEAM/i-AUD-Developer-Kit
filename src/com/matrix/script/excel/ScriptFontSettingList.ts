import { ScriptFontSetting } from "../../../../com/matrix/script/excel/ScriptFontSetting";
import { ScriptCellStyle } from "../../../../com/matrix/script/excel/ScriptCellStyle";
/**
* 셀의 다중 스타일 정보
*/
export interface ScriptFontSettingList{

  /** 
   * 모든 스타일 항목을 삭제 합니다.
   *
  */
  Clear(): void;

  /** 
   * 스타일 항목의 개수를 반환 합니다.
   *
  */
  Count(): number;

  /** 
   * 스타일 항목을 추가합니다.
   *
  * @param text 텍스트
  * @param style 스타일
  */
  add(text: string, style: ScriptCellStyle): ScriptFontSetting;

  /** 
   * 특정 위치의 스타일 항목을 반환합니다.
   *
  * @param index 목록 내위치
  */
  get(index: number): ScriptFontSetting;

}
