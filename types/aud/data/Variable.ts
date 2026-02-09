/**
* 변수관리자의 변수 객체
*/
export interface Variable{

  /**
   * 변수의 설명
  */
  Desc: string;

  /**
   * 변수의 계산 수식
  */
  Formula: string;

  /**
   * 변수명
  */
  Name: string;

  /**
   * 변수의 값
  */
  Value: string;

}
