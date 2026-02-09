/**
* 전역 파라미터의 값 정보를 제공합니다.
*/
export interface ScriptParams{

  /**
   * 파라미터 이름
  */
  Name: string;

  /**
   * 0:Numeric, 1:String
  */
  Type: number;

  /**
   * 파라미터 값
  */
  Value: string;

}
