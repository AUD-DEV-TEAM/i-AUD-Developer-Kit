/**
* MX-GRID 선택 영역 정보
*/
export interface ISelectionArea{

  /**
   * 시작 열의 번호
  */
   readonly X1: number;

  /**
   * 종료 열의 번호
  */
   readonly X2: number;

  /**
   * 시작 행의 번호
  */
   readonly Y1: number;

  /**
   *  종료 행의 번호
  */
   readonly Y2: number;

}
