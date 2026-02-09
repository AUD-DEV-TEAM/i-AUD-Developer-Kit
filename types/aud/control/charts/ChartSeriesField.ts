/**
 * 차트 계열의 필드 정보를 나타내는 객체.
 * Scatter 차트에서 X, Y, Z축 및 Label에 바인딩되는 필드의 이름, 데이터 타입, 표시명 정보를 제공합니다.
 */
export interface ChartSeriesField {

  /**
   * 필드명
   */
  Name: string;

  /**
   * 데이터 형식 (0: Numeric, 1: String)
   */
  DataType: number;

  /**
   * 필드 표시명
   */
  Caption: string;

}
