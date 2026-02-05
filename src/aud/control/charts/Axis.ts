import { PlotBand } from "../../../aud/control/charts/PlotBand";
/**
 * 차트 X/Y축의 공통 속성을 정의하는 인터페이스.
 * {@link XAxis}, {@link YAxis}가 이 인터페이스를 상속합니다.
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
   * 축 하단의 기본 선 색상 (e.g., "#333333")
   */
  BaseLineColor: string;

  /**
   * 축 라벨을 재정의하는 함수.
   * 함수에 전달되는 인자: val(현재 라벨 값), pos(라벨 순서), categories(전체 카테고리 목록)
   *
   * @example
   * ```js
   * var Chart = Matrix.getObject("Chart");
   * Chart.XAxis.Formatter = function(val, pos, categories) {
   *     return val + "월";
   * };
   * Chart.Draw();
   * ```
   */
  Formatter: Function;

  /**
   * 축 라벨의 표시 각도 (e.g., "-45", "90")
   */
  LabelAngle: string;

  /**
   * 제목 다국어 처리 시 필요한 다국어 코드
   */
  LanguageCode: string;

  /**
   * 축의 최대값. AutoMax가 false일 때 적용됩니다.
   */
  MaxValue: number;

  /**
   * 축의 최소값. AutoMin이 false일 때 적용됩니다.
   */
  MinValue: number;

  /**
   * 보조 눈금 단위 값
   */
  MinorTickInterval: boolean;

  /**
   * 축의 특정 영역을 색상으로 강조 표시하는 PlotBand 배열
   *
   * @example
   * ```js
   * var Chart = Matrix.getObject("Chart");
   * Chart.Y1Axis.PlotBands = [
   *     { color: "rgba(255, 0, 0, 0.1)", from: 0, to: 50 },
   *     { color: "rgba(0, 255, 0, 0.1)", from: 50, to: 100 }
   * ];
   * Chart.Draw();
   * ```
   */
  PlotBands: Array<PlotBand>;

  /**
   * 축 제목 텍스트
   */
  Text: string;

  /**
   * 눈금(Tick)의 색상 (e.g., "#CCCCCC")
   */
  TickColor: string;

  /**
   * 주 눈금 단위 값. AutoTickInterval이 false일 때 적용됩니다.
   */
  TickInterval: number;

  /**
   * 눈금(Tick)의 두께 (px)
   */
  TickWidth: number;

  /**
   * 보조 눈금 단위 사용 여부 (기본값: false)
   */
  UseMinorTickInterval: boolean;

  /**
   * 축 표시 여부
   */
  Visible: boolean;

}
