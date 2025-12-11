import { enMetaConditionOperator } from "../../../aud/enums/meta/enMetaConditionOperator";
/**
* MetaTreeView 필터 정보
*/
export interface FilterInfo{

  /**
   * 연결된 그리드에 적용된 상태인지 여부
  */
  Applied: boolean;

  /**
   * Code
  */
  ID: string;

  /**
   * 메타 항목 ID
  */
  MetaItemCode: string;

  /**
   * 필터 캡션명
  */
  NAME: string;

  /**
   * 연산자
  */
  Operator: enMetaConditionOperator;

  /**
   * 부모 ID
  */
  ParentCode: string;

  /**
   * 필터링한 값
  */
  Values: string[];

}
