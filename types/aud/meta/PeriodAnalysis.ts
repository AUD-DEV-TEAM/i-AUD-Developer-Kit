import { enMetaConditionOperator } from "../../aud/enums/meta/enMetaConditionOperator";
import { enMetaPeriodType } from "../../aud/enums/meta/enMetaPeriodType";
/**
* 기간별 비교분석 객체
*/
export interface PeriodAnalysis{

  /**
   * 비교할 분석 항목 ID
  */
  MeasureItemId: string;

  /**
   * 연산자(0: =, 1: <, 2: >, 3: <= , 4: >=, 12: between, 15: not between
  */
  Operator: enMetaConditionOperator;

  /**
   * 기준 일자 항목 ID
  */
  PeriodItemId: string;

  /**
   * 기간 설정값
  */
  PeriodType: enMetaPeriodType;

  /**
   * 시작일자
  */
  PeriodValue1: string;

  /**
   * 종료일자
  */
  PeriodValue2: string;

  /**
   * 값 설정: 0 값, 1 증감률
  */
  ValueType: number;

}
