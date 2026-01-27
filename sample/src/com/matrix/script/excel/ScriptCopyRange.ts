import { ScriptWorkSheet } from "../../../../com/matrix/script/excel/ScriptWorkSheet";
import { RangeArea } from "../../../../com/matrix/Excel/Drawing/RangeArea";
/**
* 엑셀 복사 영역에 대한 접근을 제공합니다.
*/
export interface ScriptCopyRange{

  /** 
   * 현재 영역을 계층 구조로 자동 병합 합니다.
   *
  */
  HierarchyMergeRows(): void;

  /** 
   * 현재 영역을 특정 시트의 영역에 붙여 넣기 한다.
   *
  * @param worksheet 대상 시트
  * @param area Range Area
  * @param updateData Whether it is a copy of the data
  * @param updateStyle Whether it is a copy of the style
  * @param updateHeight Whether it is a copy of the cell's height
  * @param updateWidth Whether it is a copy of the cell's width
  * @param updateMerge Whether it is a copy of the merge
  * @param updateFormula Whether it is a copy of the Formula
  */
  Paste(worksheet: ScriptWorkSheet, area: RangeArea, updateData: boolean, updateStyle: boolean, updateHeight: boolean, updateWidth: boolean, updateMerge: boolean, updateFormula: boolean): void;

  /** 
   * 현재 영역을 특정 시트의 영역에 붙여 넣기 한다.
   *
  * @param worksheet 대상 시트
  * @param area Range Area
  * @param updateData Whether it is a copy of the data
  * @param updateStyle Whether it is a copy of the style
  * @param updateHeight Whether it is a copy of the cell's height
  * @param updateWidth Whether it is a copy of the cell's width
  * @param updateMerge Whether it is a copy of the merge
  */
  Paste(worksheet: ScriptWorkSheet, area: RangeArea, updateData: boolean, updateStyle: boolean, updateHeight: boolean, updateWidth: boolean, updateMerge: boolean): void;

  /** 
   * 현재 영역을 특정 시트의 영역에 붙여 넣기 한다.
   *
  * @param worksheet 대상 시트
  * @param row 열 번호(1부터 시작 됨)
  * @param col 행 번호(1부터 시작 됨)
  * @param updateData Whether it is a copy of the data
  * @param updateStyle Whether it is a copy of the style
  * @param updateHeight Whether it is a copy of the cell's height
  * @param updateWidth Whether it is a copy of the cell's width
  * @param updateMerge Whether it is a copy of the merge
  */
  Paste(worksheet: ScriptWorkSheet, row: number, col: number, updateData: boolean, updateStyle: boolean, updateHeight: boolean, updateWidth: boolean, updateMerge: boolean): void;

  /** 
   * 현재 영역을 특정 시트의 영역에 붙여 넣기 한다.
   *
  * @param worksheet 대상 시트
  * @param range 셀의 주소 값(eg.G10)
  * @param updateData Whether it is a copy of the data
  * @param updateStyle Whether it is a copy of the style
  * @param updateHeight Whether it is a copy of the cell's height
  * @param updateWidth Whether it is a copy of the cell's width
  * @param updateMerge Whether it is a copy of the merge
  */
  Paste(worksheet: ScriptWorkSheet, range: string, updateData: boolean, updateStyle: boolean, updateHeight: boolean, updateWidth: boolean, updateMerge: boolean): void;

  /** 
   * 현재 영역을 특정 시트의 영역에 붙여 넣기 한다.
   *
  * @param worksheet 대상 시트
  * @param area Range Area
  */
  Paste(worksheet: ScriptWorkSheet, area: RangeArea): void;

  /** 
   * 현재 영역을 특정 시트의 영역에 붙여 넣기 한다.
   *
  * @param worksheet 대상 시트
  * @param row 열 번호(1부터 시작 됨)
  * @param col 행 번호(1부터 시작 됨)
  */
  Paste(worksheet: ScriptWorkSheet, row: number, col: number): void;

  /** 
   * 현재 영역을 특정 시트의 영역에 붙여 넣기 한다.
   *
  * @param worksheet 대상 시트
  * @param range 셀의 주소 값(eg.G10)
  */
  Paste(worksheet: ScriptWorkSheet, range: string): void;

  /** 
   * 현재 영역 정보를 반환 합니다.
   *
  */
  getRangeArea(): RangeArea;

}
