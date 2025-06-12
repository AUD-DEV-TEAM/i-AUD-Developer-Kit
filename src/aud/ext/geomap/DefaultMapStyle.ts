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
  getFill(): object;

  /** 
   * font 반환
   *
  */
  getFont(): object;

  /** 
   * stroke 반환
   *
  */
  getStroke(): object;

}
