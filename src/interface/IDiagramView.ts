import { SelectionController } from "./SelectionController";
import { IDiagramModel } from "./IDiagramModel"; 
import { ISelectable } from "./ISelectable";
import { IDisposable, IDrawing, IMouseEventArgs, IPoint, IRectangle } from "./interface";

export interface IDiagramView extends IDisposable{ 
 
    /**
     * Root Elemeent
     */
    Element:HTMLElement; //생성되는 root
    
    /**
     * Scroll Div 객체
     */
    ScrollView:HTMLElement; //Scroll View
    
    /**
     * 모델 객체
     */
    Document : IDiagramModel; 
        
    /**
     * Drawing 객체
     */
    DrawingPannel : IDrawing; 

    /**
     * Selection Controller
     */
    getSelection():SelectionController;
    /**
     * Offet 
     */
    OffsetTop : number;
    OffsetLeft : number;
        
    /**
     * 화면 표시 여부
     */
    Visible:boolean;
    
    /**
     * Enable
     */
    Enable:boolean
    
    Left : number;
    Top : number;
    Width : number;
    Height : number; 
    
    /**
     * 화면을 갱신합니다.
     * @param reset 스크롤 Reset 여부
     */
    Update(reset?:boolean):void ;

    /**
     * 모델의 계산을 수행한다.
     */
    Calculate():void;
    /**
     * 컨트롤 사이즈 변경 시 호출 
     */
    Resize():void; 
    
    /**
     * 부모 컨트롤의 폰트 속성을 받기 위함.
     * @param parentEle 
     */
    UpdateStyle(parentEle:HTMLElement) : void;

    /**
     * 화면에 그려야 하는 유효 영역 반환
     */
    getUpdateRect():IRectangle;
   
    /**
     * 문서 설정하기
     * @param model 
     */
    DeSerialize(model:object):void;
    
    Serialize():object;

    /**
     * 특정 컨트롤들 삭제
     * @param controls 
     */
    DeleteControls(controls: Array<ISelectable>): boolean;

    /**
     * json 모델을 기준으로 컨트롤 생성하기
     * @param model 
     */
    addControlForSelection(model : Array<ISelectable>): Array<ISelectable>;

    /**
     * json 모델을 기준으로 컨트롤 삭제하기
     * @param controls 
     */
    DeleteControlsForSelection(controls: Array<ISelectable>): boolean;
   
    /**
     * 스타일 반환
     * @param name 
     */
    //getStyle(name:string):IStyle | undefined;

    /**
     * 스타일 추가
     * @param style 
     */
    //addStyle(style:IStyle):IStyle;
    /**
     *  스타일을 생성하고 생성한 스타일을 등록합니다.
     * @param name 
     */
    //createStyle(name:string, line?:string, fill?:string):IStyle;

    /**
     * 해당 마우스 이벤트의 동작이 현재 컨트롤에서 발생하는지 점검합니다.
     * @param event 
     */
    checkMouseEventTarget(event : IMouseEventArgs):boolean;
    /**
     * 특정 항목을 선택
     * @param code 
     */
    ScrollInTo(pos:IPoint, time?:number):void;
    
    Focus():void; 
}
 