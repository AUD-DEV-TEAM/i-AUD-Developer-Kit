/**
* 컨트롤(사각형 기준)의 위치 및 크기 정보
*/
export interface Rect{

  /**
   * 위치(Bottom)
  */
   readonly Bottom: number;

  /**
   * 높이(Left)
  */
   readonly Height: number;

  /**
   * 위치(Left)
  */
   readonly Left: number;

  /**
   * 위치(Right)
  */
   readonly Right: number;

  /**
   * 위치(Top)
  */
   readonly Top: number;

  /**
   * 너비(Width)
  */
   readonly Width: number;

}
