/**
* 엑셀 WorkSheet의 인쇄 옵션에 대한 정보를 제공합니다.
*/
export interface WorkSheetPageSetup{

  /**
   * 하단 여백
  */
  BottomMargin: number;

  /**
   * 바닥글 가운데 구역
  */
  CenterFooter: string;

  /**
   * 머리글 가운데 구역
  */
  CenterHeader: string;

  /**
   * 인쇄 자동 맞춤 용지 페이지 높이 개수
  */
  FitToHeight: number;

  /**
   * 인쇄 자동 맞춤 용지 페이지 너비 개수
  */
  FitToWidth: number;

  /**
   * 바닥글 여백
  */
  FooterMargin: number;

  /**
   * 머리글 여백
  */
  HeaderMargin: number;

  /**
   * 인쇄 자동 맞춤이 비율인지 여부.
  */
  IsPercentScale: boolean;

  /**
   * 바닥글 왼쪽 구역
  */
  LeftFooter: string;

  /**
   * 머리글 왼쪽 구역
  */
  LeftHeader: string;

  /**
   * 좌측 여백
  */
  LeftMargin: number;

  /**
   * 용지 방향(portrait or landscape)
  */
  Orientation: string;

  /**
   * 반복 인쇄 행(eg.$B:$C)
  */
  PrintTitleColumns: string;

  /**
   * 반복 인쇄 열(eg.$2:$4)
  */
  PrintTitleRows: string;

  /**
   * 바닥글 오른쪽 구역
  */
  RightFooter: string;

  /**
   * 머리글 오른쪽 구역
  */
  RightHeader: string;

  /**
   * 우측 여백
  */
  RightMargin: number;

  /**
   * 상단 여백
  */
  TopMargin: number;

}
