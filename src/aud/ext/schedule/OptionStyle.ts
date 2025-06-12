import { SolidColorBrush } from "../../../aud/drawing/SolidColorBrush";
/**
* 스타일 옵션
*/
export interface OptionStyle{

  /**
   * 스케쥴 셀 보더 색상(eg. #FFFAFBFC)
  */
  CellBorderColor: string;

  /**
   * 스케쥴 셀 보더 두께(eg. 1,1,1,1)
  */
  CellBorderThickness: string;

  /**
   * 행 헤더 색상(eg. #FFFAFBFC)
  */
  ColumnHeaderColor: string;

  /**
   * 가이드 라인 배경 색상(eg. #FFFFFF)
  */
  GuideLineBackColor: string;

  /**
   * 가이드 라인 보더 색상(eg. #0000FF)
  */
  GuideLineBorderColor: string;

  /**
   * 라인 색상 값(eg. #FFFAFBFC)
  */
  LineColor: string;

  /**
   * 열 헤더 색상(eg. #FFFAFBFC)
  */
  RowHeaderColor: string;

  /**
   * 헤더 토요일 폰트 색상(eg. #50D1FF)
  */
  SaturdayFontColor: string;

  /**
   * 선택한 셀의 배경색
  */
  SelectedCellBrush: SolidColorBrush;

  /**
   * 휴무일 배경 색상(eg. #E1E1E1)
  */
  SpecialDayBackColor: string;

  /**
   * 헤더 일요일 폰트 색상(eg. #FF0000)
  */
  SundayFontColor: string;

  /** 
   * 필드 헤더 경계선 추가
   *
   * @example
   * ```js
   * AddFieldHeaderBoundary("#FF0000", 1, [5,2])
   * ```
  * @param Color 선 색
  * @param Width 두께
  * @param Dash default [], 교대로 선과 간격을 그릴 거리를 지정하는 숫자입니다
  */
  AddFieldHeaderBoundary(Color: string, Width: number, Dash: string[]): void;

  /** 
   * 시간축 헤더 경계선 추가
   *
   * @example
   * ```js
   * AddTimeHeaderBoundary("#FF0000", 1, [5,2])
   * ```
  * @param Color 선 색
  * @param Width 두께
  * @param Dash default [], 교대로 선과 간격을 그릴 거리를 지정하는 숫자입니다
  */
  AddTimeHeaderBoundary(Color: string, Width: number, Dash: string[]): void;

  /** 
   * 필드 헤더 경계선 해제
   *
  */
  ClearFieldHeaderBoundary(): void;

  /** 
   * 시간축 헤더 경계선 해제
   *
  */
  ClearTimeHeaderBoundary(): void;

  /** 
   * 소계행 스타일을 설정합니다.
   *
  * @param option 소계행 옵션
  */
  SubTotalRow(option: object): void;

}
