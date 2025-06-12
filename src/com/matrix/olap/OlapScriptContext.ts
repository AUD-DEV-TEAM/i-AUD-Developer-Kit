 
import { DataRow } from "./DataRow";
import { OlapField } from "./OlapField";
import { WriteBackDataCell } from "./WriteBackDataCell";

/**
 * Olap Write-Back Context
 */
export interface OlapScriptContext{
    
    /**
     * 필드 정보를 반환 합니다.
     * @param key 
     */
    getField(key:string):OlapField;

    /**
     * 수정된 셀의 상세 Row의 목록을 반환 합니다.
     * @param cell 
     */
    getRows(cell:WriteBackDataCell):Array<DataRow>;
    //getDataTable():DataTable;

    /**
     * 수정된 셀의 목록을 반환 합니다.
     */
    getEditCells():Array<WriteBackDataCell>;
    //getDocument():OlapDocument;

    /**
     * 수정된 셀 기준으로 Row를 추가한다.
     * @param cell 
     */
    addRow(cell:WriteBackDataCell):DataRow;
    /**
     * 로그 출력 하기
     * @param code 
     * @param message 
     */
    WriteLog(code:string, message:string):void;
}