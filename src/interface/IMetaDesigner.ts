import {
    enGroupFunc,
    enMetaType,
    enDataType,
    enJoinType,
    enRollUpType,
    enMetaItemType,
    enFieldCategory,
    enSummaryType,
    enAfterRollUpType,
    enMetaJoinOperatorType,
    enDoubleQuotationType,
    enColumnaAliasType
} from "./MetaDesignerEnum"

export interface IMetaDesigner {
    MetaDocumentInfo : MetaDocumentInfoModel;
    MetaConnectionInfo : MetaConnectionInfoModel;
    Diagram : DiagramModel;
    MetaItem : MetaItemModel;
    FilterSQL : string;
}

export interface MetaDocumentInfoModel {
    Version : string;
    Key : string;
    Name : string;
    EnableJoinLoop : boolean;    // true, false
    Path : string;
    Description : string;
    WriteDate : string;
}

export interface MetaConnectionInfoModel {
    Key : string;
    Name : string;
    Description : string;
    SID : string;
}

export interface DiagramModel {
    Tables : Array<DiagramTableModel>;
    Joins : Array<DiagramJoinModel>;
}

export interface DiagramTableModel {
    Code : string;
    Name : string;
    Description : string;
    PhysicalCode : string;
    MetaType : enMetaType;          // default : Table
    Owner : string;
    Criteria ?: string;
    Left : number;
    Top : number;
    Width : number;
    Height : number;
    // Checked : boolean;              // default : false   2024-02-07 사용 안하는 속성 삭제 with 박성열
    Collapsed : boolean;            // default : false
    DisplayOrder : string;          // default : dispName
    AliasCustom ?: string;
    IsCopy : boolean;               // default : false
    DrivingWeight : number;         // default : 0
    SourceTableCode ?: string;     // 복사 일 경우 원본 코드
    Columns : Array<DiagramFieldModel>;
}

export interface DiagramJoinModel {
    Code : string;
    FromTableCode : string;
    FromFieldCode : string;
    ToTableCode : string;
    ToFieldCode : string;
    Operator : enMetaJoinOperatorType;          // default : = (=, >, =>, <, <=, <>, SQL)
    JoinType : enJoinType;
    SQL ?: string;
    JoinWeight : number;        // default : 0
}

export interface DiagramFieldModel {
    Code : string;
    Name : string;
    ParentCode : string;
    Description : string;
    PhysicalCode : string;
    MetaType : enMetaType;       // default : Table
    Position : number;           // 1부터 순서대로 2,3,4...
    KeyPosition : number;        // default : 0
    DataType : enDataType;
    Checked : boolean;           // default : true
    DataTypeDesc ?: string;
    // GroupFunction : enGroupFunc; // default : Count  사용 안함
    Formula ?: string;    
}

export interface MetaItemModel {
    Fields : Array<MetaItemFieldModel>;
}

export interface MetaItemFieldModel {
    //Type : string;                  // default : MetaFieldItem
    Id : string;
    Name : string;
    DataType : enDataType;          // default : None
    ParentID : string;
    // FormulaDisplay : string;     // N/A 저장된 문서에 보이지 않음.
    Formula : string;
    RollUpType : enRollUpType;
    FieldType : enMetaItemType;     // default : Field
    DiagramFieldType : string;      // None
    IsGroupChild : boolean;         // default : false
    Category : enFieldCategory;
    LabelField: string;
    SortField: string;
    Description : string;
    SummaryType : enSummaryType;    // default : Count
    // GroupOrder : number;            // default : 0     Viewer에서도 parsing은 하는데 안씀. 안쓰기로 함 2024-02-06 with 박성열
    ToolTip: string;
    AfterRollUpType : enAfterRollUpType;    // default : None
    BaseSummaryField ?: string;
    //PeriodRollUpType ?: enAfterRollUpType;  // Viewer에서도 parsing은 하는데 안씀. 안쓰기로 함 2024-02-06 with 박성열
    PeriodConvertCommand ?: string;
    PeriodConvertCommand2 ?: string;
    FilterMask ?: string;
    DataMaskRule: string;
    LOV_SQL: string;
    LanguageCode: string;
    DefaultFormat ?: string;
    TableName : string;
    Encryped : boolean;             // default : false
    Hidden : boolean;               // default : false    
    LOVDisabled : boolean;          // default : false
    RelationFields : Array<MetaItemRelationFieldModel>;
}


export interface MetaItemRelationFieldModel {
    Id : string;
    Name : string;
}

export interface DiagramInFieldModel {
    Code : string;
    Name : string;
    ParentCode : string;
    Description : string;
    Position : number;           // 1부터 순서대로 2,3,4...
    KeyPosition : number;        // default : 0
    DataType : enDataType;
    TypeNo: number;
    Formula ?: string;    
}

export interface QueryBuilderDocumentModel {
    DiagramInfo?: IMetaDesigner;
    MetaViewLayout: string;
    SQLText: string;
    ConnectionKey: string;
    Diagram: string;
    DSCode: string;
}

export interface IQueryBuilderOption {
    doubleQuotationType: enDoubleQuotationType,
    columnAliasType: enColumnaAliasType,
    maxAliasSize: number,
    displaySchemaYn: boolean | string,    // "Y", "N"
    autocreateLink: boolean | string,    // "Y", "N"
}
