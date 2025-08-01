/**
* 엑셀 차트 축 정보
*/
export interface ScriptAxis{

  /** 
   * 축의 최소/최대값을 자동으로 설정합니다..
   *
  * @param isAuto 기본값 true
  */
  setAutoMinMax(isAuto: boolean): void;

  /** 
   * 축의 최대값을 설정합니다.
   *
  * @param max 값
  */
  setMaxValue(max: number): void;

  /** 
   * 축의 최소값을 설정합니다.
   *
  * @param min 값
  */
  setMinValue(min: number): void;

}
