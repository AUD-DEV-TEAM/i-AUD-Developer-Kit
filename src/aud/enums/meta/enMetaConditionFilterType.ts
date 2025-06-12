/**
* 조회 조건 입력 유형
* @enum
*/
export enum enMetaConditionFilterType{

  /**  */
  vldNullable = 0,

  /**  */
  vldNotNull = 1,

  /**  */
  vldOptional = 2,

  /**  */
  fltConst = 0,

  /**  */
  fltList = 1,

  /**  */
  fltPrompt = 2,

  /**  */
  fltPicklist = 3,

  /**  */
  fltDataset = 4,

  /**  */
  fltDatasetPrompt = 5,

  /**  */
  fltvariable = 6,

  /**  */
  fltDatasetControl = 7,

}
