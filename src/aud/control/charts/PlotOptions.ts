import { chartenChartDataLabelType } from "../../../aud/enums/chartenChartDataLabelType";
/**
* 기본 차트의 데이터 표시 영역에 대한 정보를 제공합니다.
*/
export interface PlotOptions{

  /**
   * 계열 표시 효과 시간(milliseconds)
  */
  Animation: number;

  /** 
   * 차트의 데이터레이블 타입을 설정합니다.
   *
  * @param type 0:None, 1:Value, 2:ValueLabel
  */
  SetDataLabelsType(type: chartenChartDataLabelType): void;

}
