/**
* 조회 조건 입력 유형
* @enum
*/
export enum enMetaConditionFilterType{

  /** vldNullable */
  "vldNullable" = 0,

  /** vldNotNull */
  "vldNotNull" = 1,

  /** vldOptional */
  "vldOptional" = 2,

  /** fltConst */
  "fltConst" = 0,

  /** fltList */
  "fltList" = 1,

  /** fltPrompt */
  "fltPrompt" = 2,

  /** fltPicklist */
  "fltPicklist" = 3,

  /** fltDataset */
  "fltDataset" = 4,

  /** fltDatasetPrompt */
  "fltDatasetPrompt" = 5,

  /** fltvariable */
  "fltvariable" = 6,

  /** fltDatasetControl */
  "fltDatasetControl" = 7,

}
