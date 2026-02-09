/**
* Map의 기본 style 객체
*/
export interface DefaultMapStyle{

  /**
   * style 객체의 fill 속성
  */
  fill: any;

  /**
   * style 객체의 font 속성
  */
  font: any;

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
   * font 반환
   *
  */
  getFont(): any;

  /** 
   * stroke 반환
   *
  */
  getStroke(): any;

}
