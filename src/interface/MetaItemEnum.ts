import { UnionEnum } from "./BaseEnum";

export const enMetaItemType = {
  Folder: 0, // item folder  
  Field: 1,
  CalcField: 2, // 계산필드
  filterOperator: 3, // and, or
  CalculatedTable: 4,
  Invalidate: 5, // 제거된 item
  MergedField: 6, // 병합 된 item (meta merge 에 사용)
  SQLHintField: 7, // sql hint 에 사용되는 field
  Func: 8, // (function)
  Omitted: 9, // 생략된 필드 (사용자 정의 member에서 사용), ysh
  Variable: 10, // 변수 목록
  FolderOpen: 11
};
export type enMetaItemType = UnionEnum<typeof enMetaItemType>;

// 메타 뷰어 아이템 컨텍스트 메뉴 (메타 뷰어 전용)
export const enMetaItemContextMenuID = {
  Having : "Having", 
  Sort : "Sort", 
  Rename : "Rename", 
  Selected : "Selected", 
  Delete : "delete", 
  DerivenItem : "DerivenItem", 
  UserDefineRowAdd : "UserDefineRowAdd", 
  UserDefineRowEdit : "UserDefineRowEdit", 
  UserDefineRowDelete : "UserDefineRowDelete",   
  DerivenItemAdd : "DerivenItemAdd", 
  MergeFieldEdit : "MergeFieldEdit", 
  MergeFieldDelete : "MergeFieldDelete", 
  GroupFunction : "GroupFunction", 
  None : "None", 
  Sum : "Sum", 
  Avg : "Avg", 
  Min : "Min", 
  Max : "Max", 
  Count : "Count", 
  DistinctCount : "DistinctCount", 
  LOV : "LOV", 
  AddParenthesisItem : "AddParenthesisItem",
  DelParenthesisItem : "DelParenthesisItem",
    MergeFieldAdd : "MergeFieldAdd",
    DistinctCountAfter : "DistinctCountAfter",
  TimeSeries : "TimeSeries"
};
export type enMetaItemContextMenuID = UnionEnum<typeof enMetaItemContextMenuID>;

export const enMetaItemCRUDType = {
  Name: 0,
  GroupFunction: 1,
  ComparisonOperator: 2,
  Value1: 3,
  Value2: 4,
};
export type enMetaItemCRUDType = UnionEnum<typeof enMetaItemCRUDType>;

export const enMetaFilterItemValueType = {
  Value1: "Value1",
  Value1Inner: "Value1Inner",
  Value2: "Value2",  
  Value2Inner: "Value2Inner",
};
export type enMetaFilterItemValueType = UnionEnum<typeof enMetaFilterItemValueType>;

export const enMetaFilterItemPropType = {
  Value1: "Value1",
  Value2: "Value2",
  Value1Bound: "Value1Bound",
  Value1ButtonBound: "Value1ButtonBound",
  Value2Bound: "Value2Bound",
  Value2ButtonBound: "Value2ButtonBound",
  OptionButtonBound: "OptionButtonBound",
};
export type enMetaFilterItemPropType = UnionEnum<
  typeof enMetaFilterItemPropType
>;

/// <summary>
/// sort direction
/// </summary>
export const enSortDirection = {
  ASC : "sortAscending", 
  DESC : "sortDescending"
};
export type enSortDirection = UnionEnum<
  typeof enSortDirection
>;

export const enFilterItemProtectLevel = {
  protectNone : 0,
      protectRemoveWarn : 1,          // 경고 메세지 
      protectRemove : 2,              // 제거 보호
      protectRemove_Operator : 3,     // 제거, 연산자 고정
      protectRemove_Value : 4        // 제거 보호 (연산자, value 고정)
};
export type enFilterItemProtectLevel = UnionEnum<
  typeof enFilterItemProtectLevel
>;

export const enCalendarFilterItemType = {
    Daily : 1,      // 일달력
    Monthly : 2,    // 월달력
    Yearly : 3,     // 년달력
    Weekly : 4     // 주달력
};
export type enCalendarFilterItemType = UnionEnum<
    typeof enCalendarFilterItemType
    >;