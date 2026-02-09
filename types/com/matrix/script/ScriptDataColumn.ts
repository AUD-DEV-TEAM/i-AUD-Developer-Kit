import { enDataType } from "../../../com/matrix/data/enDataType";
import { enKeyType } from "../../../com/matrix/data/enKeyType";
import { enSaveMode } from "../../../com/matrix/data/enSaveMode";
/**
* 데이터 Column 모델
*/
export interface ScriptDataColumn{

  /** 
   * 데이터 유형이 수치형인지 여부를 반환합니다.
   *
  */
  IsNumeric(): boolean;

  /** 
   * 필드의 원본 데이터 타입코드를 반환합니다.
   *
  */
  getColumnType(): number;

  /** 
   * 필드의 원본 데이터 타입 이름을 반환합니다.
   *
  */
  getColumnTypeName(): string;

  /** 
   * 필드의 데이터 유형을 반환합니다.
   *
  */
  getDataType(): enDataType;

  /** 
   * 필드의 키 유형을 반환합니다.
   *
  */
  getKeyType(): enKeyType;

  /** 
   * 필드의 최대 데이터 사이즈를 반환합니다.
   *
  */
  getMaxDataLength(): number;

  /** 
   * 컬럼명을 반환합니다.
   *
  */
  getName(): string;

  /** 
   * 필드의 저장 모드를 반환합니다.
   *
  */
  getSaveMode(): enSaveMode;

  /** 
   * 필드의 데이터 유형을 설정합니다.
   *
  * @param type 데이터 유형
  */
  setDataType(type: enDataType): void;

  /** 
   * 필드의 키 유형을 설정합니다.
   *
  * @param type 키 유형
  */
  setKeyType(type: enKeyType): void;

  /** 
   * 필드의 저장 모드를 설정합니다.
   *
  * @param type 저장 모드
  */
  setSaveMode(type: enSaveMode): void;

}
