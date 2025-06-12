import { ScriptFormat } from "../../aud/util/ScriptFormat";
/**
* 설정한 서식포맷대로 값을 변환합니다.
*/
export interface FormatConverter{

  /** 
   * 설정한 서식에 맞게 값을 변환합니다.
   *
  * @param value 변환할 값(type:숫자형)
  */
  Convert(value: string | number): ScriptFormat;

  /** 
   * 전체 지역 코드를 반환하는 함수입니다.
   *
  * @param code 지역코드
   * @hidden
  */
  GetFullLocaleCode(code: string): string;

  /** 
   * Converter 초기설정하는 함수입니다.
   *
  * @param formula 서식
  * @param localeCode 다국어 코드
  * @param option 옵션
   * @hidden
  */
  Init(formula: string, localeCode: string, option?: any): void;

}
