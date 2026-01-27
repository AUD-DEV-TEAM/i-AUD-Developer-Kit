import { Style } from "../../aud/drawing/Style";
/**
* 박스 스타일의 Style 객체
*/
export interface BoxStyle{

  /**
   * 
   * @hidden
  */
  CreateUser: string;

  /**
   * 
   * @hidden
  */
  Element: HTMLElement;

  /**
   * 박스스타일 생성 개수 제한 판단 flag
   * @hidden
  */
  LimitFlag: boolean;

  /**
   * 
   * @hidden
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
  */
  UpdateFlag: boolean;

  /** 
   * 
   *
  * @param name 
  * @param styleName 
   * @hidden
  */
  Create(name: string, styleName: string): void;

  /** 
   * 
   *
  * @param eleClassName 
  * @param parentObj 
   * @hidden
  */
  CreateElement(eleClassName: string, parentObj: any): HTMLDivElement;

  /** 
   * 
   *
   * @hidden
  */
  Update(): void;

  /** 
   * 
   *
   * @hidden
  */
  getStyle(): Style;

}
