import { enDataType, enDisplayOrder, enGroupFunc, enJoinType, enMetaJoinOperatorType, enMetaType } from "./MetaDesignerEnum";
import { IPoint, IRectangle } from "./interface";
import { DiagramFieldModel, DiagramJoinModel, DiagramModel, DiagramTableModel } from "./IMetaDesigner";

/**
 * 필드 선택 이벤트
 */
export interface FieldCheckedArgs{
    Fields : Array<FieldModel>,
    TableName? : string    // check 해제 시에는 필요 없음, i-META항목에는 TableName이 있음.
}
export interface SelectionChangeArgs{
    Tables : Array<TableModel>;
}

export interface ISelectFieldModel{
    Table:TableModel;
    Field?:FieldModel;
}

export interface DoubleClickArgs{
    Field : FieldModel;
}

export interface IConnectorHitInfo{
     Points:Array<IPoint>
    ,JOIN:JoinModel|undefined
}
/**
 * join 데이터
 */
export interface JoinModel extends DiagramJoinModel{
    // Code: string;
    // FromTableCode : string;
    // FromFieldCode : string;
    // ToTableCode   : string;
    // ToFieldCode   : string;
    // Operator      : enMetaJoinOperatorType;
    // JoinType      : enJoinType;
    // SQL?           : string;
    // JoinWeight    : number;

    /// 디자인 TIME에 동적으로 등록되는 모델
    ClassName ?: string; // "Join" or "Table"
    FromTable ?: TableModel;
    ToTable   ?: TableModel;
    FromColumn ?:FieldModel;
    ToColumn  ?:FieldModel;
    drawingNo  ?: number; // drawing no
    IsSelected ?:boolean; //선택되었는지 여부

}
 
export interface  FieldModel extends DiagramFieldModel{
    //Code : string;
    //Name : string;
    //Description : string;
    //PhysicalCode : string;
    //Position  : number;
    //KeyPosition : number;
    //DataType : enDataType;
    //Checked: boolean;   
    //GroupFunction :  enGroupFunc;
    /// 디자인 TIME에 동적으로 등록되는 모델
    DrawedRect ?: IRectangle; //화면 내 그려진 절대 위치
    SelectRect ?: IRectangle;//필드 자체 선택 영역
    IsSelected ?:boolean; //선택되었는지 여부
    HasLink   ?:boolean;//링크가 존재하는지 여부
    drawingNo  ?: number; // drawing no
    
}
export interface TableModel extends DiagramTableModel {
    //Code : string;
    //Name : string;
    //Description : string;
    //PhysicalCode : string;
    //MetaType    : enMetaType;//"Table","View", "Synonym", "MaterializedView", "MView"
    //Owner       : string;
    //Criteria    : string;

    //
    //SourceTableCode ?: string;
    

    // Left  : number;
    // Top   : number;
    // Width  : number;
    // Height  : number;

    // Checked: boolean;  

    // Collapsed : boolean;

    // DisplayOrder :  enDisplayOrder;
    // AliasCustom  : string;
    // IsCopy       : boolean;
    // DrivingWeight : number;
    // Columns  : Array<FieldModel>;
    
    /// 디자인 TIME에 동적으로 등록되는 모델
    ClassName ?: string; // "Join" or "Table"
    Joins ?: JoinModel[];// JOIN 객체 동적으로 mapping
    COLUMN_KEY ?: any;  //컬럼 키 목록 {[key: string]: FieldModel} 
    drawingNo  ?: number; // drawing no
    CheckdType ?: number; //선택된 타입 (Unchecked = 0, Checked = 1, Mixed = 2)
    
}

export interface IMetaDiagramModel extends DiagramModel{
    //Tables : Array<TableModel>;
    //Joins : Array<JoinModel>;

    ///디자인 TIME에 동적으로 등록되는 모델
    //table과 Join에 대한 빠른 access를 위해 key를 관리한다.
    TABLE_KEYS : {[key: string]: TableModel};
    JOIN_KEYS  : {[key: string]: JoinModel};
}
