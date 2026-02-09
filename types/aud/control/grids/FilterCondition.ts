import { enGridFilterType } from "../../../aud/enums/grid/enGridFilterType";
/**
 * 그리드의 필터를 설정해주는 클래스
 */
export interface FilterCondition{

  /**
   * And 또는 Or
   */
  IsAnd: boolean;

  /**
   * 비교 연산자(Dimension : [In,NotIn,Between], Measure : [=,>,<,>=,<=,<>])
   */
  Operator: string;

  /**
   * 필터 타입
   */
  Type: enGridFilterType;

  /**
   * 비교 값. Dimension의 In/NotIn은 배열, Measure는 단일 값
   */
  Value: string | number | string[] | number[];

}
