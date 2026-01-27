/**
* feature mouseover시의 하이라이트 기능의 style 객체
*/
export interface HighlightStyle{

  /**
   * style 객체의 fill 속성
  */
  fill: any;

  /**
   * style 객체의 stroke 속성
  */
  stroke: any;

  /** 
   * fill 반환
   *
  */
  getFill(): any;

  /** 
   * stroke 반환
   *
  */
  getStroke(): any;

}
