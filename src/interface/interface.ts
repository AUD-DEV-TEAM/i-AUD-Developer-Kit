import { enHorizonAlign, enVerticalAlign } from "./enums";
 
import { ISelectable } from "./ISelectable";  

 

export interface IKeyBoardEvent{
    Handled:boolean;
    code: string;
    key: string;      
    which: number;
    // MouseEvent, KeyboardEvent, TouchEvent
    altKey: boolean;
    ctrlKey: boolean;
}
 

 


/**
 * 텍스트 Drawing영역 정보
 */
 export interface IMeasureText{
    Text  : string;  //실제 Drawing 된 텍스트
    Cut   : boolean; //잘림 여부
    Width : number; //실제 길이 
}
/**
 * 사각형
 */
export interface IRectangle{
    Left : number;
    Top : number;
    Width : number;
    Height: number;
}
export interface ISize {
    Width: number;
    Height: number;
}
export interface IPoint {
    X: number;
    Y: number;
}
export interface ITextMeasure{
    Text : string;
    Trim : boolean;
}

export interface IMagnetPointer extends IPoint{
    Left : number;
    Top  : number;
}

export interface IMouseEventArgs{
   
    InControl : boolean; //뷰어(컨틀롤) 내에서 발새하는 이벤트 인가?
                         // mousemove, mouseup은 document의 이벤트를 캡처 합니다.
    //Handled:boolean;
    // Capture?:boolean; // mouse 동작을 받기 위해 캡처 함
    // Selectable?:boolean;
    // Moveable?:boolean; //컨트롤이 마우스로 이동 가능한지 여부
    point : IPoint;
    rect  ?: IRectangle;

    
    altKey   : boolean;
    ctrlKey  : boolean;
    shiftKey : boolean;
    
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
    offsetX: number;
    offsetY: number;
    preventDefault():void;
    target : HTMLElement;
}

// export interface enHorizonAlign {
//     Left:number;
//     Right:number;
//     Center:number;
// }
// export interface enVerticalAlign {
//     Top :number;
//     Center :number;
//     Bottom :number;
// } 

export interface IKeyboadEventArgs{   
    altKey   : boolean;
    ctrlKey  : boolean;
    shiftKey : boolean;
    code     : string;
    key      : string;
    preventDefault():void;
}

export interface IHitTestResult{
    Control      : ISelectable;
    Selectable  ?: boolean;  // 선택 동작이 있는지 여부
    MoveAble    ?: boolean;  // 위치 이동 가능한지 여부
    OnClick       ?: (args:IMouseEventArgs)=>void;  //Click 이벤트 handler
    OnDoubleClick ?: (args:IMouseEventArgs)=>void;  //double click 
    MouseOver   ?: boolean;  // mouse leave, mouse enter 수용 여부
    Resizable   ?: boolean;  //사이즈 조정 가능 한지 여부
    FixWidth   ?: boolean;  // Width Fix 여부
    FixHeight  ?: boolean;  // Height Fix 여부
    ResizeCursor ?: number;// enResizeType; //resize 모양
    Cursor ?:string;//cursor 모양
}


// export interface IenResizeType{
//     None : number,    
//     Left : number,   
//     Top  : number,
//     Right : number,
//     Bottom : number,
//     LeftTop : number,     
//     RightTop : number,    
//     RightBottom: number,    
//     LeftBottom: number
    
// }

export interface IenSelectionWorkType{
    None: number,    
    Move: number,    
    Resize: number,    
    SelectRect: number
}

export interface IExecuteUndoRedo{    
    /** 실행 
     * 
    */
    Undo() : void;
    /**
     * 실행 취소
     */
    Redo() : void;

    Dispose():void;
} 
export interface IThickness{
    Left:number;
    Top:number;
    Right:number;
    Bottom:number;
}
export interface ICornerRadius{
    TL:number; // Top Left
    TR:number; // Top Right
    BL:number; // Bottom Left
    BR:number; // Bottom Right
}


export interface IDisposable{
    Dispose():void;
}
export interface IBrush extends IDisposable{
    fillStyle(ctl:CanvasRenderingContext2D, rect?:IRectangle) :void;    
    strokeStyle(ctl:CanvasRenderingContext2D, rect?:IRectangle) :void;    
    /**
     * 직렬화
     * @param model 
     */
    // Serialize() : object;
    /**
     *  역직렬화
     * @param model 
     */
   // DeSerialize(model:object): void;

    getColor():string|undefined;
 
} 

export interface IColorStop{
    Point : number;
    Color : string;
}

 
 
export interface IClipBoardPaste{
    executeClipBoardPaste(text:string):void;
}

export interface IDrawing extends IDisposable{
     
    OffsetLeft : number;
    OffsetTop  : number; 
    /**
     * 전체 Clear
     * @returns 
     */
    clear():IDrawing;
    scale(x:number, y:number):IDrawing;
    translate(x:number, y:number):IDrawing;
    drawImage(image:CanvasImageSource, x:number, y:number, w?:number, h?:number):IDrawing;
    drawImageAsync(name: string, url: string, tag: any, callback: IImageLoadEvent): IDrawing;
    drawPath(paths:Array<IPoint>):IDrawing;
    /**
     * draw line
     * @param from 
     * @param to 
     * @returns 
     */
    drawLine(from:IPoint, to:IPoint): IDrawing;
    setOffset(left:number, top:number):IDrawing;


    /**
     * 화살표 그리기
     * @param from 
     * @param to 
     * @param headlen 
     */
    drawArrow(from:IPoint, to:IPoint, headlen:number) : IDrawing;

    /**
     * 화살표 경로 그리기
     * @param points 
     * @param headlen 
     */
    drawArrowPath(points:Array<IPoint>, headlen:number):IDrawing;

    /**
     * shadow 효과
     * @param x 
     * @param y 
     * @param blur 
     * @param color 
     */
    setShadow(x:number,y:number, blur:number, color:string):IDrawing;
    /**
     * 이동
     * @param to 
     * @returns 
     */
    moveTo(to:IPoint): IDrawing;
    lineTo(to:IPoint): IDrawing;
    drawPath(paths:Array<IPoint>):IDrawing; 
    stroke(): IDrawing;
    beginPath(): IDrawing;
    closePath(): IDrawing;
    fill(): IDrawing;
    save():IDrawing;
    restore():IDrawing;
    clearRect(rect:IRectangle): IDrawing;
    fillRect(rect: IRectangle, color?:string|IStyle): IDrawing;
    updateStyle(style ?: IStyle):IDrawing;
    updateFontStyle(style ?: IStyle):IDrawing;
    roundRect(rect:IRectangle, fill:boolean, stroke:boolean, style:IStyle): IDrawing;
    
    addSelectable(ctl:ISelectable):IDrawing;
    getSelectableList():Array<ISelectable>;
    /**
     * 영역내에 있는 항목 점검
     * @param pt 
     * @returns 
     */
    HitTest(pt:IPoint) : IHitTestResult | undefined;
    
    HitTestEvent(pt:IPoint, evt:IMouseEventArgs) : IHitTestResult | undefined;

    HitTestList(pt:IPoint) : Array<IHitTestResult>;
    /**
     * 마우스로 리사이즈 하기위한 위치값을 찾습니다.
     * @param pt 
     * @returns 
     */
    HitTestResizePointer(pt:IPoint) : IHitTestResult | undefined;
    /**
     *  컨트롤 이동 및 사이즈 변경 시 자석처럼 붙는 위치를 찾기 위한 값을 탐색 합니다.
     * @param rect 
     * @param resize 
     * @returns 
     */
    HitTestMagnetPointer(rect:IRectangle, resize:number /*enResizeType*/) : IMagnetPointer;
    
    /**
     * 셀에 맞춥일 경우 텍스트 목록 반환
     * @param text 
     * @param limitWidth 
     * @param align 
     */
    getWrapText(text: string, limitWidth: number, align: enHorizonAlign): Array<string>;

    /**
     * 영역 선택하기
     *   (영역은 복사/붙여 넣기시 순서를 위해 정순으로 검색합니다.)
     * @param rect 
     * @returns 
     */
    HitTestRect(rect:IRectangle) : Array<IHitTestResult>;
    strokeRect(rect: IRectangle, color?:string|IStyle): IDrawing;

    arc(x:number, y:number, radius:number, start : number, end:number) : IDrawing;
    flllCircle(x:number, y:number, radius:number) : IDrawing;
    strokeCircle(x:number, y:number, radius:number) : IDrawing;
    

    
    setFontStyle(size:number, fontName:string, color:string, bold?:boolean, italic?:boolean): IDrawing;
    lineWidth(width:number):IDrawing;
    strokeStyle(color:string):IDrawing;
    fillStyle(color:string):IDrawing;
    setLineDash(dashArray:Array<number>):IDrawing;
    /**
     * 선택 포인트 
     * @param pt 
     * @returns 
     */
    selectPoint(pt:IPoint, size:number): IDrawing;

    drawBorder(rect:IRectangle, style:IStyle): IDrawing;


    getWrapTextHeight(text:string, limitWidth:number, align:enHorizonAlign, style?:IStyle):number;

    fillText(text:string, rect:IRectangle, style?:IStyle):IDrawing;

    /**
     * 텍스트의 너비를 구한다.
     * @param text 
     */
    getTextWidth(text:string, style?: IStyle):number;

    measureText(text : string, limitWidth : number, isRight: boolean) :IMeasureText;
   /**
     * 폰트 Height 구하기
     * @param ctx 
     * @param size 
     */
    getFontHeight(pt : number) : number;
    /**
     * 폰트 너비 구하기
     * @param ctx 
     * @param text 
     */
    getFontWidth(text:string):number;
} 

  


export interface Rectangle{
     
    Point(x:number, y:number):IPoint;
    Rect(pt:IPoint, w:number|IPoint, h?:number):IRectangle;
    getRect(x:number, y:number, w:number, h:number):IRectangle;
    EmptyRect():IRectangle;
    EmptyPoint():IPoint;
    EmptySize():ISize;
    getThickness(n1:number,n2?:number,n3?:number,n4?:number):IThickness;

    /**
     * 위치 값 및 사이즈 보정
     * @param rect 
     */
    optimize(rect:IRectangle|IPoint):IRectangle|IPoint;
 
    /**
     * 비어 있는 영역인지 여부
     * @param rect 
     * @returns 
     */
    IsEmpty(rect:IRectangle):boolean;
    Right(rect:IRectangle):number;
    Bottom(rect:IRectangle):number;
    Wide(rect:IRectangle, left:number, top ?:number, right?:number, bottom?:number):IRectangle;
    Narrow(rect:IRectangle, left:number, top ?:number, right?:number, bottom?:number):IRectangle;
    /**
     * Point의 위치가 세로 방향으로 해당 위치에 존재하는가?
     * @param p point
     */
    ContainVertical(rect:IRectangle,p:IPoint):boolean;
    /**
     * Point의 위치가 가로 방향으로 해당 위치에 존재하는가?
     * @param p point
     */
    ContainHorizon(rect:IRectangle,p:IPoint):boolean;
    /**
     * 두개의 사각형을 포함하는 전체 영역 반환
     * @param a 
     * @param b 
     * @returns 
     */
    Union(a:IRectangle, b:IRectangle):IRectangle;
    UnionAll(list:Array<IRectangle>):IRectangle;
    /**
     * 사각형의 교집합 반환
     * @param a 
     * @param b 
     * @returns 
     */
    Intersect(a:IRectangle, b:IRectangle):IRectangle|undefined;
     
    /**
     * 동일한 위치의 사각형인지 여부
     * @param rect 
     * @returns 
     */
    Equal(a:IRectangle, b:IRectangle):boolean;

    /**
     * 복제
     */
    Clone(a:IRectangle):IRectangle;
    ClonePoint(a:IPoint):IPoint;

    /**
     * Point가 Rectangle 내에 존재하는가
     * @param p point
     */
    InRect(rect:IRectangle, p:IRectangle):boolean;
    InPoint(rect:IRectangle, p:IPoint):boolean;
    /**
     * resize 영역의 값을 반환 합니다.
     *   Rectangel의 테두리 영역 (margin 3?)에 위치한지 여부를 반환 합니다.
     *  enResizeArea
     * @param rect 
     * @param p 
     */
    //getResizePoint(rect:IRectangle, p : IPoint):enResizeType;
    /**
     * Resize 타입에 따른 커서 모양을 반환 합니다.
     * @param resizeType 
     * @returns 
     */
    //getResizeCursor(resizeType:enResizeType|undefined):string;
    /**
     * 특정 위치로 사각형의 위치를 이동한다.
     * @param rec 
     * @param x 
     * @param y 
     * @returns 
     */
    Move(rec:IRectangle,  x:number, y:number):IRectangle;
    MoveRect(rec:IRectangle,  p1:IPoint, p2:IPoint):IRectangle;
    /**
     * 사이즈 조정
     *  (마우스로 Drag 해서 사이즈 조정 시 사용)
     * @param rec 
     * @param p1 
     * @param p2 
     * @param type 
     * @param minSize 
     * @returns 
     */
    ResizRect(rec:IRectangle,  p1:IPoint, p2:IPoint, type:number/*enResizeType*/, minSize:ISize, proportion:boolean):IRectangle;
    Offset(rec:IRectangle,  x:number, y:number):IRectangle;
    OffsetPoint(pt:IPoint,  x:number, y:number):IPoint;
    
    

    AntiAlis(rec:IRectangle|IPoint):IRectangle|IPoint;
    /**
     * 두 점간의 거리를 계산 한다.
     * @param a 점1
     * @param b 점2
     * @returns 
     */
    Distant(a:IPoint, b:IPoint) : number;


}
 


export interface IStyle extends IDisposable{
    //constructor(key?:string, line?:string, fill?:string);

    Key ?: string;
    LineBrush?: IBrush;//border color
    LineDash ?: Array<number>;
    FillBrush?: IBrush;//fill color
    HAlign?: enHorizonAlign; //enHorizonAlign
    VAlign?: enVerticalAlign; //enVerticalAlign
    FontStyle : IFontStyle;
    Border?:IThickness;

    Padding ?:IThickness; // inner margin
    CornerRadius?:ICornerRadius;
 
    
    getFontSize(defSize?:number):number;
    
    /**
     * 스타일 적용
     * @param ctx 
     * @param stroke 
     * @param fill 
     * @param font 
     */
    Update(ctx:CanvasRenderingContext2D, rect?:IRectangle):void;
    UpdateFontStyle(ctx:CanvasRenderingContext2D):void; 

    /**
     * 직렬화
     * @param model 
     */
     //Serialize() : object;
    /**
     *  역직렬화
     * @param model 
     */
   // DeSerialize(model:any): void;

     

    //Clone(key:string):IStyle;

}  


export interface IFontStyle extends IDisposable{
    Italic ?: boolean ;
	Bold   ?: boolean;
	UnderLine ?: boolean;
	FontFamily ?: string ;
	FontSize : number;
	Color ?: string;
    Wrap ?: boolean;

    Update(ctx:CanvasRenderingContext2D):void;
 
    /**
     * 직렬화
     * @param model 
     */
   // Serialize() : object;
    /**
     *  역직렬화
     * @param model 
     */
   // DeSerialize(model:any): void;
 
}
export interface ImageSource{
    Image : HTMLImageElement | null;
    Base64: string|null;
} 



export interface IImageLoadEvent{
    (tag:any, image:HTMLImageElement):void;
}
/**
 * 이미지 대기 항목
 */
export interface IImageWaitItem{
    /**
     * 이미지 출력 요청
     */
    OnLoadImage :IImageLoadEvent;
    /**
     * Update 식별자
     */
    Tag : any;
}

/**
 * 이미지 로딩되기전 대기리스트
 * fail일 경우 로드 하지 않음.
 */
export interface IImageWaitList{
    /**
     * 이미지 컨트롤
     */
    Image:HTMLImageElement;
    /**
     * 이미지 컨트롤 초기화 되었는지 여부
     */
    Loaded : boolean;

    /**
     * 이미지 로그 실패 함.
     */
    Failed : boolean;
    /**
     * 이미지가 로딩되면 Drawing하려는 목록
     */
    WaitList : Array<IImageWaitItem>;
}
/**
 * 이미지 Repository 객체
 */
export interface IImageDrawingRepisitory{
    
    /**
     * 이미지 그리기
     * @param name 
     * @param url 
     * @param tag 
     * @param callback 
     */
    LoadImage(name:string, url:string, tag:any, callback:IImageLoadEvent):void;

}