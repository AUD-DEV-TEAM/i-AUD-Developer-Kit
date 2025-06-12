/**
* 테이블 레이아웃 셀 유형
* @enum
*/
export enum enCellType{

  /**   */
  "None" = 0,

  /** 텍스트 박스 */
  "TextBox" = 1,

  /** 인풋박스 */
  "InputBox" = 2,

  /** 체크박스 */
  "CheckBox" = 3,

  /** 넘버박스 */
  "NumberBox" = 4,

  /** 콤보박스 */
  "ComboBox" = 5,

  /** 일달력 */
  "Daily" = 6,

  /** FromTo 일달력 */
  "DFromTo" = 61,

  /** 월달력 */
  "Month" = 62,

  /** FromTo 월달력 */
  "MFromTo" = 63,

  /** 이미지 */
  "Image" = 7,

  /** 버튼 */
  "Button" = 8,

}
