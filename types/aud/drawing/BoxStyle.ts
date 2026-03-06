import { Style } from "../../aud/drawing/Style";
/**
* 박스 스타일의 Style 객체
*/
export interface BoxStyle{

  /**
   *
   * @hidden
   * @deprecated 신규 코드에서 사용 금지. 내부 API입니다.
  */
  CreateUser: string;

  /**
   *
   * @hidden
   * @deprecated 신규 코드에서 사용 금지. 내부 API입니다.
  */
  Element: HTMLElement;

  /**
   * 박스스타일 생성 개수 제한 판단 flag
   * @hidden
   * @deprecated 신규 코드에서 사용 금지. 내부 API입니다.
  */
  LimitFlag: boolean;

  /**
   *
   * @hidden
   * @deprecated 신규 코드에서 사용 금지. 내부 API입니다.
  */
  ParentObj: any;

  /**
   * 박스스타일의 스타일
  */
  Style: Style;

  /**
   * 박스스타일의 스타일 이름
  */
  StyleName: string;

  /**
   *
   * @hidden
   * @deprecated 신규 코드에서 사용 금지. 내부 API입니다.
  */
  UpdateFlag: boolean;

  /**
   *
   *
  * @param name
  * @param styleName
   * @hidden
   * @deprecated 신규 코드에서 사용 금지. 내부 API입니다.
  */
  Create(name: string, styleName: string): void;

  /**
   *
   *
  * @param eleClassName
  * @param parentObj
   * @hidden
   * @deprecated 신규 코드에서 사용 금지. 내부 API입니다.
  */
  CreateElement(eleClassName: string, parentObj: any): HTMLDivElement;

  /**
   *
   *
   * @hidden
   * @deprecated 신규 코드에서 사용 금지. 내부 API입니다.
  */
  Update(): void;

  /**
   *
   *
   * @hidden
   * @deprecated 신규 코드에서 사용 금지. Style 속성을 사용하세요.
  */
  getStyle(): Style;

}
