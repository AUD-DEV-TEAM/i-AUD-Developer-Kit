/* 2023-01-26
 * IE 에서는 Active-X 사용
 * Active-X 사용 금지 => 앞으로 IE 에서는 i-Check 지원 안 함.
 * MX-Service 지원 안 함.
 */

import { enClientLogType, enViewerMode } from "./enum/CommonEnum";

export interface LogManager {
    logger: any;
    getTiming: any;
    logTime: any;
    useLogWrite: boolean;

    Init(): void;
    getTime(): string;
    LogWrite(key: number | string, log?: string, type?: enClientLogType): void;
    Info(key: string, value?: string): void;
    Debug(key: string, value?: string): void;
    Error(key: string, value?: any): void;
    Exception(key: string, e: any): void;
    // 사용하는 곳 없음
    Sql(key: string, value: string): void;
    DebugWrite(key: string, value: string): void;
    SetSqlInfo(ukey: number | string, msg: string): void;
    SetStartTime(key: string): void;
    GetElapsedTime(key: string, msg: string, mode: string): void;
}
//LogManager.Init();