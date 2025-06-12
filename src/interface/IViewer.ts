// import { IDocument, IDocumentDeserializeFormat } from "@interfacemodel/document/IDocument";
// import { IForm } from "@interfacemodel/document/IForm";
// import { IContainer } from "@interfacemodel/document/IContainer";
// import { IReportInfo } from "@interfacemodel/document/IReportInfo";
// import { IHasParent } from "@interfacemodel/document/IHasParent";
// import { IDataBindManager } from "@interfacemanager/IDataBindManager"
import { IDataSourceManager } from "./IDataSourceManager"
// import { IMetaDataSourceManager } from "@interfacemanager/IMetaDataSourceManager"
// import { IExecutePlan } from "@interfacemanager/IExecutePlan"
// import { IFormulaManager } from "@interfacemanager/IFormulaManager"
// import { IVariableManager } from "@interfacemanager/IVariableManager"
// import { IParameterMonitor } from "@interfacemanager/IParameterMonitor"
// import { Control } from "@control/Control";
// import { Grid } from "@controlgrid/Grid";
// import { ModuleManager } from "@manager/ModuleManager";
// import { INamedDictionary, INamedObject } from "@interfacedata/INamedDictionary";
// import { IContextMenu } from "@interfacecommon/IContextMenu";
// import { ITabControl } from "@interfacemodel/control/ITabControl"
// import { enDocumentMode, enExportType, enViewerMode } from "@enum/CommonEnum";
// import { WorkFlowScriptHelper } from "@common/WorkFlowScriptHelper";
// import { MatrixScriptEditor } from "@common/MatrixReportEditor";
// import { IMetaDataSource } from "@interfacedatasource/IMetaDataSource";
// import { IExecuteArg, IExecuteObj } from "@interfacetypes/ICommonTypes";
// import { AgentManager } from '../../../manager/AgentManager';

export interface IViewer{
    Id: string;
    DataSourceManager: IDataSourceManager;
    FormulaManager: IFormulaManager;
    ShowLanguageCodeManager(callbackfn: Function): void;
}

export interface IFormulaManager{
    getFormulaEditorInstance(type, formulaDataSet): IFormulaApiSupport;
}

export interface IFormulaApiSupport{
    GetDefaultData(callBack:Function, DefaultData?:any);
	SetFormulaValue(codeMirrorObj:any, selectionInfo:any, treeData:any)
	SetFieldsOptions(fieldsOptions:any, ignoreFieldNames:any, styles:any, ignoreControlName:any);
	SetFormula(name:string, formula:string, fieldName?:string);
	SetOption(globalOption:Function);
	GetReturnResult();

    setCodeMirrorText(codeMirrorObj, newText);
}

export interface IDesignerElement {
    dom: HTMLDivElement;
    canvasEle: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null; // canvas.getContext 의 return type에 null 이 있음
}

export interface IControlObject {
    "Name": string,
    "Type": string,
    "Events": Array<string>,
    "isCondition": boolean,
    "isRefreshList": boolean,
    "Childs": Array<IControlObject>
}

export interface IFormObject {
    "Name": string,
    "Events": [],
    "Controls": Array<IControlObject>
};

export interface IParamObject {
    "Name": string,
    "Type": string
}

export interface IWorkFlow {
    "ReportInfo": {
        "Document": {
            "Name": string,
            "Elements": Array<{ Name: string, Events: Array<string> }>
        },
        "Object": {
            "Forms": Array<IFormObject>
        },
        "GlobalParam": Array<IParamObject>,
        "Variables": Array<IParamObject>,
        "ExecutePlan": Array<string>,
        "DataSources": Array<string>,
        "ServerScript": Array<string>,
        "UserCode": string,
        "ContextURL": string,
        "ModuleURL": string
        , "DeptPath": string
        , "LanguageCode": string
        , "LanguageIndex": string
        , "RepositoryDBType": number
        , "UserRoll": string
    },
    "WorkFlowInfo": string
}