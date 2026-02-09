/**
 * 축의 특정 영역을 색상으로 강조 표시하기 위한 PlotBand 설정 객체
 *
 * @example
 * ```js
 * var Chart = Matrix.getObject("Chart");
 * // Y축에 50~100 구간을 녹색으로 표시
 * Chart.Y1Axis.PlotBands = [
 *     { color: "rgba(0, 255, 0, 0.1)", from: 50, to: 100 }
 * ];
 * Chart.Draw();
 * ```
 */
export interface PlotBand {

  /**
   * 영역의 배경 색상 (e.g., "rgba(0, 255, 0, 0.1)", "#00FF00")
   */
  color: string;

  /**
   * 영역의 시작 값
   */
  from: number;

  /**
   * 영역의 끝 값
   */
  to: number;

}
