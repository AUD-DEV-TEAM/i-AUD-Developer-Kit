import { ScriptSeriesDataLabelStyle } from "../../../../com/matrix/script/excel/ScriptSeriesDataLabelStyle";
import { enDataLabelPositionType } from "../../../../com/matrix/script/excel/enDataLabelPositionType";
/**
* 엑셀 차트 시리즈의 데이터레이블 정보
*/
export interface ScriptSeriesDataLabel{

  /** 
   * 기본 값(Value/CategoryName/SeriesName) 대신 별도의 값 표시 할 경우 부가적으로 추가 필요(데이터레이블필드)
   *
  * @param values 데이터 갯수만큼 값 설정 필요
  */
  addTextArray(values: string[]): void;

  /** 
   * 데이터레이블의 스타일 객체를 반환합니다.
   *
  */
  getStyle(): ScriptSeriesDataLabelStyle;

  /** 
   * 데이터레이블 위치
   *
  * @param pos 위치
  */
  setPosition(pos: enDataLabelPositionType): void;

  /** 
   * 카테고리  값 표시
   *
  * @param isShow true : 표시 / false : 표시 안함
  */
  showCategoryName(isShow: boolean): void;

  /** 
   * 계열명 표시
   *
  * @param isShow true : 표시 / false : 표시 안함
  */
  showSeriesName(isShow: boolean): void;

  /** 
   * 값 표시
   *
  * @param isShow true : 표시 / false : 표시 안함
  */
  showValue(isShow: boolean): void;

}
