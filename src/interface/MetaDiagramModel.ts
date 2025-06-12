import { IDiagramModel } from "./IDiagramModel";
import { ISelectable } from "./ISelectable";
import { IDiagramView } from "./IDiagramView";
import {   IBrush, IDisposable, IDrawing, IHitTestResult, IKeyboadEventArgs, IMouseEventArgs, IPoint, IRectangle, ISize, IStyle, ImageSource } from "./interface";
import { FontStyle, LinearGradientBrush, RECT, SolidColorBrush, Style } from "./Drawing";
import { FieldCheckedArgs, FieldModel, IConnectorHitInfo, IMetaDiagramModel, ISelectFieldModel, JoinModel, SelectionChangeArgs, DoubleClickArgs, TableModel } from "./IMetaDiagramModel";
//import { enJoinType, enDataType, enDisplayOrder } from  "@enum/MetaDesignerEnum"; //vite 에서 alias 인식 못함.
import {  enJoinType, enDataType, enDisplayOrder, enMetaType, enMetaJoinOperatorType, enMetaDiagramSelectableType, enDiagramReportType  } from "./MetaDesignerEnum";
 
type imageRepositoryType = {
    [key: string] : {
        Image: HTMLImageElement | null,
        Base64: string
    }
};

type styledefineKeyType = "Table" | "View" | "Synonym" | "MaterializedView" | "ExtendTable" | "SELECTED" | "NORMAL";
type styledefineType = {
    [key in styledefineKeyType]: {
        Header?: SolidColorBrush;
        Border?: SolidColorBrush;
        Select?: SolidColorBrush;
        ImageSource?: any; //imageRepositoryType,
        LineBrush?: SolidColorBrush;
        LineDash?: Array<number>;
        Background?: string;
    };
};

export interface MetaDiagramModel extends IDiagramModel{

    FOLDER_BUTTON : object;
    DISPLAY_TYPE_BUTTON : object;

    mMiniMapRect : IRectangle|undefined; //mini map Rect
    mMiniMapViewPortRect : IRectangle|undefined; //mini map view port rect
    mMiniMapSizeRate : ISize | undefined;
    mUseMiniMap : boolean; //맵 사용 여부
    mView : IDiagramView;
    mDrawingIndex : number;
    COLUMN_HEIGHT :number;
    mSelectedColumns : Array<FieldModel>; //선택된 필드목록
    mFilterdList : Array<any>; //검색으로 찾은 필드 또는 테이블 목록
    mDrawedConnections : Array<IConnectorHitInfo>;//Connection List
    mSelectedJoin  : Array<JoinModel>; //선택된 Joins (drawing 시)
    mAutoJoin : boolean; //자동 PK JOIN
    mReportMode : enDiagramReportType | undefined; // 어떤 프로그램에서 호출된건지 확인 2024-05-22 김진건

    mDocumentSize : ISize;
    /**
     * * <SCTIPT 노출용>
     * 필드 선택이 변경된 시점에 발생합니다.
     */
    OnFieldCheckStatusChanged : (args:FieldCheckedArgs)=>void;
    /**
     * 선택 항목 변경 시 발생합니다.
     */
    OnSelectionChanged : (args:SelectionChangeArgs)=>void;
    /**
     * 선택 항목 Double Click 시 발생합니다.
     */
    OnDoubleClick : (args:DoubleClickArgs)=>void;    
    /**
     *  문서의 저장 상태가 변경되면 발생합니다.
     */
    OnModifiedChange :(isModify:boolean) => void;
    /**
     * * <SCTIPT 노출용>
     * 특정 항목 선택 이벤트 (테이블, 필드, 링크 등)
     */
    OnControlClick : (type:enMetaDiagramSelectableType,args:any)=>void;
    NotifyOnControlClick(type:enMetaDiagramSelectableType, control:any):void;
    DocumentSize(): ISize;

     /**
     * * <SCTIPT 노출용>
     * JOIN 시 P.K로 되어져 있는 항목 자동으로 JOIN 하기
     */
     setAutoJoin(value:boolean):void;
     getAutoJoin():boolean;

     /**
      * 2024-05-22 김진건
      * 테이블 복사 시, MetaDesigner와 QueryBuilder에서 컬럼들의 체크가 그대로 복사할 지에 대한 여부를 결정하는 요소
      */
     setReportMode(value:enDiagramReportType):void;
     getReportMode():enDiagramReportType | undefined;

    /**
     * * <SCTIPT 노출용>
     * MINI MAP 사용 여부
     * @returns 
     */
    getUseMiniMap():boolean;
    /** 
     * * <SCTIPT 노출용>
     * MINI MAP 사용 여부
     * @param value 
     */
    setUseMiniMap(value:boolean):void;

    /**
     * 문서 편집이 가능한 버전인가?
     * @returns 
     */
    getEditable():boolean;
    mIsModified:boolean;
    set IsModified(value:boolean);
    get IsModified():boolean;
  
    Diagram:IMetaDiagramModel;

    /** 
     * * <SCTIPT 노출용>
     * 문서 내용 반환
     * @returns 
     */
    Serialize(): any;
    serializeTable(table : TableModel):TableModel
    serializeColumn(column:FieldModel, table:TableModel):FieldModel;
    serializeJoin(join:JoinModel) : JoinModel;
    
    /**
     * 모델에서 저장 시 AUD 보고서로 저장 할지 여부
     */
    SupportSerialize():boolean;

    /** 
     * * <SCTIPT 노출용>
     * 문서 열기
     * @param model 
     */
    DeSerialize(model: any): void;
    /**
     * * <SCTIPT 노출용> 
     * Drawing을 위한 계산 하기
     */
    Calculate(lockSelect?:boolean):void;

    tableToSelectable(table:TableModel):ISelectable;
    joinToSelectable(join:JoinModel):ISelectable;
    disposeTableModel(table:TableModel):void;
    disposeJoinModel(join:JoinModel):void;

    /**
     * Selecte Columns
     * @param col 
     */
    selectColumn(col:FieldModel|undefined, clear:boolean):boolean;
    /**
     * * <SCTIPT 노출용> 
     * 모든 항목 삭제
     */
    Clear(): void;
   /**
     * 상위 컨트롤 스타일 승계
     * @param styles 
     */
   UpdateStyle(styles:CSSStyleDeclaration):void;

    
    /**
     * * <SCTIPT 노출용> 
     * 모델 변경에 따른 뷰 사이즈를 계산 합니다.
     * @param viewRect 
     */
    Update(avaliableArea:IRectangle): void;
 

    /**
     * * <SCTIPT 노출용>
     * MINI MAP 사용 여부
     * 자원 해제
     */
    Dispose():void;


    //------------------- SELECTION 관련 
    
    /**
     * 컨트롤 삭제
     * @param ctl 
     * @returns 
     */
    Delete(controls:Array<ISelectable>):boolean;
    
    getControl(id: string): ISelectable|undefined;
 

    findRect(rect:IRectangle):IRectangle|undefined;
    avoidOverlapRect(control:ISelectable):void;
    /**
     * 모델로 컨트롤을 생성합니다.
     * 아이디는 unique 하게 부여 해야 합니다.
     * @param model 
     */
    addControl(model:any):ISelectable|undefined;

    /**
     * 컨트롤 복원
     * 삭제되었던 컨트롤 복원
     * @param model 
     * @returns 
     */
    Restore(models:Array<any>):Array<ISelectable>;
    restoreAction(model:any):ISelectable|undefined;

    /**
     * 셀렉션에서 전달되는 정보로 컨트롤의 동작 상태를 반환
     * @param pt 
     * @returns 
     */
    HitTest(ctl:ISelectable, pt?: IPoint): IHitTestResult | undefined;
    /**
     * Click, DoubleClick등 이벤트 처리
     * @param ctl 
     * @param offsetPt  
     * @returns 
     */
    HitTestEvent(ctl:ISelectable, pt: IPoint, evt:IMouseEventArgs): IHitTestResult | undefined;
    /**
     * Selection pannel에서 삭제/복원
     * @param ctl 
     * @returns 
     */
    SerializeSelectable(ctl: ISelectable) : any;
    /**
     * Selection pannel에서 삭제/복원
     * @param ctl 
     * @param model 
     */
    DeSerializeSelectable(ctl: ISelectable, model: any): void;
    forEachSelectable(callbackfn: (control: ISelectable) => void, rect?:IRectangle): void;

    _mouseDownPoint ?: IPoint;
    _mouseDownField ?: ISelectFieldModel;
    _mouseDownJoin ?: IConnectorHitInfo;
    _mouseOverJoin ?: IConnectorHitInfo;
    _miniMapDrag   ?: boolean;
    _mouseDownOffset ?: IPoint;
    /**
     * Mouse Down
     * @param pt 
     * @param args 
     * @returns 
     */
    MouseDown(pt:IPoint , args: IMouseEventArgs):boolean;

    MouseMove(pt:IPoint , args: IMouseEventArgs):boolean;
    MouseUp(pt:IPoint , args: IMouseEventArgs):boolean;


    KeyDown(args:IKeyboadEventArgs):boolean;
    KeyUp(args:IKeyboadEventArgs):boolean;
    /**
     * Join 마우스 over point
     * @param pt  
     * @returns 
     */
    findMousePointJoin(pt:IPoint) : IConnectorHitInfo | undefined;
     
    /**
     * 마우스에 위치한 필드 찾기
     * @param pt 
     * @returns 
     */
    findMousePointField(pt:IPoint):ISelectFieldModel|undefined;

    /********************* Drawing Methods *****************************/
    mStyle        : IStyle; //기본 스타일
    
    IMAGE_REPOSITORY : object; 
    //선색 AAAAAC
    
    STYLE_DEFINE: object;
    initStyles():void;
    selectedStyle(isSelected:boolean):void;

    /**
     * MiniMap 출력
     * @param view 
     * @param avaliableArea 
     * @returns 
     */
    drawMiniMap(avaliableArea:IRectangle):void;
    /**
     * 테이블 객체 출력
     * @param table 
     */
    drawTable(avaliableArea:IRectangle, table:TableModel):void;
    /**
     * Column 정보를 Drawing 합니다.
     * @param view 
     * @param table 
     * @param fld 
     * @param rect 
     * @param selected 
     */
    drawColumn(table:TableModel, fld:FieldModel, rect:IRectangle, ghost?:boolean):void;
    /**
     * 연결선 그리기
     * @param view 
     * @param avaliableArea 
     * @param table 
     * @returns 
     */
    drawJoin(avaliableArea:IRectangle, table:TableModel, selectedOnly:boolean):void;
    /**
     * 실제 JOIN을 drawing 한다.
     * @param join 
     * @param virticalLines 
     * @returns 
     */
    drawConnectionPath(join:JoinModel, virticalLines:any);

    ////////////////// UTILITY ////////////////////////
    /**
     * * <SCTIPT 노출용>
     * 특정 검색어로 항목을 찾는다.
     * @param code 
     * @returns 
     */
    Filter(text:string):IRectangle|undefined;
    /**
     * * <SCTIPT 노출용>
     * 특정 항목을 탐색하고 위치로 이동한다.
     * @param code 
     * @param delay 
     */
    FindAndFocus(text:string,  delay?:number):void;

    /**
     * * <SCTIPT 노출용>
     * 전체 확장
     */
    ExpandAll():void;
    /**
     * * <SCTIPT 노출용>
     * 전체 확장
     */
    CollapsedAll():void;
    
    /**
     * * <SCTIPT 노출용>
     * 선택된 테이블 목록의 Join이 연결된 컬럼들을 선택합니다.
     * @param tables 
     */
    // public SelectLinkedColumns(tables:Array<TableModel>):void{        
    //     let selectControl = this.mView.getSelection();
    //     if(tables && tables.length > 0){
    //         tables.forEach((table:TableModel)=>{
    //             if(table.Joins){
    //                 table.Joins.forEach((join:JoinModel)=>{
    //                     selectControl.addControl(join as any as ISelectable);
    //                 });
    //             }
    //         });
    //     }
    //     this.mView.Update();
    // }
    /**
     *  Join 하기
     * @param fromTable 
     * @param fromField 
     * @param toTable 
     * @param toField  
     */
    addJoinCheck(fromTable:string, fromField:string, toTable: string, toField:string): JoinModel | undefined;

    checkJoined(T1:TableModel, fromTable:string, toTable:string, toField:string): boolean;

    checkFieldPK(T:TableModel, fieldCode:string): boolean;

    JoinColumnWithAutoJoin(T1:TableModel, T2:TableModel, fromTable:string, fromField:string, toTable:string, toField:string): JoinModel | undefined;

    /**
     * <SCTIPT 노출용>
     * Join 생성하기
     * @param fromTable 
     * @param fromField 
     * @param toTable 
     * @param toField 
     * @param joinType 
     * @param operator
     * @param sql
     * @returns 
     */
    addJoin(fromTable:string, fromField:string, toTable: string, toField:string, joinType?:enJoinType, operator?:enMetaJoinOperatorType, sql?: string):JoinModel|undefined;

    /**
     * Join type를 일괄 수정 합니다.
     * @param join 
     */
    updateJoinType(join:JoinModel):void;

    /**
     * * <SCTIPT 노출용>
     * 테이블 목록 반환
     */
    getTables():Array<TableModel>;
    /**
     * * <SCTIPT 노출용>
     * 조인 목록 반환
     * @returns 
     */
    getJoins():Array<JoinModel>;
    /**
     * * <SCTIPT 노출용>
     * 특정 테이블 반환
     * @param code 
     * @returns 
     */
    getTable(code:string):TableModel|null;
    /**
     * 특정 코드의 컬럼을 찾습니다.
     * @param code 
     * @returns 
     */
    getColumn(code:string):FieldModel | null;
    
    /**
     * 다중 컬럼 선택 해제하기
     * @param columns 
     */
    UncheckColumns(columns:Array<string>):void;


    /**
     * 테이블을 추가한다.
     * 테이블의 코드는 중복되면 안된다.
     * @param table 
     */
    addTable(table:TableModel):TableModel|null;
    /**
     * * <SCTIPT 노출용>
     * 특정 jOIN 반환
     * @param code 
     * @returns 
     */
    getJoin(code:string):JoinModel|null;
    // public forceDirect():void{
    //     let nodes = [];
    //     let links = [];
    //     let size : ISize = {Width:this.mView.Width,Height:this.mView.Height};
    //     this.Diagram.Tables.forEach((table:TableModel)=>{
    //         nodes.push({"id":table.Code, "Table":table});
    //     });
    //     let keys = {};
    //     this.Diagram.Joins.forEach((join:JoinModel)=>{
    //         let code1 = join.FromTableCode + "-" + join.ToTableCode;
    //         let code2 = join.ToTableCode + "-" + join.FromTableCode;
    //         if(!keys.hasOwnProperty(code1) &&  !keys.hasOwnProperty(code2)){
    //             links.push({"source": join.FromTableCode, "target": join.ToTableCode});
    //             keys[code1] = 0;
    //             keys[code2] = 0;
    //         }            
    //     });
    //     d3.forceSimulation(nodes)
    //         .force('charge', d3.forceManyBody().strength(-100))
    //         //.force('center', d3.forceCenter(size.Width / 2, size.Height / 2))
    //         .force('link', d3.forceLink().links(links).id(d=>d["id"]))
    //         .force('collision', d3.forceCollide().radius(d=> Math.max(d["Table"].Width, d["Table"].Height)/2 ));
        
    //     let pos : IPoint = {X:size.Width, Y:size.Height};
    //     nodes.forEach(nd=>{            
    //         nd.Table.Left = (size.Width + (size.Width * (nd.x/100))) + nd.Table.Width;
    //         nd.Table.Top  = (size.Height + (size.Height * (nd.y/100))) + nd.Table.Height;
    //         //nd.Table.Collapsed = true;
    //         pos.X = Math.min(pos.X, nd.Table.Left);
    //         pos.Y = Math.min(pos.Y, nd.Table.Top);
    //     });
    //     nodes.forEach(nd=>{            
    //         nd.Table.Left -=  pos.X;
    //         nd.Table.Top  -= pos.Y;
    //     });
    //     this.Calculate();
    //     this.mView.Update();
         
    // } 

}