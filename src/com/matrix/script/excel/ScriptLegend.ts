import { enLegendPositionType } from "../../../../com/matrix/script/excel/enLegendPositionType";
/**
* 엑셀 차트 범례 정보
*/
export interface ScriptLegend{

  /** 
   * 범례 사용여부를 설정합니다.
   *
  * @param enabled 기본값 true
  */
  setLegendEnabled(enabled: boolean): void;

  /** 
   * 범례 영역, 차트 영역과의 겹침 여부를 설정합니다.
   *
  * @param over 기본값 false
  */
  setLegendOverLay(over: boolean): void;

  /** 
   * 범례의 위치를 설정합니다.
   *
  * @param position 기본값 Bottom(3)
  */
  setLegendPosition(position: enLegendPositionType): void;

}
