import { enChartDataLabelType } from "../../../aud/enums/chart/enChartDataLabelType";
/**
* Pie 차트의 데이터 표시 영역에 대한 정보를 제공합니다.
*/
export interface PiePlotOptions{

  /**
   * 데이터 영역 클릭, animation 효과 사용 여부(efault:true)
  */
  AllowPointSelect: boolean;

  /**
   * 데이터 영역의 경계선 색
  */
  BorderColor: string;

  /**
   * 데이터 영역의 경계선 굵기
  */
  BorderWidth: number;

  /**
   * Pie 원형 크기
  */
  CircularSize: number;

  /**
   * 데이터 레이블과 포인트와의 거리( 0 이하일 경우 연결선은 자동으로 사라짐 / 가운데 설정의 경우, 비율(%)로 설정하는 것을 권장)
  */
  DataLabelsDistance: string | number;

  /**
   * 도넛 차트일 경우 안쪽의 크기(default:0)
  */
  InnerSize: number;

  /**
   * 데이터 레이블과 포인트와의 연결선 사용 여부
  */
  UseDataLabelsConnector: boolean;

  /** 
   * 차트의 데이터레이블 타입을 설정합니다.
   *
  * @param type 0:None, 1:Value, 2:ValueLabel
  */
  SetDataLabelsType(type: enChartDataLabelType): void;

}
