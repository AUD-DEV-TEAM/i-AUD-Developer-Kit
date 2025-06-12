import { ISelectable } from "./ISelectable";
import { IDisposable, IHitTestResult, IKeyboadEventArgs, IMouseEventArgs, IPoint, IRectangle, ISize } from "./interface";


export interface IDiagramModel extends IDisposable {      
    /**
     * 저장 모델 반환
     */
    Serialize(model?:any) : any;
    /**
     * 모델 바인딩
     * @param model 
     */
    DeSerialize(model:any) : void;

    /**
     * Model의 저장 복원을 지원하는지 여부
     */
    SupportSerialize():boolean;
    /**
     * 문서의 내용을 비운다.
     */
    Clear():void;

    /**
     * 화면 Drawing 처리
     */
    Update(avaliableArea:IRectangle):void;

    /**
     * 상위 컨트롤 스타일 승계
     * @param styles 
     */
    UpdateStyle(styles:CSSStyleDeclaration):void;
    /**
     * 모델 계산
     */
    Calculate():void;

    /**
     * 현재 문서의 사이즈
     */
    DocumentSize():ISize;
 
    /**
     * 편집 가능 한가
     *  위치 이동, 삭제, 복사, 붙여넣기 등.
     */
    getEditable():boolean;

    /**
     * 문서 수정 여부
     */
    get IsModified():boolean;
    set IsModified(value:boolean);
    /**
     * 컨트롤들 삭제
     * 삭제여부를 반환 합니다.
     */
    Delete(ctl:Array<ISelectable>):boolean;
 
    /**
     * 삭제되었던 컨트롤을 다시 생성합니다.
     * @param model 
     */
    Restore(model:Array<any>):Array<ISelectable>;

    /**
     * 특정 컨트롤의 직렬화
     * 셀렉션에서 Copy & paste시 사용
     */
    SerializeSelectable(ctl:ISelectable) : any;        
    DeSerializeSelectable(ctl:ISelectable, model:any) : void;

    /**
     * 선택 가능한 컨트롤 목록을 순회한다.
     * @param callbackfn 
     */
    forEachSelectable(callbackfn: (control: ISelectable) => void, rect?:IRectangle): void;

    /**
     * 특정 컨트롤을 반환 합니다.
     * @param id 
     */
    getControl(id:string):ISelectable|undefined;
    /**
     * 모델로 컨트롤을 생성합니다.
     * @param model 
     */
    addControl(model:any):ISelectable|undefined;

    /**
     * 컨트롤의 위치가 겹치지 않도록 위치 조정
     * ClipBoard Paste시 사용합니다.
     * @param control 
     */
    avoidOverlapRect(control:ISelectable):void;
    
    /**
     * 특정 컨트롤 내에 HitTest 처리
     * @param ctl 
     * @param pt 
     */
    HitTest(ctl:ISelectable, pt?: IPoint): IHitTestResult | undefined ;

    /**
     * Click, DoubleClick등 이벤트 핸들러 처리
     * @param ctl 
     * @param pt 
     */
    HitTestEvent(ctl:ISelectable|null, pt: IPoint, evt:IMouseEventArgs): IHitTestResult | undefined ;
    /**
     * 자원 해제
     */
    Dispose():void;

    MouseDown(pt:IPoint , args: IMouseEventArgs):boolean;
    MouseMove(pt:IPoint , args: IMouseEventArgs):boolean;
    MouseUp(pt:IPoint , args: IMouseEventArgs):boolean;
    
    KeyUp(args:IKeyboadEventArgs):boolean;
    KeyDown(args:IKeyboadEventArgs):boolean;
}