/**
* Pivot Grid Export option
*/
export interface ExportOption{

  /**
   * 셀병합 해제 여부
  */
  ExportDisableRowMerge: boolean;

  /**
   * 시트당 최대 행 수
  */
  ExportSheetSize: number;

  /**
   * 서버 export 실행 여부
  */
  UseServerExport: boolean;

}
