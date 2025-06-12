import { UnionEnum } from "./BaseEnum";
import { enDataType } from "./enum/CommonEnum";

export interface IExecutionItem {
    Id: string;                            // Execution Id
    Type: enExecutionType;                 // Execution 타입 : SQL / DataGrid
    Name: string;                          // Execution 이름
    ConnectionCode: string;                // Execution 데이터베이스 커넥션 코드
}

export interface ISQLModel extends IExecutionItem {
    SQL: string;                           // Execution 타입 SQL 일때, SQL 작성 내용 //  암호화 필요
}

export interface ITableModel extends IExecutionItem {
    SourceTableName: string;               // Execution 타입 DataGrid 일때, 소스 테이블 이름
    SourceTableCode: string;               // Execution 타입 DataGrid 일때, 소스 테이블 코드
    TargetTable: string;                   // Execution 타입 DataGrid 일때, 대상 테이블 이름 / Owner정보 포함 : ex) owner.tableName
    Columns: ITableColumnModel[];
}

export interface ITableColumnModel {
    TargetColumn: string;                  // Execution 타입 DataGrid 일때, 대상 테이블 컬럼의 이름
    KeyType: string;                       // Execution 타입 DataGrid 일때, 대상 테이블 컬럼의 Key 타입
    DataType: enDataType;                      // Execution 타입 DataGrid 일때, 대상 테이블 컬럼의 데이터 타입
    SourceColumn: string | undefined;      // Execution 타입 DataGrid 일때, 소스 테이블 컬럼의 이름
    UserDefine: string | undefined;        // Execution 타입 DataGrid 일때, 컬럼별 사용자 정의 설정
}

const enExecutionType = {
    SQL : 0,
    DATAGRID : 1
} as const;
type enExecutionType = UnionEnum<typeof enExecutionType>;