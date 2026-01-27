import { OlapField } from "../../../aud/control/olap/OlapField";
/**
* 헤더 셀 정보
*/
export interface ScriptHeaderCell{

  /**
   * 자식 셀 목록
  */
   readonly Childrens: ScriptHeaderCell[];

  /**
   * 확장/축소 상태가 확장인지 여부
  */
  Expanded: boolean;

  /**
   * 데이터 필드
  */
   readonly Field: OlapField;

  /**
   * 사용자 정의 항목 여부
  */
   readonly IsCustom: boolean;

  /**
   * 총계 여부
  */
   readonly IsGrandTotal: boolean;

  /**
   * Measure헤더 여부
  */
   readonly IsMeasure: boolean;

  /**
   * 소계 여부
  */
   readonly IsTotal: boolean;

  /**
   * 셀의 키
  */
   readonly Key: string;

  /**
   * 부모 셀
  */
   readonly Parent: ScriptHeaderCell;

  /**
   * 셀의 텍스트
  */
   readonly Text: string;

  /**
   * 셀의 참조값
  */
   readonly Value2: any;

  /** 
   * 선택된 헤더를 축소 합니다.
   *
  */
  Collapsed(): void;

  /** 
   * 선택된 헤더를 확장합니다.
   *
  */
  Expand(): void;

  /** 
   * 선택된 헤더를 기준으로 특정 필드의 헤더셀들을 반환 합니다.
   *
  * @param fieldName 필드명
  */
  getHeaderCells(fieldName: string): ScriptHeaderCell[];

}
