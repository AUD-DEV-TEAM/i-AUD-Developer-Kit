import { PolygonSeries } from "../../../aud/control/charts/PolygonSeries";
/**
* Polygon 차트에 바인딩된 계열의 객체 정보를 제공합니다. 
*/
export interface PolygonSeriesInfoCollection{

  /** 
   * 차트 계열 콜랙션이 가지고 있는 계열의 수를 반환합니다.
   *
  */
  Count(): number;

  /** 
   * name에 해당하는 계열을 반환합니다.
   *
  * @param name 이름
  */
  Get(name: string): PolygonSeries;

  /** 
   * index에 해당하는 계열을 반환합니다.
   *
  * @param index 인덱스
  */
  GetByIndex(index: number): PolygonSeries;

}
