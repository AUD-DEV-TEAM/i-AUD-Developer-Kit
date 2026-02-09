/**
* i-OLAP 필드 생성 구분
* @enum
*/
export enum enOlapFieldCreateType{

  /** Default */
  "Default" = 0,

  /** Measures */
  "Measures" = 1,

  /** DimensionGroup */
  "DimensionGroup" = 2,

  /** HierarchyGroup */
  "HierarchyGroup" = 3,

  /** CalcTemp */
  "CalcTemp" = 4,

}
