import { enConfluxPythonDataType } from "../../cfx/python/enums/enConfluxPythonDataType";
/**
* Conflux Python Script의 데이터 column 모델입니다.
*/
export interface ScriptConfluxColumn{

  /** 
   * column 데이터 타입을 반환합니다.
   *
  */
  get_data_type(): enConfluxPythonDataType;

  /** 
   * column 이름을 반환합니다.
   *
  */
  get_name(): str;

  /** 
   * column 데이터 타입의 숫자 여부를 반환합니다.
   *
  */
  is_numeric(): bool;

  /** 
   * column 데이터 타입을 설정합니다.
   *
  * @param type ScriptConfluxColumn의 데이터 타입을 지정하는 파라미터
  */
  set_data_type(type: enConfluxPythonDataType): None;

}
