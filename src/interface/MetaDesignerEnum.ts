import { UnionEnum } from "./BaseEnum";

/* 스키마의 트리에서 사용 */
export const enMetaType = {
    None : "None", //DataBase
    Table : "Table",
    View : "View",
    Synonym : "Synonym",
    Sequence : "Sequence",
    MaterializedView : "MaterializedView",
    ExtendTable : "ExtendTable",
    ExtendColumn : "ExtendColumn",
    Schema : "Schema",
    Folder : "Folder",
    Column : "Column",
    MetaSchemaTableFolder : "MetaSchemaTableFolder",
    MetaSchemaViewFolder : "MetaSchemaViewFolder",
    MetaSchemaSynomFolder : "MetaSchemaSynomFolder",
    CopyTable : "CopyTable",                  //제거 레거시와 공유 위해서 필요
    PublicSynonym : "PublicSynonym"
} as const;
export type enMetaType = UnionEnum<typeof enMetaType>;

/* 메타 디자이너의 보고서 목록 */
export const enMetaDesignerDialogReportType = {
    SchemaWindow: "meta.designer.metaSchemaWindow",
    Property: "meta.designer.metaProperty",
    ObjectWindow: "meta.designer.metaObjectWindow",
    DBConnect: "meta.designer.metaDBConnect",
    ConditionSetting: "meta.designer.metaConditionSetting",
    AffectFile: "meta.designer.metaAffectFile",
    SchemaManager: "meta.designer.metaSchemaManager",
    Option: "meta.designer.metaDesignerOption",
    CalcField: "meta.designer.metaCalcField",
    FilterCondition: "meta.designer.metaFilterCondition",
    JoinSetting: "meta.designer.metaJoinSetting",
    SQLJoinSetting: "meta.designer.metaSQLJoinSetting",
    TableCalcField: "meta.designer.metaTableCalcField",
    Designer: "meta.designer.metaDesigner",
    HeaderButton: "meta.designer.metaHeaderButton",
    Diagram: "meta.designer.metaDiagram",
    ItemWindow: "meta.designer.metaItemWindow",
    ItemMove: "meta.designer.metaItemMove",
    ItemFieldWindow: "meta.designer.metaItemFieldWindow",
    Validation: "meta.designer.metaValidation"
} as const;
export type enMetaDesignerDialogReportType = UnionEnum<typeof enMetaDesignerDialogReportType>;

/**
 * table Join Type
 */
export const enJoinType = {
    inner       : "inner",
    leftOuter   : "leftOuter",
    rightOuter  : "rightOuter"
    // userDefind : "userDefind"
} as const;
export type enJoinType = UnionEnum<typeof enJoinType>;

export const enDisplayOrder = {
    dispName        :  "dispName",                 // code 우선 표시
    dispDescription :  "dispDescription"         // description 우선 표시
} as const;
export type enDisplayOrder = UnionEnum<typeof enDisplayOrder>;

export const enDataType = {
    nchar : "nchar",
    nvarchar : "nvarchar",
    number : "number",
    date : "date",
    calc : "calc"
} as const;
export type enDataType = UnionEnum<typeof enDataType>;

export const enGroupFunc = {
    None : "None",
    Sum  : "Sum",
    Avg  : "Avg",
    Count : "Count",
    Max : "Max",
    Min : "Min"
} as const;
export type enGroupFunc = UnionEnum<typeof enGroupFunc>;

export const enRollUpType = {
    None : "None",
    Before  : "Before",
    After  : "After",
    Both : "Both"    
} as const;
export type enRollUpType = UnionEnum<typeof enRollUpType>;

export const enMetaItemType = {
    Folder : "Folder",                    // item folder
    Field : "Field",
    CalcField : "CalcField",              // 계산필드
    filterOperator : "filterOperator",    // and, or
    calculatedTable : "calculatedTable",   
    invalidate : "invalidate",            // 제거된 item
    mergedField : "mergedField",          // 병합 된 item (meta merge 에 사용)
    sqlHintField : "sqlHintField",        // sql hint 에 사용되는 field
    function : "function",                // (function)  
    Omitted : "Omitted",                  // 생략된 필드 (사용자 정의 member에서 사용), ysh
    variable : "variable" ,               // 변수 목록
    TableCriteria : "TableCriteria"  
} as const;
export type enMetaItemType = UnionEnum<typeof enMetaItemType>;

export const enFieldCategory = {
    Dimension : "Dimension",
    Measure : "Measure",
    Period : "Period",
    Attribute : "Attribute",
    HierarchyGroup : "HierarchyGroup",
    Member : "Member",
    Variable : "Variable"
} as const;
export type enFieldCategory = UnionEnum<typeof enFieldCategory>;

export const enSummaryType = {
    None : "None",
    Sum : "Sum",
    Avg : "Avg",
    Count : "Count",    
    Average : "Average",
    Max : "Max",
    Min : "Min",
    DistinctCount : "DistinctCount",
    FirstPeriod : "FirstPeriod",
    LastPeriod : "LastPeriod",
    DistinctCountAfter : "DistinctCountAfter"
} as const;
export type enSummaryType = UnionEnum<typeof enSummaryType>;

export const enAfterRollUpType = {
    None : "None",
    Sum : "Sum",
    Count : "Count",
    Avg : "Avg",
    Average : "Average",
    Max : "Max",
    Min : "Min",
    DistinctCount : "DistinctCount",
    FirstPeriod : "FirstPeriod",
    LastPeriod : "LastPeriod",
    DistinctCountAfter : "DistinctCountAfter"
} as const;
export type enAfterRollUpType = UnionEnum<typeof enAfterRollUpType>;

export const enMetaSQLOperatorType = {
    opEqual:  "=",
    opLessthen: "<",
    opGreaterthen: ">",
    opLessEqual: "<=",
    opGreaterEqual: ">=",
    opNot: "<>",
    opLike: "LIKE",
    opNotLike: "NOT LIKE",
    opIn: "IN", 
    opNotIn: "NOT IN", 
    opIsNull: "IS NULL", 
    opIsNotNull: "IS NOT NULL", 
    opBetween: "BETWEEN", 
    opAnd: "AND",
    opOr: "OR",
    opNotBetween: "NOT BETWEEN"
} as const;
export type enMetaSQLOperatorType = UnionEnum<typeof enMetaSQLOperatorType>;

export const enMetaGroupByType = {
    opAverage:  "Average",
    opSum: "Sum",
    opCount: "Count",
    opMax: "Max",
    opMin: "Min"
} as const;
export type enMetaGroupByType = UnionEnum<typeof enMetaGroupByType>;

export const enMetaArithmeticOperatorType = {
    opPlus:  "+",
    opMinus: "-",
    opAverage: "/",
    opMultiplication: "*",
    opParenthesis: "()"
} as const;
export type enMetaArithmeticOperatorType = UnionEnum<typeof enMetaArithmeticOperatorType>;


export const enMetaDesignerSplitterType = {
    column: 'Column',
    row: 'Row'
} as const;
export type enMetaDesignerSplitterType = UnionEnum<typeof enMetaDesignerSplitterType>;

export const enMetaDesignerCodeMirrorType = {
    sql: 'sql',
    javascript: 'javascript'
} as const;
export type enMetaDesignerCodeMirrorType = UnionEnum<typeof enMetaDesignerCodeMirrorType>;

export const enMetaReportExtType = {
    MTM: ".mtm", // old
    MTMZ: ".mtmz", // old zip
    MTJ: ".mtj", // new
    XLSX: ".xlsx"   // file to DB 저장
} as const;
export type enMetaReportExtType = UnionEnum<typeof enMetaReportExtType>;

export const enMetaOptionType = {
    autoCreateTable: 'META_AUTO_CREATE_TABLE',
    autoCreateLink: 'META_AUTO_CREATE_LINK'//,
    //caseConversion: 'META_CASE_CONVERSION'
} as const;
export type enMetaOptionType = UnionEnum<typeof enMetaOptionType>;

export const enMetaJoinOperatorType = {
    opEqual:  "=",
    opLessthen: "<",
    opGreaterthen: ">",
    opLessEqual: "<=",
    opGreaterEqual: ">=",
    opNot: "<>",
    opSQL: "SQL"
} as const;
export type enMetaJoinOperatorType = UnionEnum<typeof enMetaJoinOperatorType>;


export const enMetaDiagramSelectableType = {
    report: "REPORT",
    table: "TABLE",
    field: "FIELD",
    join: "JOIN"
};
export type enMetaDiagramSelectableType = UnionEnum<typeof enMetaDiagramSelectableType>;

export const enDiagramFieldType = {
    None: "None",
    CalcField: "CalcField",
    Field: "Field"    
};
export type enDiagramFieldType = UnionEnum<typeof enDiagramFieldType>;

export const enQueryBuilderOptionType = {
    DoubleQuotationType: "DOUBLE_QUOTATION_TYPE",
    ColumnaAliasType: 'COLUMN_ALIAS_TYPE',
    MaxAliasSize: 'MAX_ALIAS_SIZE',
    DisplaySchemaYn: 'DISPLAY_SCHEMA_YN',
    AutoCreateLink: 'AUTO_CREATE_LINK',
} as const;
export type enQueryBuilderOptionType = UnionEnum<typeof enQueryBuilderOptionType>;

export const enDoubleQuotationType = {
    None: "0",
    All: "1",
    OnlyAlias: "2",
} as const;
export type enDoubleQuotationType = UnionEnum<typeof enDoubleQuotationType>;

export const enColumnaAliasType = {
    None: "0",
    Name: "1",
    Description: "2"
} as const;
export type enColumnaAliasType = UnionEnum<typeof enColumnaAliasType>;


export const enDiagramReportType = {
    MetaDiagram : "MetaDiagram",
    WorkFlow : "WorkFlow",
    QueryBuilder : "QueryBuilder"
  //, Slicer = "Slicer" //임시
  } as const;
  export type enDiagramReportType = UnionEnum<typeof enDiagramReportType>;
  
// export const enMetaInvalidType = {
//     DiagramFormulaError : "Diagram formula error",
//     FieldFormulaError: "Field formula error",
//     DiagramFieldNotFound: "Diagram field not found",    
// };
// export type enMetaInvalidType = UnionEnum<typeof enMetaInvalidType>;
