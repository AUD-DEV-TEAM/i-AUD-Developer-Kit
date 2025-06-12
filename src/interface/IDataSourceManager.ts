import { IDataSourceParam } from "./ICommonTypes";
import { IDataSource, IDataSourceIF } from "./IDataSource";

export interface IDataSourceManager {
    get DataSources(): { [key: string]: IDataSource };
    GetDataSource(): { [key: string]: IDataSource };
    getDataSourceByID(dsID: string): IDataSource | null;
    getDataSourceByName(dsName: string): IDataSource | null;
    SetDataSource(_datasources: Node): void;
    SetDataSourceJSON(datasources: IDataSourceIF[]);
    ModifyDataSource(datasources: Node): void;
    addDataSource(data: HTMLElement): void;
    MakeParams(xw: any, params: { [key: string]: IDataSourceParam } | undefined): void;
    MakeParamsJSON(paramArr: Array<IDataSourceParam>, params: { [key: string]: IDataSourceParam }): void;
    MakeSaveJSON(arrDatasources: Array<IDataSourceIF>): void;
    GetParams(paramName: string): Array<string>;
    addAutoRefreshList(ctrl: any): void;
    MakeDatasourceJSON(dsID: string, reportId?: string): any
    GetParamList(dsId: string): { [key: string]: any }
    AddDataSourceJSON(data: IDataSourceIF): void;
    Dispose(): void;    
}