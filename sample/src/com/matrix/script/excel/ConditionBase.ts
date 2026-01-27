import { RangeArea } from "../../../../com/matrix/Excel/Drawing/RangeArea";
/**
*  엑셀의 조건부 서식 
*/
export interface ConditionBase{

  /** 
   * 조건부 서식이 적용되는 대상 영역을 추가합니다.
   *
  * @param rangeName Range 명
  */
  addRange(rangeName: string): RangeArea;

  /** 
   * 조건부 서식이 적용되는 대상 영역을 추가합니다.
   *
  * @param startRow 영역의 시작 행 주소
  * @param startCol 영역의 시작 열 주소
  * @param endRow 영역의 종료 행 주소
  * @param endCol 영역의 종료 열 주소
  */
  addRange(startRow: number, startCol: number, endRow: number, endCol: number): RangeArea;

  /** 
   * 조건부 서식의 적용 대상 영역 모두 삭제
   *
  */
  clearRanges(): void;

  /** 
   * 조건부 형식이 적용된 영역 목록을 제공합니다.
   *
  */
  getRanges(): Array<RangeArea>;

  /** 
   * 조건부 서식이 특정 적용된 영역을 삭제합니다.
   *
  */
  removeRange(): void;

}
