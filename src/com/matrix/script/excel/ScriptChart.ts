import { ScriptAxis } from "../../../../com/matrix/script/excel/ScriptAxis";
import { enAxisType } from "../../../../com/matrix/script/excel/enAxisType";
import { ScriptLegend } from "../../../../com/matrix/script/excel/ScriptLegend";
import { ScriptSeries } from "../../../../com/matrix/script/excel/ScriptSeries";
import { enChartType } from "../../../../com/matrix/script/excel/enChartType";
/**
* 엑셀 차트 객체에 대한 접근을 제공합니다.
*/
export interface ScriptChart{

  /** 
   * 차트에 축을 추가합니다.
   *
  * @param axisType 축 유형
  */
  CreateAxis(axisType: enAxisType): ScriptAxis;

  /** 
   * 차트에 범례를 추가합니다.
   *
  */
  CreateLegend(): ScriptLegend;

  /** 
   * 차트에 시리즈를 추가합니다.
   *
  */
  CreateSeries(): ScriptSeries;

  /** 
   * 차트에 시리즈를 추가합니다.
   *
  * @param chartType 차트 타입
  */
  CreateSeries(chartType: enChartType): ScriptSeries;

  /** 
   * 차트 타입 반환
   *
  */
  getChartType(): enChartType;

  /** 
   * 특정 인덱스의 시리즈를 반환합니다.
   *
  * @param index series index
  */
  getSeries(index: number): ScriptSeries;

  /** 
   * 시리즈 수량 반환
   *
  */
  getSeriesCount(): number;

}
