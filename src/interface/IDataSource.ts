import { enDSType } from "./enum/CommonEnum";
import { IDataSourceParam, IDataSourceColumn } from "./ICommonTypes";
import { IViewer } from "./IViewer";

export interface IDataSource {
    // Id: string;
    Name: string;
    Type: string;
    DBType: string;
    ConnectionCode: string;
    get UseMeta(): boolean;
    get UseCache(): boolean;
    get UseServerDataSource(): boolean;
    get Encrypted(): boolean;
    set UseMeta(useMeta: string | boolean);
    set UseCache(useCache: string | boolean);
    set UseServerDataSource(useServerDataSource: string | boolean);
    set Encrypted(encrypted: string | boolean);
    MetaSQLExecuteType: number;
    DSType: enDSType;
    Code: string;
    Id: string;
    RepID: string;    
    SQL: string;
    Params: { [key: string]: IDataSourceParam };
    MetaCodes: string;
    Columns: Array<IDataSourceColumn>;
    Description: string;

    Create(data: any, viewer: IViewer): void;
    CreateJSON(data: any, viewer: IViewer): void;
}

export interface IDataSourceIF {
    Name: string;
    Type: string;
    DBType: string;
    ConnectionCode: string;
    UseMeta: string;
    UseCache: string;
    UseServerDataSource: string;
    Encrypted: string;
    MetaSQLExecuteType: number;
    DSType: enDSType;
    Code: string;
    Id: string;
    RepID: string;    
    SQL: string;
    Params: Array<IDataSourceParam>;
    MetaCodes: string;
    Columns: Array<IDataSourceColumn>;
    Description: string;
}