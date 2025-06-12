import { IColor } from "./IColor"

export interface ITreeOption {
    ParentFieldName: string,
    LabelFieldName: string,
    ValueFieldName: string,
    ImageFieldName: string,
    // HasChildFieldName: string,
    // HiddenFieldName: string,
    ShowCheckBox: boolean,
    RowHeight: number,
    IndentWidth: number,
    NodeInnerPadding: number,
    ToggleButtonSize: number,
    CheckBoxSize: number,
    AutoExpandLevel: number,
    Editable: boolean,
    Padding: {
        Left: number,
        Top: number,
        Right: number,
        Bottom: number
    },
    // 스타일 객체 생성 시 performance 때문에 따로 셋팅
    Font: {
        Size: number,
        Color: string,
        Family: string,
        Bold: boolean,
        Italic: boolean        
    },
    SelectedRowColor: IColor,
    MouseoverRowColor: IColor,   // 마우스 이동 시 over한 row 바탕색
    EnableDragNDrop: boolean,    
    MultiSelect: boolean,       // 멀티 선택 가능 여부
    DropRowColor: IColor,    // SelectedRows를 마우스 왼쪽 버튼 누른 채로 mouse move 시에 target이 되는 row의 위아래 표시 
    FocusColor: IColor       // FindAndFocus로 온 row의 text 색
}