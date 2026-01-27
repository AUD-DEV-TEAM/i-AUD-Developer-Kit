/**
* 엑셀 차트 시리즈의 데이터레이블 스타일 정보
*/
export interface ScriptSeriesDataLabelStyle{

  /** 
   * 배경색
   *
  * @param col hex code(eg.#000000) 형식으로 설정 필요
  */
  setBackgroundColor(col: string): void;

  /** 
   * 글자 굵게 여부
   *
  * @param isBold true:bold / false:normal
  */
  setBold(isBold: boolean): void;

  /** 
   * 경계선 색
   *
  * @param col hex code(eg.#000000) 형식으로 설정 필요
  */
  setBorderColor(col: string): void;

  /** 
   * 경계선 두께
   *
  * @param w pixel 단위
  */
  setBorderWidth(w: number): void;

  /** 
   * 글자 색
   *
  * @param col hex code(eg.#000000) 형식으로 설정 필요
  */
  setFontColor(col: string): void;

  /** 
   * 글자 종류
   *
  * @param ff 글자 종류(eg.맑은 고딕)
  */
  setFontFamily(ff: string): void;

  /** 
   * 글자 크기
   *
  * @param size pixel 단위
  */
  setFontSize(size: number): void;

  /** 
   * 글자 기울림꼴 여부
   *
  * @param isItalic true:Italic / false:normal
  */
  setItalic(isItalic: boolean): void;

  /** 
   * 배경의 투명도
   *
  * @param op 0~1(eg.0.8) (0 : 투명/ 1: 불투명) 
  */
  setOpacity(op: number): void;

}
