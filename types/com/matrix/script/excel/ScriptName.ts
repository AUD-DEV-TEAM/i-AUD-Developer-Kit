import { ScriptCellRange } from "../../../../com/matrix/script/excel/ScriptCellRange";
import { ScriptCopyRange } from "../../../../com/matrix/script/excel/ScriptCopyRange";
/**
* 엑셀의 이름 정의 객체에 대한 정보를 제공합니다.
*/
export interface ScriptName{

  /** 
   * 이름정의가 수식으로 정의되었는지 여부를 반환합니다.
   *
  */
  IsFormula(): boolean;

  /** 
   * 이름정의의 영역이 단일 영역을 참조하는지 여부를 반환합니다.
   *
  */
  IsSingleArea(): boolean;

  /** 
   * 이름정의 영역이 단일셀을 참조하는지 여부를 반환합니다.
   *
  */
  IsSingleCell(): boolean;

  /** 
   * 이름 정의의 첫 셀 정보를 반환합니다.
이름정의가 단일셀을 참조하지 않더라도 첫번째 셀만 반환합니다.
   *
  */
  getFirstRange(): ScriptCellRange;

  /** 
   * 이름 정의의 영역 목록을 반환합니다.
   *
  */
  getRanges(): ScriptCopyRange[];

  /** 
   * 이름 정의 참조 주소 또는 수식을 반환합니다.
   *
  */
  getRefersTo(): string;

}
