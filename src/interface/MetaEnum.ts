import { UnionEnum } from "./BaseEnum";

/*	필드의 배치 위치	*/
export const enMetaFieldArea = {
  Hidden: 0,
  Row: 1,
  Column: 2,
  Filter: 3,
  Data: 4,
} as const;
export type enMetaFieldArea = UnionEnum<typeof enMetaFieldArea>;

/*	필드의 카테고리	*/
export const enMetaFieldCategory = {
  Dimension: 0,
  Measure: 1,
  Period: 2,
  Attribute: 3,
  HierarchyGroup: 4,
  Member: 5,
  Variable: 6,
} as const;
export type enMetaFieldCategory = UnionEnum<typeof enMetaFieldCategory>;

/*	필드의 1차계산 타입	*/
export const enMetaFieldSummaryType = {
  None: 0,
  Sum: 1,
  Min: 2,
  Max: 3,
  Average: 4,
  Count: 5,
  Calculate: 6,
  DistinctCount: 13,
  Text: 14,
  PeriodIncrease: 17,
  PeriodIncreaseRate: 18,
} as const;
export type enMetaFieldSummaryType = UnionEnum<typeof enMetaFieldSummaryType>;

/*	필드의 2차계산 타입	*/
export const enMetaFieldSummaryVariation = {
  None: 0,
  Absolute: 1,
  Percent: 2,
  PercentOfColumn: 3,
  PercentOfRow: 4,
  SubTotalPercentOfColumn: 5,
  SubTotalPercentOfRow: 6,
  RunningAverage: 7,
  RunningCount: 8,
  RunningMax: 9,
  RunningMin: 10,
  RunningProduct: 11,
  RunningSum: 12,
  FirstPeriod: 15,
  LastPeriod: 16,
} as const;
export type enMetaFieldSummaryVariation = UnionEnum<
  typeof enMetaFieldSummaryVariation
>;

/*	필드의 정렬 방식	*/
export const enMetaFieldSortType = {
  None: 0,
  Asc: 1,
  Desc: 2,
  Custom: 3,
  MeasureAsc: 4,
  MeasureDesc: 5,
} as const;
export type enMetaFieldSortType = UnionEnum<typeof enMetaFieldSortType>;

/*	메타의 계산 타입	*/
export const enMetaFieldMetaRollupType = {
  rollupNone: 0,
  rollupBefore: 1, // 쿼리 단에서 풀리는 계산 필드
  rollupAfter: 2, // OLAP 그리드에 넘어가서 풀리는 계산 필드
  rollupBoth: 3, // Before, After 둘다 계산식이 존재하는 항목
} as const;
export type enMetaFieldMetaRollupType = UnionEnum<
  typeof enMetaFieldMetaRollupType
>;

/*	메타의 그룹함수	*/
export const enMetaFieldGroupFunction = {
  None: 0,
  Sum: 1,
  Avg: 2,
  Count: 3,
  Max: 4,
  Min: 5,
  DistinctCount: 6,
  FirstPeriod: 7,
  LastPeriod: 8,
  DistinctCountAfter: 9,
} as const;
export type enMetaFieldGroupFunction = UnionEnum<
  typeof enMetaFieldGroupFunction
>;

/*	메타의 컨트롤 계산 방식	*/
export const enMetaFieldAfterRollUpType = {
  None: 0,
  Sum: 1,
  Avg: 2,
  Count: 3,
  Max: 4,
  Min: 5,
  DistinctCount: 6,
  FirstPeriod: 7,
  LastPeriod: 8,
  DistinctCountAfter: 9,
} as const;
export type enMetaFieldAfterRollUpType = UnionEnum<
  typeof enMetaFieldAfterRollUpType
>;

/*	조건 컨트롤의 연산자	*/
export const enMetaConditionOperator = {
  opEqual: 0, // SingleValue
  opLessthen: 1, // SingleValue
  opGreaterthen: 2, // SingleValue
  opLessEqual: 3, // SingleValue
  opGreaterEqual: 4, // SingleValue
  opNot: 5, // SingleValue
  opLike: 6, // SingleValue
  opNotLike: 7, // SingleValue
  opIn: 8, // MultiValue
  opNotIn: 9, // MultiValue
  opIsNull: 10, // 표현 안함
  opIsNotNull: 11, // 표현 안함
  opBetween: 12, // FromTo
  opAnd: 13, // 메타에서만 사용
  opOr: 14, // 메타에서만 사용
  opNotBetween: 15, // FromTo
  opStartWith: 16, // 메타에서만 사용
  opEndWith: 17, // 메타에서만 사용
  opContains: 18, // 메타에서만 사용
  opNotContains: 19, // 메타에서만 사용
} as const;
export type enMetaConditionOperator = UnionEnum<typeof enMetaConditionOperator>;

/* 조건 컨트롤의 연산자 그룹 - 조건 컨트롤의 Label 생성시 condition.OpGroup 에 저장함 */
export const enMetaConditionOperatorGroup = {
  ogSingleValueGroup: 0,
  ogMultiValueGroup: 1,
  ogFromToGroup: 2,
} as const;
export type enMetaConditionOperatorGroup = UnionEnum<
  typeof enMetaConditionOperatorGroup
>;

/*	조건 컨트롤의 필터 종류	*/
export const enMetaConditionFilterType = {
  fltConst: 0,
  fltList: 1, // 컨트롤 생성 안함
  fltPrompt: 2,
  fltPicklist: 3,
  fltDataset: 4, // 데이터 셋
  fltDatasetPrompt: 5,
  fltvariable: 6, // 일반
  fltDatasetControl: 7	// DataSet type으로 컨트롤 생성
} as const;
export type enMetaConditionFilterType = UnionEnum<
  typeof enMetaConditionFilterType
>;

/*	조건 컨트롤의 필수 입력	*/
export const enMetaConditionPromptValidate = {
  vldNullable: 0,
  vldNotNull: 1,
  vldOptional: 2,
} as const;
export type enMetaConditionPromptValidate = UnionEnum<
  typeof enMetaConditionPromptValidate
>;

/*	조건 컨트롤의 기본 입력방식(Control 종류)	*/
export const enMetaConditionDefaultPromptType = {
  Input: 0,
  ListOfValue: 1,
  ListValue: 2, // 사용안함
  Calendar: 3,
  PickList: 4,
  FixedValue: 5, // 쿼리에서 처리
  DataSet: 6, // 쿼리에서 처리
} as const;
export type enMetaConditionDefaultPromptType = UnionEnum<
  typeof enMetaConditionDefaultPromptType
>;

/* 메타 템플릿 보고서 신규/변경 모드 */
export const enMetaTemplateMode = {
  New: 0,
  Edit: 1,
} as const;
export type enMetaTemplateMode = UnionEnum<typeof enMetaTemplateMode>;

/* 메타 구분자
 * SortArea : 외부 API(SetSortArea=>배치 순서 변경)에서 사용하는 구분자
 * Orderby : 정렬 정보와 라벨을 구분하는 구분자
 * */
export const enMetaDelimiter = {
  SortArea: "<@s@>",
  Formula: "<@!@>",
  Comma: "<@c@>",
  Comma2: "<@c2@>",
  CodeLabel: "<@u@>",
  Colon1: "<@v@>",
  Colon2: "<@l@>",
  Orderby: "<@z@>",
  LanguageCode: "<@lc@>",
  NewLine: "@nl@"   // \n이 들어간 xml 문자열 parseFromString 시 \n이 space로 변환되어 대체
} as const;
export type enMetaDelimiter = UnionEnum<typeof enMetaDelimiter>;

export const enMetaEventCode = {
  OnFileOpened: "Meta::OnFileOpened",
  OnMetaViewerOpened: "Meta::OnMetaViewerOpened",
  OnMetaViewerBindClosed: "Meta::OnMetaViewerBindClosed",
  OnLocalFileOpened : "Meta::OnLocalFileOpened"
} as const;
export type enMetaEventCode = UnionEnum<typeof enMetaEventCode>;

export const enLOVCCacheType = {
    Refresh : "Refresh",
    RefreshBeforeClear : "RefreshBeforeClear"
} as const;
export type enLOVCCacheType = UnionEnum<typeof enLOVCCacheType>;

export const enMetaPeriodType = {
  CurrentDate : 0,
  DateFunction : 1,
  DirectlyInput : 2,
  PrevYear : 3,
  PrevYearSameMonth : 4,
  SameYearPrevMonth : 5,
  PrevYearSameMonthSameDay : 6,
  SameYearPrevMonthSameDay : 7,
  Yesterday : 8
} as const;
export type enMetaPeriodType = UnionEnum<typeof enMetaPeriodType>;

export const enMetaTimeSeriesOperatorNumber = {
  opEqual:  0,
  opLessthen: 1,
  opGreaterthen: 2,
  opLessEqual: 3,
  opGreaterEqual: 4,
  opBetween: 12, 
  opNotBetween: 15
} as const;
export type enMetaTimeSeriesOperatorNumber = UnionEnum<typeof enMetaTimeSeriesOperatorNumber>;

export const enMetaTimeSeriesOperator = {
  opEqual:  "=",
  opLessthen: "<",
  opGreaterthen: ">",
  opLessEqual: "<=",
  opGreaterEqual: ">=",
  opBetween: "BETWEEN", 
  opNotBetween: "NOT BETWEEN"
} as const;
export type enMetaTimeSeriesOperator = UnionEnum<typeof enMetaTimeSeriesOperator>;