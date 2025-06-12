import { ICell } from "../../../aud/control/igrids/ICell";
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
  * @param name 속성명
  */
  getProperty(name: string): object;

  /** 
   * 셀의 스타일을 반환 합니다.
   *
  */
  getStyle(): object;

  /** 
   * 셀의 텍스트를 반환 합니다.
   *
  */
  getText(): string;

  /** 
   * 셀의 값을 반환 합니다. 값은 문자열 또는 수치형 데이터 입니다.
   *
  */
  getValue(): object;

  /** 
   * 셀의 서식을 설정 합니다.
   *
  * @param format 서식
  */
  setFormat(format: string): void;

  /** 
   * 셀의 특정 속성을 설정 합니다.
   *
  * @param name 속성명
  * @param object 속성 값
  */
  setProperty(name: string, object: object): void;

  /** 
   * 셀의 스타일을 설정 합니다.
   *
  * @param style 스타일 객체
  */
  setStyle(style: object): void;

  /** 
   * 셀의 텍스트를 설정 합니다.
   *
  * @param text 값
  */
  setText(text: string): void;

  /** 
   * 셀의 값을 설정 합니다.
   *
  * @param value 값
  */
  setValue(value: any): void;

}
