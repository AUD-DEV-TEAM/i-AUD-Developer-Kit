import { enOlapFilterKind } from "../../../aud/enums/olap/enOlapFilterKind";
import { enOlapFilterType } from "../../../aud/enums/olap/enOlapFilterType";
import { enAndOrOperator } from "../../../aud/enums/olap/enAndOrOperator";
import { enOlapMeasureFilterType } from "../../../aud/enums/olap/enOlapMeasureFilterType";
/**
* 피벗 필드 필터 정보
*/
export interface OlapFilter{

  /**
   * 필터 종류
  */
   readonly FilterKind: enOlapFilterKind;

  /**
   * 필터 타입
  */
   readonly FilterType: enOlapFilterType;

  /**
   * 메져 필터값 존재 여부
  */
   readonly HasMeasureFilter: boolean;

  /**
   * 메져 필터 A와 B 사이 연산자
  */
   readonly MeasureAndOrOperator: enAndOrOperator;

  /**
   * 메져 필터 구분자 A
  */
   readonly MeasureFilterTypeA: enOlapMeasureFilterType;

  /**
   * 메져 필터 구분자 B
  */
   readonly MeasureFilterTypeB: enOlapMeasureFilterType;

  /**
   * 메져 필터 값 A
  */
   readonly MeasureFilterValueA: number;

  /**
   * 메져 필터 값 B
  */
   readonly MeasureFilterValueB: number;

  /**
   * 필터 값 리스트
  */
   readonly Values: string[];

  /** 
   * 필터 해제 처리
   *
  */
  Clear(): void;

  /** 
   * 필터 설정 여부.
   *
  */
  HasFilter(): boolean;

}
