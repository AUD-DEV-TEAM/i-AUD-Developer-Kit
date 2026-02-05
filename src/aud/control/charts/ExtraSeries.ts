import { enChartType } from "../../../aud/enums/chart/enChartType";
import { ChartSeriesField } from "../../../aud/control/charts/ChartSeriesField";
/**
 * Scatter 차트의 계열 정보를 제공합니다.
 */
export interface ExtraSeries{

  /**
   * 계열의 데이터레이블 정렬방식
   */
  Align: number;

  /**
   * 계열의 데이터 포인트에 대한 단일 지정 여부 옵션 (true: Palette에 대한 색상 / false: 단일 색상)
   */
  ColorByPoint: boolean;

  /**
   * 데이터레이블의 테두리 색상을 계열의 색상 값과 동일하게 설정할지 여부.
   * 데이터레이블 필드 또는 수식이 설정된 상태 및 ValueLabel로 설정된 상태에서만 유효합니다.
   */
  DataLabelsColorBySeries: boolean;

  /**
   * 데이터레이블 표시 여부
   */
  DataLabelsVisible: boolean;

  /**
   * 계열의 데이터 형식 (0: Numeric, 1: String)
   */
   readonly DataType: number;

  /**
   * Label에 해당하는 필드 정보
   */
  LabelSeries: ChartSeriesField;

  /**
   * 계열명 다국어 처리 시 필요한 다국어 코드
   */
  LanguageCode: string;

  /**
   * 계열명
   */
  Name: string;

  /**
   * X축에 해당하는 필드 정보
   */
  SeriesX: ChartSeriesField;

  /**
   * Y축에 해당하는 필드 정보
   */
  SeriesY: ChartSeriesField;

  /**
   * Z축에 해당하는 필드 정보 (Bubble 차트에서 크기 값으로 사용)
   */
  SeriesZ: ChartSeriesField;

  /**
   * 심볼 크기 (기본값: 4)
   */
  SymbolRadius: number;

  /**
   * 심볼 유형 (기본값: "circle")
   */
  SymbolType: string;

  /**
   * 차트 유형
   */
  Type: enChartType;

  /**
   * 표시 여부
   */
  Visible: boolean;

  /**
   * 데이터레이블의 X 오프셋 (기본값: 0)
   */
  X: number;

  /**
   * X축 적용 서식 (기본값: "{0:N0}")
   */
  XFormat: string;

  /**
   * X값의 단위 (기본값: 1)
   */
  XUnit: number;

  /**
   * 데이터레이블의 Y 오프셋 (기본값: -6)
   */
  Y: number;

  /**
   * Y축 적용 서식 (기본값: "{0:N0}")
   */
  YFormat: string;

  /**
   * Y값의 단위 (기본값: 1)
   */
  YUnit: number;

  /**
   * 특정 Index 데이터의 색상을 설정합니다.
   *
   * @param index 설정할 데이터 Index
   * @param color 색상 코드 (e.g., "#FF0000")
   */
  SetPointColor(index: number, color: string): void;

}
