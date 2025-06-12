// import { RECT, SolidColorBrush, Style } from "../drawing/Drawing";
// import { DiagramView } from "../DiagramView";
// import { UndoManager } from "./UndoRedoManager";
// import { CreateDeleteAction, RectangleAction } from "./UndoRedoActions";
// //import { StyleManager } from "../drawing/StyleManager.ts";

import { IDiagramView } from "./IDiagramView";

 
// import {IClipBoardPaste, IExecuteUndoRedo, IHitTestResult, IKeyboadEventArgs, IMagnetPointer, IMouseEventArgs, IPoint, IRectangle,  IStyle} from "../common/interface";
// import { enResizeType, enSelectionWorkType } from "../common/enums";
// import { IDiagramModel } from "../common/IDiagramModel";
import { ISelectControl } from "./ISelectControl";
// import { IDiagramView } from "../common/IDiagramView";
// import { ISelectable } from "../common/ISelectable";


  
export interface SelectionController {
    getSelections() : Array<ISelectControl>;
    getView():IDiagramView;
    Undo():void;
    Redo():void;
    Copy():string;
    executeClipBoardPaste(text:string):void;
    AlignLeft():void;
    AlignMiddle():void;
    AlignRight():void;
    AlignTop():void;
    AlignCenter():void;
    AlignBottom():void;
}
 