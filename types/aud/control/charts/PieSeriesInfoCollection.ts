import { PieSeries } from "../../../aud/control/charts/PieSeries";
/**
 * Pie 차트에 바인딩된 계열의 객체 정보를 제공합니다.
 */
export interface PieSeriesInfoCollection{

  /** 
   * 차트 계열 컬렉션이 가지고 있는 계열의 수를 반환합니다.
   *
  */
  Count(): number;

  /** 
   * name에 해당하는 계열을 반환합니다.
   *
  * @param name 이름
  */
  Get(name: string): PieSeries;

  /** 
   * index에 해당하는 계열을 반환합니다.
   *
  * @param index 인덱스
  */
  GetByIndex(index: number): PieSeries;

}
