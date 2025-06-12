import { LogManager } from "./LogManager";
import { InstantMessage } from "./InstantMessage";
import { QueryBuilderDocumentModel } from "./IMetaDesigner";
import { FormatConverter } from "../aud/util/FormatConverter";
import { DialogBox } from "../aud/control/DialogBox";

export interface CommonUtil{
    GetScriptObject(viewerId: string): Window | null | undefined;
    GetLogManager() : LogManager;
    GetScriptAPIEnum(enumName : string): any;
    CreateInstantMessage(viewerId:string): InstantMessage;
    ReplaceAll(str: string, org: string, dest: string): string;
    OpenQueryBuilderWindow(window: Window, dbmsCode: string, dbmsName: string, dsCode: string, dsName: string, diagramInfo: any, SID: string, queryBuilderLayout: QueryBuilderDocumentModel, callback: Function)
    CreateFormatConverter(): FormatConverter;
    DataSourceEditor(params:object):DialogBox;
    GetImageURL(downURL: string, imgValue: string): string
}