import { IStyle } from "../../../aud/control/igrids/IStyle";
/**
* MX-GRID 엑셀 이름 정의 정보
*/
export interface XLSName{

  /**
   * 이름 정의 이름
  */
  Name: string;

  /**
   * 참조 영역 (예: "Sheet1!$A$1:$B$10")
  */
  RefersTo: string;

}

/**
* MX-GRID 엑셀 스타일 정보
*/
export interface XLSStyle extends IStyle{

  /**
   * 스타일 인덱스
  */
  Index: number;

}

/**
* MX-GRID 엑셀 셀 정보
*/
export interface XLSCell{

  /**
   * 셀 주소 (예: "A1")
  */
  Range: string;

  /**
   * 셀 값
  */
  Value: string | number | null;

  /**
   * 셀 데이터 타입
  */
  Type: number;

  /**
   * 스타일 인덱스
  */
  Style?: number;

  /**
   * 수식
  */
  Formula?: string;

  /**
   * 열 병합 수
  */
  colspan?: number;

  /**
   * 행 병합 수
  */
  rowspan?: number;

}

/**
* MX-GRID 엑셀 행 정보
*/
export interface XLSRow{

  /**
   * 행 번호 (1부터 시작)
  */
  R: number;

  /**
   * 행 높이
  */
  Height: number;

  /**
   * 행 숨김 여부
  */
  Hidden?: boolean;

}

/**
* MX-GRID 엑셀 열 정보
*/
export interface XLSColumn{

  /**
   * 열 번호 (1부터 시작)
  */
  C: number;

  /**
   * 열 너비
  */
  Width: number;

  /**
   * 열 숨김 여부
  */
  Hidden?: boolean;

}

/**
* MX-GRID 엑셀 워크시트 정보
*/
export interface XLSWorkSheet{

  /**
   * 시트 이름
  */
  Name: string;

  /**
   * 시트 표시 여부
  */
  Visible?: boolean;

  /**
   * 행 목록
  */
  Rows: XLSRow[];

  /**
   * 열 목록
  */
  Columns: XLSColumn[];

  /**
   * 셀 목록
  */
  Cells: XLSCell[];

}

/**
* MX-GRID 엑셀 Workbook 직렬화 모델
*/
export interface XLSWorkBook{

  /**
   * 모델 버전
  */
  Version: number;

  /**
   * 기본 폰트 이름
  */
  FontName: string;

  /**
   * 기본 폰트 크기
  */
  FontSize: number;

  /**
   * 이름 정의 목록
  */
  Names?: XLSName[];

  /**
   * 스타일 목록
  */
  Styles: XLSStyle[];

  /**
   * 워크시트 목록
  */
  WorkSheets: XLSWorkSheet[];

}
