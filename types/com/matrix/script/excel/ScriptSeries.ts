import { enChartType } from "../../../../com/matrix/script/excel/enChartType";
import { ScriptSeriesDataLabel } from "../../../../com/matrix/script/excel/ScriptSeriesDataLabel";
import { enLineDashType } from "../../../../com/matrix/script/excel/enLineDashType";
import { enMarkerType } from "../../../../com/matrix/script/excel/enMarkerType";
/**
* 엑셀 차트 시리즈 정보
*/
export interface ScriptSeries{

  /** 
   * 시리즈 항목 리스트를 초기화합니다.
   *
  */
  ClearCategory(): void;

  /** 
   * 시리즈 값 목록을 초기화합니다.
   *
  */
  ClearValues(): void;

  /** 
   * 시리즈 항목 값을 추가합니다.
   *
  * @param text 항목 값
  */
  addCategory(text: string): void;

  /** 
   * 시리즈 항목 값을 추가합니다.
   *
  * @param text 항목 값
  */
  addCategoryArray(text: string[]): void;

  /** 
   * 시리즈의 항목과 값을 추가합니다.
   *
  * @param text 항목 값
  * @param value 값
  */
  addCategoryValue(text: string, value: number): void;

  /** 
   * 시리즈의 배경 색상을 추가합니다.
   *
  * @param color 색상 값(eg.#FF00FF)
  */
  addFillColors(color: string): void;

  /** 
   * 시리즈의 배경 색상을 지정합니다.
   *
  * @param colors 색상 값 목록(eg.['#FF00FF',...,'#FFFF00'])
  */
  addFillColors(colors: string[]): void;

  /** 
   * 시리즈의 테두리 라인 색상을 추가합니다.
   *
  * @param color 색상 값(eg.#FF00FF)
  */
  addLineColors(color: string): void;

  /** 
   * 시리즈의 테두리 라인 색상을 지정합니다.
   *
  * @param colors 색상 값 목록(eg.['#FF00FF',...,'#FFFF00'])
  */
  addLineColors(colors: string[]): void;

  /** 
   * 시리즈의 값을 추가합니다.
   *
  * @param value 값
  */
  addValue(value: number): void;

  /** 
   * 시리즈의 X/Y/Size 값을 추가합니다.(차트 유형:Scatter,Bubble-Size)
   *
  * @param value 값
  * @param isXYZ 시리즈 구성 데이터 유형(X/Y/Size)
  */
  addValue(value: string, isXYZ: string): void;

  /** 
   * 시리즈의 레이블 값을 추가합니다.(차트 유형:Scatter,Bubble)
   *
  * @param value 값
  */
  addValue(value: string): void;

  /** 
   * 시리즈의 값을 추가합니다.
   *
  * @param value 값
  */
  addValueArray(value: number[]): void;

  /** 
   * 시리즈에 X/Y/Size 값을 추가합니다. (지원되는 차트 유형: Scatter, Bubble-Size) 
   *
  * @param value 값
  * @param isXYZ 시리즈 구성 데이터 유형(X/Y/Size)
  */
  addValueArray(value: number[], isXYZ: string): void;

  /** 
   * 차트 타입 반환
   *
  */
  getChartType(): enChartType;

  /** 
   * 데이터레이블 객체 반환
   *
  */
  getDataLabel(): ScriptSeriesDataLabel;

  /** 
   * 시리즈의 라벨 표시 텍스트를 반환합니다.
   *
  */
  getLabelText(): string;

  /** 
   * 보조축 사용 여부 반환
   *
  */
  getUseSecondaryAsix(): boolean;

  /** 
   * 시리즈 항목 리스트의 주소를 지정합니다.
   *
  * @param range 주소값(시트명 포함)(eg.Sheet1!C1:Z1)
  */
  setCategoryRange(range: string): void;

  /** 
   * Pie차트 계열의 쪼개짐 정도를 설정합니다.
   *
  * @param size 기본값 10(Min:0/Max:400)
  */
  setExplosion(size: number): void;

  /** 
   * 시리즈의 배경 색상을 지정합니다.
   *
  * @param color 색상 값(eg.#FF00FF)
  */
  setFillColor(color: string): void;

  /** 
   * Pie차트 계열의 첫번째 데이터 영역의 시작 각도를 설정합니다.
   *
  * @param angle 기본값 0(Min:0/Max:360)
  */
  setFirstSliceAng(angle: number): void;

  /** 
   * 값 필드의 서식을 설정합니다.
   *
  * @param fmt eg. #,##0
  */
  setFormat(fmt: string): void;

  /** 
   * Doughnut 차트 계열(도넛)의 내부 홀 크기를 설정합니다.
   *
  * @param angle 기본값 50(Min:0/Max:90)
  */
  setHoleSize(angle: number): void;

  /** 
   * 시리즈 이름 셀의 주소를 설정합니다.
   *
  * @param range 주소값(시트명 포함)(eg.Sheet1!C1)
  */
  setLabelRange(range: string): void;

  /** 
   * 시리즈의 라벨 표시 텍스트를 설정합니다.
   *
  * @param text 표시 값
  */
  setLabelText(text: string): void;

  /** 
   * 시리즈의 테두리 라인 색상을 지정합니다.
   *
  * @param color 색상 값(eg.#FF00FF)
  */
  setLineColor(color: string): void;

  /** 
   * Line 차트의 라인 자체 스타일을 지정합니다.
   *
  * @param type 라인 스타일
  */
  setLineDashType(type: enLineDashType): void;

  /** 
   * 시리즈의 테두리 라인 굵기를 지정합니다.
   *
  * @param width 기본값 1
  */
  setLineWidth(width: number): void;

  /** 
   * Line/Scatter 차트의 마커의 색상을 지정합니다.
   *
  * @param color 색상 값(eg.#FF00FF)
  */
  setMarkerColor(color: string): void;

  /** 
   * Line/Scatter 차트의 마커의 크기를 설정합니다.
   *
  * @param size 기본값 5(Min:2/Max:72)
  */
  setMarkerSize(size: number): void;

  /** 
   * Line/Scatter 차트의 마커 유형을 설정합니다.
   *
  * @param mType 기본값 Auto
  */
  setMarkerType(mType: enMarkerType): void;

  /** 
   * 시리즈의 배경 투명도 조정
   *
  * @param value 투명도(0.0~1.0)
  */
  setOpacity(value: number): void;

  /** 
   * 보조축 사용 여부 설정.
   *
  * @param value 값
  */
  setUseSecondaryAsix(value: boolean): void;

  /** 
   * 시리즈 값의 주소를 지정합니다.
   *
  * @param range 주소값(시트명 포함)(eg.Sheet1!C1:Z1)
  */
  setValueRange(range: string): void;

  /** 
   * 값 필드의 서식을 설정합니다.(차트 유형:Scatter,Bubble)
   *
  * @param fmt eg. #,##0
  */
  setXFormat(fmt: string): void;

  /** 
   * 값 필드의 서식을 설정합니다.(차트 유형:Scatter,Bubble)
   *
  * @param fmt eg. #,##0
  */
  setYFormat(fmt: string): void;

  /** 
   * 값 필드의 서식을 설정합니다.(차트 유형:Bubble)
   *
  * @param fmt eg. #,##0
  */
  setZFormat(fmt: string): void;

}
