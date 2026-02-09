import { enDataType } from "../../cfx/enums/enDataType";
/**
* Conflux Script Column
*/
export interface ScriptConfluxScriptColumn{

  /** 
   * 데이터 유형이 수치형인지 여부를 반환합니다.
   *
  */
  IsNumeric(): boolean;

  /** 
   * 해당 컬럼의 DataType을 반합니다.
   *
  */
  getDataType(): enDataType;

  /** 
   * 컬럼명을 반환합니다.
   *
  */
  getName(): string;

  /** 
   * 해당 컬럼의 DataType을 셋팅합니다.
   *
  * @param type 지정할 타입
  */
  setDataType(type: enDataType): void;

}
