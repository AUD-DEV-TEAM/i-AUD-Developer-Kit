import { enVerticalAlign } from "../../../aud/enums/olap/enVerticalAlign";
import { enOptionStyle } from "../../../aud/enums/olap/enOptionStyle";
/**
* 스타일 정보
*/
export interface OptionStyle{

  /**
   * OLAP 배경 색상
  */
  BackgroundColor: string;

  /**
   * OLAP Column 헤더 셀의 세로 정렬
  */
  ColumnHeaderVerticalAlignment: enVerticalAlign;

  /**
   * Filter 아이콘 기본 색상
  */
  FilterIConColor: string;

  /**
   * Filtering 아이콘 기본 색상
  */
  FilteredIConColor: string;

  /**
   * OLAP 전체 기본 글자 유형
  */
  FontName: string;

  /**
   * OLAP 전체 기본 글자 크기
  */
  FontSize: number;

  /**
   * OLAP 전체 Line 색상 
  */
  LineColor: string;

  /**
   * OLAP Row 헤더 셀의 세로 정렬
  */
  RowHeaderVerticalAlignment: enVerticalAlign;

  /** 
   * OLAP 옵션 스타일 별 지정된 BoxStyle Key 를 반환합니다.
   *
  * @param optionStyleName 
  */
  GetBoxStyleKey(optionStyleName: enOptionStyle): string;

  /** 
   * OLAP 옵션 스타일 별 BoxStyle 을 설정합니다.
   *
  * @param optionStyleName 
  * @param key BoxStyle 의 Name 또는 Key
  */
  SetBoxStyleKey(optionStyleName: enOptionStyle, key: string): void;

}
