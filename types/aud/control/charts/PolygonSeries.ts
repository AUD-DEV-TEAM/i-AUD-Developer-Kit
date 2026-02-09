import { DataLabels } from "../../../aud/control/charts/DataLabels";
import { enChartType } from "../../../aud/enums/chart/enChartType";
/**
 * Polygon 차트의 계열 정보를 제공합니다.
 */
export interface PolygonSeries{

  /**
   * 계열의 데이터레이블 정렬방식
  */
  Align: number;

  /**
   * 데이터 영역의 색
  */
  BackgroundColor: string;

  /**
   * 데이터 영역의 경계선 색
  */
  BorderColor: string;

  /**
   * 데이터 영역의 경계선 굵기
  */
  BorderWidth: number;

  /**
   * 계열의 데이터 포인트에 대한 단일 지정 여부 옵션(true: Palette 에 대한 색상 / false: 단일 색상)
  */
  ColorByPoint: boolean;

  /**
   * 데이터 레이블 객체 정보를 제공합니다.
  */
  DataLabels: DataLabels;

  /**
   * 데이터레이블의 테두리 색상을 계열의 색상 값과 동일하게 설정할지 여부
   * (데이터레이블 필드, 수식이 설정된 상태 및 ValueLabel로 설정된 상태에서만 유효)
   */
  DataLabelsColorBySeries: boolean;

  /**
   * 데이터레이블 표시 여부
   */
  DataLabelsVisible: boolean;

  /**
   * 계열의 데이터 형식(Numeric : 0, String: 1) 
  */
   readonly DataType: number;

  /**
   * 적용 서식(기본값:{0:N0})
  */
  Format: string;

  /**
   * 계열명 다국어 처리시 필요한 다국어 코드
  */
  LanguageCode: string;

  /**
   * 계열명
  */
  Name: string;

  /**
   * X축의 각도로 사용할때, 시작 각도, 종료까지 표시 지점(default:45)
  */
  PointInterval: number;

  /**
   * 축과 데이터 포인트의 접점 위치(default:between)
  */
  PointPlacement: string;

  /**
   * X축의 각도로 사용할때, 시작 각도(포인트 시작 지점)(default:0)
  */
  PointStart: number;

  /**
   * Line 유형일때 계열의 심볼자체의 색
  */
  SymbolColor: string;

  /**
   * Line 유형일때 계열의 심볼 크기
  */
  SymbolRadius: number;

  /**
   * Line 유형일때 계열의 심볼 유형(default:circle)
  */
  SymbolType: number;

  /**
   * 차트 유형
  */
  Type: enChartType;

  /**
   * 값의 단위(기본값:0)
  */
  Unit: number;

  /**
   * 계열의 값 필드

  */
  ValueField: string;

  /**
   * 표시 여부
  */
  Visible: boolean;

  /**
   * 데이터레이블의 offset X (default: 0)
   */
  X: number;

  /**
   * 데이터레이블의 offset Y (default: -6)
   */
  Y: number;

  /** 
   * 특정 Index 데이터의 색상을 설정합니다.
   *
  * @param index 설정할 데이터 Index
  * @param color 색상 코드
  */
  SetPointColor(index: number, color: string): void;

}
