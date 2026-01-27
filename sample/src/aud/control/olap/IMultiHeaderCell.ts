import { enHorizonAlign } from "../../../aud/enums/olap/enHorizonAlign";
/**
* 멀티 헤더에 대한 정보를 제공합니다.
*/
export interface IMultiHeaderCell{

  /**
   * Text Horizontal Alignment
  */
  Align: enHorizonAlign;

  /**
   * 멀티헤더 셀의 배경색
  */
  BackColor: string;

  /**
   * The number of columns to merge
  */
  ColSpan: number;

  /**
   * 멀티헤더 셀의 다국어 코드
  */
  LanguageCode: string;

  /**
   * The number of rows to merge
  */
  RowSpan: number;

  /**
   * 멀티헤더 셀의 텍스트
  */
  Text: string;

}
