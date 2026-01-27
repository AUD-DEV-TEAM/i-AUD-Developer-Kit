import { enDataType } from "../../aud/enums/comm/enDataType";
import { enKeyType } from "../../aud/enums/comm/enKeyType";
/**
* 데이터 테이블의 컬럼 객체에 대한 정보를 제공합니다.
*/
export interface DataColumn{

  /**
   * 컬럼의 캡션을 반환합니다.
  */
  Caption: string;

  /**
   * 컬럼의 데이터 유형을 반환합니다.
  */
  DataType: enDataType;

  /**
   * 컬럼의 키 유형을 반환합니다.
  */
  KeyType: enKeyType;

  /**
   * 컬럼의 이름을 반환합니다.
  */
   readonly Name: string;

}
