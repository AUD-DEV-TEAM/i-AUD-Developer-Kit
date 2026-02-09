import { ConditionBase } from "../../../../com/matrix/script/excel/ConditionBase";
/**
*  엑셀 조건부 서식 목록에 대한 접근을 제공합니다.
*/
export interface ConditionFormatList{

  /** 
   * 조건부 서식 목록을 모두 삭제합니다.
   *
  */
  Clear(): void;

  /** 
   * JSON 문자열을 기준으로 조건부 서식을 생성하여 현재 목록에 추가한 후, 해당 조건부 서식을 반환합니다.
   *
  * @param jsonText 조건부 형식의 JSON 모델
  */
  Create(jsonText: string): ConditionBase;

  /** 
   * 특정 위치의 조건부 서식을 제거합니다.
   *
  */
  Remove(): void;

  /** 
   * 특정 위치의 조건부 서식을 수정합니다. JSON 문자열 값을 사용합니다.
   *
  * @param index 인덱스 위치
  * @param jsonText 조건부 형식의 JSON 모델
  */
  Update(index: number, jsonText: string): ConditionBase;

}
