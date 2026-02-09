import { ScriptParams } from "../../aud/data/ScriptParams";
/**
* 보고서에서 사용하는 전역 변수에 대한 접근을 제공합니다.
*/
export interface GlobalParam{

  /** 
   * 전역 파라미터를 추가합니다.
   *
  * @param name 파라미터 키
  * @param value 파라미터 값
  * @param type 0:Numeric, 1:String
  */
  Add(name: string, value: string, type: number): void;

  /** 
   * 전역 파라미터 전체를 반환합니다.
   *
  */
  GetParams(): ScriptParams[];

  /** 
   * name에 해당하는 전역 파라미터의 값을 반환합니다.
   *
  * @param name 파라미터 키
  */
  GetValue(name: string): string;

}
