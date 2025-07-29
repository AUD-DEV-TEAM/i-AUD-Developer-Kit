import { ScriptWorkSheet } from "../../../../com/matrix/script/excel/ScriptWorkSheet";
import { ScriptFontSettingList } from "../../../../com/matrix/script/excel/ScriptFontSettingList";
import { ScriptCellStyle } from "../../../../com/matrix/script/excel/ScriptCellStyle";
/**
* 엑셀 셀에 대한 접근을 제공합니다.
*/
export interface ScriptCellRange{

  /** 
   * 셀의 타입이 날짜 인지 여부를 반환 합니다.
   *
  */
  IsDateTime(): boolean;

  /** 
   * 셀의 논리 값을 반환 합니다.
   *
  */
  getBoolean(): boolean;

  /** 
   * 셀 데이터 특성을 나타내는 문자열을 반환 합니다.
   *
  * @param ws 
  */
  getCellType(ws: ScriptWorkSheet): string;

  /** 
   * 셀 데이터 특성을 나타내는 문자열을 반환 합니다.
   *
  */
  getCellType(): string;

  /** 
   * 열의 인덱스를 반환 합니다.
   *
  */
  getColumn(): int;

  /** 
   * 셀의 날짜 값을 반환 합니다.
   *
  */
  getDate(): Date;

  /** 
   * 셀의 편집 가능 여부를 반환 합니다.
   *
  */
  getEditable(): boolean;

  /** 
   * 셀 내 다중 셀 서식정보를 반환 합니다.
   *
  */
  getFontSetting(): ScriptFontSettingList;

  /** 
   * 셀의 수식을 반환 합니다.
   *
  */
  getFormula(): string;

  /** 
   * 셀을 사용자가 수정했는지 여부를 반환 합니다.
   *
  */
  getIsModified(): boolean;

  /** 
   * 셀의 수치 값을 반환 합니다.
   *
  */
  getNumber(): double;

  /** 
   * 셀의 사용자 정의 속성을 반환 합니다.
   *
  * @param name 속성 명
  */
  getProperty(name: string): string;

  /** 
   * 영역의 이름을 반환 합니다.
   *
  */
  getRangeName(): string;

  /** 
   * 헹의 인덱스를 반환합니다.
   *
  */
  getRow(): int;

  /** 
   * 셀의 스타일을 반환 합니다.
   *
  */
  getStyle(): ScriptCellStyle;

  /** 
   * 셀의 텍스트를 반환 합니다.
   *
  */
  getText(): string;

  /** 
   * 셀의 유효성 검사 설정 값을 반환 합니다.
   *
  */
  getValidator(): int;

  /** 
   * 셀의 값을 반환 합니다.
   *
  */
  getValue(): object;

  /** 
   * 특정 이름을 가진 셀의 사용자 정의 속성을 삭제 합니다.
   *
  * @param name 
  */
  removeProperty(name: string): void;

  /** 
   * 셀에 논리값으로 수정합니다.
   *
  * @param value 값
  */
  setBoolean(value: boolean): void;

  /** 
   * 셀 데이터 특성을 설정합니다.
   *
  * @param typeName 셀 타입 

  Empty    
, String   
, Number   
, DivideZero
, RefError
, NotAvaliable
, NotSupportFunction
, NotValue
, NotNumber
, Boolean  
, DateTime  
, CircularError
, NotName
, NullError  
  */
  setCellType(typeName: string): void;

  /** 
   * 셀에 날짜 값으로 수정 합니다.
   *
  * @param year year
  * @param month month
  * @param day day
  */
  setDate(year: int, month: int, day: int): void;

  /** 
   * 셀에 날짜 값으로 수정 합니다.
   *
  * @param dateValue dateValue
  */
  setDateValue(dateValue: double): void;

  /** 
   * 셀의 편집 가능 여부를 설정합니다.
   *
  * @param value 편집 가능 여부
  */
  setEditable(value: boolean): void;

  /** 
   * 셀의 수식을 설정 합니다.
   *
  * @param formula formula
  */
  setFormula(formula: string): void;

  /** 
   * 셀을 사용자가 수정했는지 여부를 설정합니다
   *
  * @param value 수정상태
  */
  setIsModified(value: boolean): void;

  /** 
   * 셀의 수치형 값을 설정 합니다.
   *
  * @param number Number value
  */
  setNumber(number: double): void;

  /** 
   * 셀의 사용자 정의 속성을 추가 합니다.
   *
  * @param name 속성 명(MC:컬럼 펼치기, MR:Row펼치기, MS:상태(E = expand, C=collapsed]))
  * @param value 속성 값
  */
  setProperty(name: string, value: string): void;

  /** 
   * 셀의 스타일을 설정 합니다.
   *
  * @param style style
  */
  setStyle(style: ScriptCellStyle): void;

  /** 
   * 셀의 텍스트를 설정 합니다.
   *
  * @param text text
  */
  setText(text: string): void;

  /** 
   * 셀의 유효성 검사 설정 값을 설정합니다.
   *
  * @param index 유효성 검사의 Index
  */
  setValidator(index: int): void;

  /** 
   * 셀의 값을 설정합니다.
   *
  * @param value 값
  */
  setValue(value: object): void;

}
