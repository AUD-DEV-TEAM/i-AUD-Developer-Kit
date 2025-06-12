import { enMessageBoxButtonType, enMessageBoxType } from "./enum/CommonEnum";

export interface MessageBox{
    CloseAll();
    Close(element_or_tagname: HTMLElement | string): void;
    Error(msg: string, detail?: string | Error, title?: string): void;
    ErrorOpenDetailMessage(msg: string, detail: string | Error, title: string): void;
    Information(msg: string, title?: string): void;
    Confirm(msg: string, title: string, callback: Function, btnType: enMessageBoxButtonType, hasCloseCallback?: boolean): void;
    Warning(msg: string, title: string);
    WarningConfirm(msg: string, title: string, callback: Function, btnType: enMessageBoxButtonType, hasCloseCallback?: boolean): void;

    /**
     * 
     * @param type 
     * @param options {title: string, msg: string, detail?: string btnType?: enMessageBoxButtonType}
     * @returns 
     */
    Create(type: enMessageBoxType, options: IMessageBoxArgs): HTMLDivElement;
    BackgroundHide(): void;
    MakeMessageBoxTitle(type: string, title: string | null | undefined): string;
    getActualRootElementSize(element : HTMLElement) : {Width: number, Height: number};
}

export interface IMessageBoxArgs {
    title: string | null | undefined;
    msg: string;
    detail?: string;
    btnType?: enMessageBoxButtonType;
    callback?: Function
}