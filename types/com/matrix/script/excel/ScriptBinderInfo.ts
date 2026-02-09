import { ScriptCopyRange } from "../../../../com/matrix/script/excel/ScriptCopyRange";
import { ScriptWorkSheet } from "../../../../com/matrix/script/excel/ScriptWorkSheet";
/**
* 데이터셋 바인딩 영역 정보
*/
export interface ScriptBinderInfo{

  /** 
   * 데이터가 바인딩 된 영역의 모든 셀 값을 삭제합니다.
   *
  */
  Clear(): void;

  /** 
   * 바인딩 영역을 반환합니다.
   *
  */
  getRange(): ScriptCopyRange;

  /** 
   * 바인딩된 영역의 Worksheet 객체를 반환합니다.
   *
  */
  getWorkSheet(): ScriptWorkSheet;

}
