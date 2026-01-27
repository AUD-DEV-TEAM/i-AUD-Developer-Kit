/**
* MX_GRID Column 모델
*/
export interface IColumn{

  /**
   * 1부터 시작 하는 컬럼의 순서
  */
  C: number;

  /**
   * 컬럼의 선택 상태
  */
  IsSelected: boolean;

  /**
   * 컬럼의 위치 Left
  */
  Left: number;

  /**
   *  너비를 표현 방식 percent=1 , pixel=0 
  */
  Unit: number;

  /**
   * 표시 여부
  */
  Visible: boolean;

  /**
   * 컬럼의 너비
  */
  Width: number;

}
