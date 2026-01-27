import { Style } from "../../../aud/control/charts/Style";
/**
* 차트의 제목 옵션 정보를 제공합니다.
*/
export interface Title{

  /**
   * 수평 정렬(left, center, right)
  */
  Align: string;

  /**
   * 다국어 코드
  */
  LanguageCode: string;

  /**
   * 제목과 실제 차트가 표현되는 영역과의 marign(default:15)
  */
  Margin: number;

  /**
   * 제목에 대한 스타일 객체
  */
  Style: Style;

  /**
   * 제목의 값
  */
  Text: string;

  /**
   * 수직 정렬(default:undefined, top, middle, bottom)
  */
  VerticalAlign: string;

  /**
   * X offset 값(default:0)
  */
  X: number;

  /**
   * Y offset 값(default:undefined)
  */
  Y: number;

}
