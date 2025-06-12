import { ISize } from "./interface";

/**
 * 셀렉션 가능한 컨트롤
 */
export interface ISelectable {
    
    /**
     * 셀렉션에서 사용하는 유일 키
     * 모델내에서 유일 해야 합니다.
     */
    ID:string;
    /**
     * 셀렉션에서 선택 여부
     */
    IsSelected:boolean;

    /**
     * 컨트롤의 Zindex
     */
    ZIndex:number;

    /**
     * 컨트롤의 표시 여부
     * 
     */
    Visible:boolean;

    /**
     * 직렬화 여부
     */
    CanSerializable : boolean;
 
    /**
     * 컨트롤의 최소 사이즈
     * Selection에서 Resize 처리시 필요함
     */
    MinSize:ISize;
 
    Left  : number;
    Top   : number;
    Width  : number;
    Height  : number;
  
}  