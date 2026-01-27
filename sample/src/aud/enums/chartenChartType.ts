/**
* 차트 계열 유형
* @enum
*/
export enum chartenChartType{

  /** Chart-묶은 가로 막대형 */
  Bar = 0,

  /** Chart-누적 가로 막대형 */
  StackedBar = 1,

  /** Chart-100% 기준 누적 가로 막대형 */
  StackedPercentBar = 2,

  /** Chart/PolygonChart-기본형==묶은 세로 막대형 */
  Column = 3,

  /** Chart-누적 세로 막대형 */
  StackedColumn = 4,

  /** Chart-100% 기준 누적 세로 막대형 */
  StackedPercentColumn = 5,

  /** Chart-직선형/PolygonChart-직선형 */
  Line = 6,

  /** Chart-곡선형 */
  Spline = 7,

  /** Chart-누적 직선형 */
  StackedLine = 8,

  /** Chart-100% 기준 누적 직선형 */
  StackedPercentLine = 9,

  /** Chart/PolygonChart-영역형 */
  Area = 10,

  /** Chart-누적 영역형 */
  StackedArea = 11,

  /** Chart-100% 기준누적 영역형 */
  StackedPercentArea = 12,

  /** Chart-곡선 영역형 */
  AreaSpline = 13,

  /** PieChart-원형 */
  Pie = 14,

  /** PieChart-쪼개진 원형 */
  BorderWidthPie = 15,

  /** PieChart-도넛형 */
  DonutPie = 16,

  /** PieChart-쪼개진 도넛형 */
  BorderWidthDonutPie = 17,

  /** PieChart-입체 원형 */
  Pie3D = 36,

  /** PieChart-입체 쪼개진 원형 */
  BorderWidthPie3D = 37,

  /** PieChart-입체 도넛형 */
  DonutPie3D = 38,

  /** PieChart-입체 쪼개진 도넛형 */
  BorderWidthDonutPie3D = 39,

  /** ScatterChart-거품형 */
  Bubble = 24,

  /** ScatterChart-분산형 */
  Bubble_Distributed = 32,

}
