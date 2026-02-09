/**
* 테두리 선의 굵기(읽기전용)
*/
export interface Thickness{

  /**
   * 하단 크기
  */
   readonly Bottom: number;

  /**
   * 좌측 크기
  */
   readonly Left: number;

  /**
   * 우측 크기
  */
   readonly Right: number;

  /**
   * 상단 크기
  */
   readonly Top: number;

}
