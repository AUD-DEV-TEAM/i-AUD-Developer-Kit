import { Thickness } from "../../../aud/drawing/Thickness";
import { Style } from "../../../aud/drawing/Style";
import { TableLayout } from "../../../aud/control/table/TableLayout";
/**
* 테이블 레이아웃의 셀을 구성하는 컨트롤.(부모셀)
*/
export interface Cell{

  /**
   * 해당 셀의 캡션
  */
  Caption: string;

  /**
   * 해당 셀의 언어 코드
  */
  LanguageCode: string;

  /**
   * 셀 내부 마진 객체
  */
  Margin: Thickness;

  /**
   * 셀 스타일
  */
  Style: Style;

  /**
   * 해당 셀이 속해있는 테이블 레이아웃 컨트롤
  */
  TableLayout: TableLayout;

}
