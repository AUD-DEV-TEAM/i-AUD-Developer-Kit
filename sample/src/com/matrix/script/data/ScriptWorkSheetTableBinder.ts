import { ScriptCopyRange } from "../../../../com/matrix/script/excel/ScriptCopyRange";
import { RangeArea } from "../../../../com/matrix/Excel/Drawing/RangeArea";
/**
* 워크 시트에 데이터의 다양한 출력 방식을 지원합니다.
*/
export interface ScriptWorkSheetTableBinder{

  /** 
   * 반복 행의 디자인 정보(서식)를 가지고 있는 영역 정보를 반환 합니다.
   *
  */
  getAlternateStyleTemplate(): ScriptCopyRange;

  /** 
   * 데이터가 출력된 영역을 반환 합니다.
   *
  */
  getBindedArea(): RangeArea;

  /** 
   * 데이터 출력 정보(필드 및 수식)를 가지고 있는 영역 정보를 반환 합니다.
   *
  */
  getDataBindingTemplate(): ScriptCopyRange;

  /** 
   * 첫 행의 디자인 정보(서식)를 가지고 있는 영역 정보를 반환 합니다.
   *
  */
  getFirstRowStyleTemplate(): ScriptCopyRange;

  /** 
   * 행의 디자인 정보(서식)를 가지고 있는 영역 정보를 반환 합니다.
   *
  */
  getStyleTemplate(): ScriptCopyRange;

  /** 
   * 반복 행의 디자인 정보(서식)를 가지고 있는 영역 정보를 설정
   *
  * @param range 영역 정보
  */
  setAlternateStyleTemplate(range: ScriptCopyRange): void;

  /** 
   * 데이터 출력 정보(필드 및 수식)를 가지고 있는 영역 정보를 설정
   *
  * @param range 영역 정보
  */
  setDataBindingTemplate(range: ScriptCopyRange): void;

  /** 
   * 첫 행의 디자인 정보(서식)를 가지고 있는 영역 정보를 설정
   *
  * @param range 영역 정보
  */
  setFirstRowStyleTemplate(range: ScriptCopyRange): void;

  /** 
   * 행의 디자인 정보(서식)를 가지고 있는 영역 정보를 설정
   *
  * @param range 영역 정보
  */
  setStyleTemplate(range: ScriptCopyRange): void;

}
