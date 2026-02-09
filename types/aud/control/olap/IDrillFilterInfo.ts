import { enAndOrOperator } from "../../../aud/enums/olap/enAndOrOperator";
import { enOlapFilterKind } from "../../../aud/enums/olap/enOlapFilterKind";
/**
* OlapField의 필터 정보
*/
export interface IDrillFilterInfo{

  /**
   * Mesaure 필터의 and or 여부
  */
   readonly AndOrOperator: enAndOrOperator;

  /**
   * 데이터 타입
  */
   readonly DataType: enOlapFilterKind;

  /**
   * 필드명
  */
   readonly Name: string;

  /**
   * 필터 정보(In, NotIn, BetWeen, =, >, >=, <, <=, <>)
  */
   readonly Operator: string;

  /**
   * 필터 정보2(In, NotIn, BetWeen, =, >, >=, <, <=, <>)
  */
   readonly Operator2: string;

  /**
   * 필터 값 목록
  */
   readonly Values: string[];

}
