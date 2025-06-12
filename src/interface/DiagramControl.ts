/*****************************************************
 * meta diagram control 
 * update date : 2023-11-06
 * version : 1.0.0.0
*****************************************************/

import { NamedDictionary } from "../aud/data/NamedDictionary"; 
import { Control } from "../aud/control/Control";
import { IViewer } from "./IViewer";
import { IContainer } from "./IContainer";
import { IContextMenuItemArgs, IEventArgs, /* IExcelExportFormat */ } from "./ICommonTypes";

import { DiagramView } from "./DiagramView";
import { MetaDiagramModel } from "./MetaDiagramModel";

export enum enDiagramModelType{
	  MetaDiagram = "MetaDiagram"
	, WorkFlow = "WorkFlow"
	//, Slicer = "Slicer" //임시
}
export interface DiagramControl extends Control   {  //implements IPopup, IHasWorkFlowEvents, IDoRefreshSupport, IDoExportSupport 
	
	__type__: string;
	domid: string;	
	View: DiagramView; /*Diagram*/
	
    get Document(): MetaDiagramModel;
	/**
	 * 모델 정보 셋팅
	 * @param name 
	 * @returns 
	 */
	setModelType(name:enDiagramModelType):void;
	getModelType():enDiagramModelType;
	mModelType : enDiagramModelType;

	constructor(viewer: IViewer);
	
	// public ShowPopup(pos: IPopupPoint, e?: MouseEvent | undefined): void {
		
	// }
	// public HidePopup(isClearPopup?: boolean | undefined): boolean | undefined {
		
	// }
	// public CallOnScroll(event: Event) {
		
	// };

	set OnContextMenuOpening(value: Function | null); 

	Create(parentCtrl: IContainer, name: string): Control;
	Update();
	UpdateStyle;
	Resize();
	 	 
	 
	/**
	 * Visible 처리
	 */
	SetExpandProps();
	/**
     * Serialize 
     *   - Script에서 접근가능하도록 array 파라미터를 없어도 되도록 처리 함.
     * @param arrElements 
     * @returns 
     */
	Serialize(arrElements ?: any):any;
	 
	 /**
     * Deserialize
     *   - 보고서 스크립트에서 호출 가능하도록 API OPEN
     * @param eleJSONObj 
     */
	Deserialize(element: any) :boolean;
	  
	Dispose();

	Focus():void;
	/**
	 * Context menu create
	 * @returns 
	 */
	GetContextMenuList(): Array<IContextMenuItemArgs>;
	/**
	 * 속성창에 들어갈 항목들
	 * @returns 
	 */
	getProperties(): NamedDictionary;

   


	/**
	 * BASE 64 Image Export */
	getBase64Image(callbackFunc?: Function): string | Function;
	/**
	 * MX-GRID를 다른 MX-GRID에서 제어하는 경우
	 *  이미지로 출력하여 처리합니다.
	 *  자식으로 등록된 MX-GRID는 다시 자식을 가질수 없도록 제한합니다.
	 *  2021-10-26
	 * @param {*} callback 
	 * @param {*} tag --
	 */
	getBase64ImageForiGRID(callback, tag): void;
	/**
	 * return canvas object for image export
	 */
	getCanvasForBase64Image(): HTMLCanvasElement;
	/**************************************************
	*  User Script API 
	*  보고서에서는 아래의 함수만 호출 하시오...
	**************************************************/
	GetExcelExportJSON(range: string): object;
	      
	// Call Modules Event
	CallModulesEvent(entName: string, args: any, checkCancel:boolean);
     
} 