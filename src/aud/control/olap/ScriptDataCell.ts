import { ScriptHeaderCell } from "../../../aud/control/olap/ScriptHeaderCell";
import { OlapField } from "../../../aud/control/olap/OlapField";
import { IDrillToDetailInfo } from "../../../aud/control/olap/IDrillToDetailInfo";
/**
* 데이터 셀 정보
*/
export interface ScriptDataCell{

  /**
   * 헤더 셀(Column)
  */
   readonly ColumnHeader: ScriptHeaderCell;

  /**
   * 데이터 필드
  */
   readonly Field: OlapField;

  /**
   * Grand Total셀 여부
  */
   readonly IsGrandTotal: boolean;

  /**
   * Total셀 여부
  */
   readonly IsTotal: boolean;

  /**
   * 헤더 셀(Row)
  */
   readonly RowHeader: ScriptHeaderCell;

  /**
   * 셀의 텍스트(포멧 적용)
  */
   readonly Text: string;

  /**
   * 셀의 값
  */
   readonly Value: any;

  /**
   * 셀의 참조값
  */
   readonly Value2: any;

  /** 
   * Drill to Detail를 가져오기 위한 셀의 상세 정보를 반환 합니다.
   *
  */
  getDrillToDtail(): IDrillToDetailInfo;

  /** 
   * 헤더 필드의 셀을 반환합니다.
   *
  * @param fieldName 필드명
  */
  getHeaderCell(fieldName: string): ScriptHeaderCell;

  /** 
   * 헤더 필드의 값을 반환합니다.
   *
  * @param fieldName 필드명
  */
  getHeaderValue(fieldName: string): string;

  /** 
   * 특정 값으로 셀의 값을 변경합니다.
   *
  * @param newValue 새로운 값
  */
  updateValue(newValue: number): void;

}
