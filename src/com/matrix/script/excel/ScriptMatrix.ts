/**
* i-MATRIX 보고서를 서버에서 열어 편집할 수 있는 기능을 제공합니다.
*/
export interface ScriptMatrix{

  /** 
   * 현재 열려진 i-MATRIX 보고서를 닫습니다.
   *
  */
  Close(): ScriptMatrix;

  /** 
   * 현재 객체의 소멸자를 호출합니다.
   *
  */
  Dispose(): void;

  /** 
   * 현재 보고서의 MX-GRID 엑셀 원본 파일을 로드 합니다.
   *
   * @example
   * ```js
   *   //MX-GRID의 엑셀 파일 원본을 서버에서 실행 합니다.
   *   var  mtx = Matrix.getMATRIX();
   *   // 현재 보고서의 MX-GRID의 원본 엑셀 열기
   *   mtx.LoadMXGrid("6A272D800BDD40BB97E1FBCF34B612D3");
   *   // 데이터 실행
   *   mtx.Refresh();  
   *   // 불필요한 시트 삭제
   *   mtx.RemoveSheet("P1");
   *   mtx.RemoveSheet("D1");
   *   //PDF 로 저장 
   *   var fileName = Matrix.getUtility().getUniqueKey("") + ".pdf";
   *   mtx.SavePDF("_TEMP_" ,fileName);
   * ```
  * @param xlscode MX Grid의 i-MATRIX 코드
  */
  LoadMXGrid(xlscode: string): ScriptMatrix;

  /** 
   * i-MATRIX 보고서를 엽니다.
   *
  * @param reportCodeOrPath i-MATRIX 보고서 코드나 Excel 파일의 경로
  */
  Open(reportCodeOrPath: string): ScriptMatrix;

  /** 
   * 현재 열려진 i-MATRIX 보고서의 데이터를 조회하고 셀의 수식을 계산 합니다.
   *
  */
  Refresh(): ScriptMatrix;

  /** 
   * i-MATRIX 보고서 내 특정 시트를 삭제합니다.
   *
  * @param sheetName 시트 이름
  */
  RemoveSheet(sheetName: string): ScriptMatrix;

  /** 
   * i-MATRIX 보고서를 Excel 형식으로 저장합니다.
   *
  * @param folderName 저장할 폴더명
  * @param fileName 저장할 파일명
  */
  SaveExcel(folderName: string, fileName: string): ScriptMatrix;

  /** 
   * 엑셀의 특정 시트를 이미지 파일로 저장하고, 저장된 이미지 파일 목록을 반환 합니다.
   *
  * @param workSheetName 이미지로 출력할 시트의 이름 (생략하면 Active 시트)
  * @param onePagePerSheet 단일 시트를 한개의 이미지로 출력할 지 여부
  */
  SaveImage(workSheetName: string, onePagePerSheet: boolean): string[];

  /** 
   * i-MATRIX 보고서를 PDF 형식으로 저장합니다.
   *
  * @param folderName 저장할 폴더명
  * @param fileName 저장할 파일명
  */
  SavePDF(folderName: string, fileName: string): ScriptMatrix;

  /** 
   * i-MATRIX 보고서 내 이미지를 Client에서 전달받은 이미지로 교체합니다.
   *
  * @param pictureNames 이미지 객체 이름 (여러개 입력 시 ,로 분리하여 입력)
  */
  UpdatePictures(pictureNames: string): ScriptMatrix;

  /** 
   * i-MATRIX 보고서 내 모든 시트의 이름 목록을 반환 합니다.
   *
  */
  getSheetNames(): string[];

}
