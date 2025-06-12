/**
* X/Y축의 부모 클래스
*/
export interface Axis{

  /**
   * 최대값 자동 계산 여부
  */
  AutoMax: boolean;

  /**
   * 최소값 자동 계산 여부
  */
  AutoMin: boolean;

  /**
   * 보조 눈금 단위 자동 설정 여부
  */
  AutoMinorTickInterval: boolean;

  /**
   * 주 눈금 단위 자동 설정 여부
  */
  AutoTickInterval: boolean;

  /**
   * 축 하단의 기본 선 색상
  */
  BaseLineColor: string;

  /**
   * 축의 레이블 표시 각도. 단위 : px(픽셀)
  */
  LabelAngle: string;

  /**
   * 제목 다국어처리시 필요한 다국어 코드
  */
  LanguageCode: string;

  /**
   * 최대값
  */
  MaxValue: number;

  /**
   * 최소값
  */
  MinValue: number;

  /**
   * 보조 눈금 단위 값
  */
  MinorTickInterval: boolean;

  /**
   * 축의 영역을 지정하는 기능
  */
  PlotBands: Array<any>;

  /**
   * 제목
  */
  Text: string;

  /**
   * Tick 색상 지정
  */
  TickColor: string;

  /**
   * 주 눈금 단위 값
  */
  TickInterval: number;

  /**
   * Tick 두께 지정
  */
  TickWidth: number;

  /**
   * 보조 눈금 단위 사용 여부, 기본값 false
  */
  UseMinorTickInterval: boolean;

  /**
   * 표시 여부
  */
  Visible: boolean;

}
