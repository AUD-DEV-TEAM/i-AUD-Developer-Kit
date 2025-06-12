import { DataLabels } from "../../../aud/control/charts/DataLabels";
import { enChartType } from "../../../aud/enums/chart/enChartType";
/**
* Pie 차트의 계열 정보를 제공합니다.
*/
export interface PieSeries{

  /**
   * 데이터 레이블 객체 정보를 제공합니다.
  */
  DataLabels: DataLabels;

  /**
   * 데이터레이블의 테두리 색상을 계열의 색상 값과 동일하게 설정할지 여부
(데이터레이블 필드, 수식이 설정된 상태 및 ValueLabel 으로 설정된 상태에서만 유효)
  */
  DataLabelsColorBySeries: boolean;

  /**
   * 데이터레이블의 직접 정의합니다.
  */
  DataLabelsFormula: Function | string;

  /**
   * 계열의 데이터 형식(Numeric : 0, String: 1) 
  */
   readonly DataType: number;

  /**
   * 3D일 경우의 깊이
  */
  Depth: number;

  /**
   * 데이터 종료 각도
  */
  EndAngle: number;

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
   * 쪼개진 상태를 반환합니다.
  */
   readonly Sliced: boolean;

  /**
   * 쪼개짐 정도
  */
  SlicedOffset: number;

  /**
   * 데이터 시작 각도
  */
  StartAngle: number;

  /**
   * 차트 유형을 반환합니다.
  */
   readonly Type: enChartType;

  /**
   * 값의 단위(기본값:0)
  */
  Unit: number;

  /**
   * 데이터레이블의 offset X(default:0)
  */
  X: number;

  /**
   * 데이터레이블의 offset Y(default:-6)
  */
  Y: number;

}
