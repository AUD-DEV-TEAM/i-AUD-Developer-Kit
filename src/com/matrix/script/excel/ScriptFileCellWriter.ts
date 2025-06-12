 
import { ScriptCellRange } from "./ScriptCellRange";
/**
* 대용량 엑셀 파일 생성을 위한 모델
*/
export interface ScriptFileCellWriter{
 


    /**
     * 셀을 생성합니다.
     * @param r 
     * @param c 
     */
    createCell(r:number, c:number): ScriptCellRange;
    
    /**
     * baseCell을 복제하여 셀을 생성합니다.
     * @param r 
     * @param c 
     * @param baseCell 
     */
    createCell(r:number, c:number, baseCell:ScriptCellRange): ScriptCellRange;

    /**
     * 셀을 생성합니다.
     * @param rangeName 
     */
    createCell(rangeName:string): ScriptCellRange;

    /**
     * baseCell을 복제하여 셀을 생성합니다.
     * @param rangeName 
     * @param baseCell 
     */
    createCell(rangeName:string, baseCell:ScriptCellRange): ScriptCellRange;
 
    /**
     * 셀 정보를 파일로 작성합니다.
     * @param cell 
     */
    writeCell(cell:ScriptCellRange):void;

    /**
     * 셀을 등록한다.
     */
    addCell(cell:ScriptCellRange):void;
    /** 
     * 
     * */
    writeCells():void;

    /**
     * 파일 쓰기를 종료 합니다.
     */
    close():void;
}
