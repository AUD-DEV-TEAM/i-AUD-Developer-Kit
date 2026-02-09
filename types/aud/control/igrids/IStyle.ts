/**
* MX-GRID 셀 폰트 스타일 정보
*/
export interface IFontStyle{

  /**
   * 폰트 굵기 (예: "bold")
  */
  "font-weight": string;

  /**
   * 폰트 스타일 (예: "italic")
  */
  "font-style": string;

  /**
   * 텍스트 꾸밈 (예: "underline")
  */
  "text-decoration": string;

  /**
   * 폰트 크기 (px)
  */
  "font-size": number;

  /**
   * 폰트 포인트 크기
  */
  "fontPoint": number;

  /**
   * 폰트 패밀리 (예: "맑은 고딕")
  */
  "font-family": string;

  /**
   * 폰트 색상 (예: "#FF000000")
  */
  "color": string;

  /**
   * 취소선 여부
  */
  "strike-out"?: boolean;

  /**
   * 위첨자/아래첨자 (예: "super", "sub")
  */
  "baseline-shift"?: string;

}

/**
* MX-GRID 셀 스타일 정보
*/
export interface IStyle{

  /**
   * 좌측 테두리 스타일 (예: "Thin,#FF000000")
  */
  "border-left": string;

  /**
   * 상단 테두리 스타일
  */
  "border-top": string;

  /**
   * 우측 테두리 스타일
  */
  "border-right": string;

  /**
   * 하단 테두리 스타일
  */
  "border-bottom": string;

  /**
   * 대각선(위) 테두리 스타일
  */
  "border-diagonalup": string;

  /**
   * 대각선(아래) 테두리 스타일
  */
  "border-diagonaldown": string;

  /**
   * 배경색 (예: "#FFFFFF00")
  */
  "background-color": string;

  /**
   * 수평 정렬 ("left", "center", "right", "center2")
  */
  "text-align": string;

  /**
   * 수직 정렬 ("top", "middle", "bottom")
  */
  "vertical-align": string;

  /**
   * 폰트 스타일 정보
  */
  "font-style": IFontStyle;

  /**
   * 셀 서식 문자열
  */
  Format: string;

  /**
   * 들여쓰기 수준
  */
  IndentLevel?: number;

  /**
   * 자동 줄바꿈 여부
  */
  WrapText?: boolean;

  /**
   * 셀에 맞춤 여부
  */
  ShrinkToFit?: boolean;

  /**
   * 텍스트 회전 각도
  */
  RotationAngle?: number;

  /**
   * 셀 잠금 여부
  */
  IsLocked?: boolean;

}
