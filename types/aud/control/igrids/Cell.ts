import { ICell } from "../../../aud/control/igrids/ICell";
import { IStyle } from "../../../aud/control/igrids/IStyle";
/**
* MXGrid 컨트롤의 데이터 셀 모델
*/
export interface Cell{

  /**
   *  Cell 원본 모델
  */
  Cell: ICell;

  /**
   * Column 병합셀 수
  */
   readonly ColSpan: number;

  /**
   * 엑셀 셀의 Column Number
  */
   readonly Column: number;

  /**
   * 다른셀에 병합된 자식인지 여부
  */
  Merged: boolean;

  /**
   * 엑셀 셀의 Range Name
  */
   readonly Range: string;

  /**
   * 엑셀 셀의 Row Number
  */
   readonly Row: number;

  /**
   * Row 병합셀 수
  */
   readonly RowSpan: number;

  /**
   * 셀의 데이터 타입(Number, String, Empty)
  */
  Type: string;

  /** 
   * 셀의 서식을 반환 합니다.
   *
  */
  getFormat(): string;

  /**
   * 셀의 특정 속성의 값을 반환 합니다.
   *
  * @param name 속성명 (예: "Editable", "Formula", "MaskFormat" 등)
  * @returns 속성 값 문자열. 속성이 없으면 빈 문자열 반환
  */
  getProperty(name: string): string;

  /**
   * 셀의 스타일을 반환 합니다.
   *
  * @returns 셀 스타일 정보. 스타일이 없으면 null 반환
  */
  getStyle(): IStyle | null;

  /** 
   * 셀의 텍스트를 반환 합니다.
   *
  */
  getText(): string;

  /**
   * 셀의 값을 반환 합니다.
   *
  * @returns 셀 값. 문자열 또는 숫자 타입
  */
  getValue(): string | number;

  /** 
   * 셀의 서식을 설정 합니다.
   *
  * @param format 서식
  */
  setFormat(format: string): void;

  /**
   * 셀의 특정 속성을 설정 합니다.
   *
  * @param name 속성명 (예: "Editable", "Formula", "MaskFormat" 등)
  * @param value 속성 값
  */
  setProperty(name: string, value: string | number | boolean): void;

  /**
   * 셀의 스타일을 설정 합니다.
   *
  * @param style 스타일 객체 (IStyle 인터페이스 참조)
  */
  setStyle(style: IStyle): void;

  /** 
   * 셀의 텍스트를 설정 합니다.
   *
  * @param text 값
  */
  setText(text: string): void;

  /**
   * 셀의 값을 설정 합니다.
   *
  * @param value 설정할 값. 문자열 또는 숫자 타입
  */
  setValue(value: string | number): void;

}
