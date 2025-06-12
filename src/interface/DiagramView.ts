
import { SelectionController } from "./SelectionController";
import { IClipBoardPaste,  IDisposable,  IDrawing, IHitTestResult, IKeyboadEventArgs, IMouseEventArgs, IPoint, IRectangle,  ISize } from "./interface";

import {  IDiagramView as IDiagramView } from "./IDiagramView";
import { IDiagramModel } from "./IDiagramModel";
import { ISelectable } from "./ISelectable";  

 
export interface DiagramView extends IDiagramView, IDisposable{
     
    constructor();

    Element:HTMLElement; //생성되는 root
    ScrollView:HTMLElement; //Scroll View
    
    ViewPortElement:HTMLElement; //view port div
    Canvas: HTMLCanvasElement;            /* 기본 drawing    */  
    FTextBox : HTMLTextAreaElement;
    mDocument : IDiagramModel;
    mRect : IRectangle; //컨트롤의 사이즈
    zIndex : string;
    visible : boolean;
    enable : boolean;

    Selection : SelectionController;

    DrawingPannel : IDrawing; 
    OffsetTop : number;
    OffsetLeft : number;
    //public OffsetSize : ISize | undefined; 

    // private _mouseDownElement : IHitTestObject; //마우스 클릭한 항목
    // private _mouseOverElement : IHitTestObject; //마우스 Over 항목
    //private _beforeDocumentSize : ISize | undefined = undefined; //이전 문서 사이즈
 
    /**
     * Diagram이 활성화 되어져 있는지 여부
     * AUD에서 Enable 상태를 던져 준다.
     */
    OnDiagramStatusCheck : any;
    _OnDiagramStatusCheck():void;
	
    OnShowContextMenu : (event:any, Control:any|undefined)=>void; /*Context menu event*/

    get Document():IDiagramModel;
    set Document(model:IDiagramModel); 
        
    get Left():number;
    set Left(value:number);
     
    get Top():number;
    set Top(value:number);

    get Width():number;
    set Width(value:number);
     
    get Height():number;
    set Height(value:number);
    get ZIndex():string;
    set ZIndex(value:string);

    get Visible():boolean;
    set Visible(value:boolean);
    
    get Enable():boolean;
    set Enable(value:boolean);
    getSelection():SelectionController;
 
    setClipBoardText(value:string):void;
    
    ClipBoardReadText(selector:IClipBoardPaste):boolean;
    
    /**
     * 실제 뷰를 생성한다.
     *  부모 노드를 가져온다.
     * @param div 
     */
    Create(div: HTMLElement): void;
    
    /**
     * 부모 컨트롤의 폰트 속성을 받기 위함.
     * @param parentEle 
     */
    UpdateStyle(parentEle:HTMLElement) :void;
    /**
     * 이벤트 핸들링
     */
    onmousemove : any;
    onmouseup  : any;
    eventHandlers():void;
    Calculate():void;
    /**
     * 부모의 사이즈가 변경되면 resize 한다.
     */
    Update(reset?:boolean):void;
    /**
     * 화면에 그려야 하는 유효 영역 반환
     * @returns 
     */
    getUpdateRect():IRectangle;
    
    /**
     * 컨트롤 사이즈 변경 시 호출 
     */
    Resize():void;
 
    /**
     * 메모리 소거
     */
    Dispose();
    Paste(text:string):void;

    DeleteControls(controls: Array<ISelectable>): boolean;

    addControlForSelection(model: Array<ISelectable>):  Array<ISelectable>;
    DeleteControlsForSelection(controls:  Array<ISelectable>): boolean;
    /**
     * 스타일 반환
     * @param name 
     */
    // public getStyle(name:string):IStyle | undefined{
    //     return StyleManager.getStyle(name);
    // }
    // /**
    //  * 스타일 추가
    //  * @param style 
    //  */
    // public addStyle(style:IStyle):IStyle{
    //     return StyleManager.addStyle(style as Style) as IStyle;
    // }

    /**
     *  스타일을 생성하고 생성한 스타일을 등록합니다.
     * @param name 
     */     
    // public createStyle(name:string, line?:string, fill?:string):IStyle{
    //     let style =  StyleManager.getStyle(name);
    //     if(style){
    //         return style;
    //     }else{
    //         return StyleManager.createStyle(name, line, fill) as IStyle;
    //     }
    // }
    /**
     * 문서 설정하기
     * @param model 
     */
    DeSerialize(model:any):void;
    Serialize():any;
    /**
     * 특정 위치로 스크롤 이동하기
     * @param pos 
     * @param time 
     */
    ScrollInTo(pos: IPoint, time?: number): void;

    getBase64Image(): string ;

    Focus(pt?:IPoint):void;
    
    /**
     * 해당 마우스 이벤트의 동작이 현재 컨트롤에서 발생하는지 점검합니다.
     * @param event 
     */
    checkMouseEventTarget(event : IMouseEventArgs):boolean;
}
   