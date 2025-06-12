import { ISelectable } from "./ISelectable";
import { IHitTestResult, IRectangle } from "./interface";

export interface ISelectControl{
    Rect      : IRectangle; //최초 선택될 시 Rectangel 사이즈 및 위치는 이 기준으로 처리해야 합니다.
    Control   : ISelectable;
    HitInfo   : IHitTestResult;
}