/**
* PDF 문서 작업을 지원합니다.
* `Matrix.getUtility().CreatePDFDocument()`로 획득합니다.
*
* @example
* ```js
* var req = Matrix.getRequest();
* var res = Matrix.getResponse();
* var util = Matrix.getUtility();
* var fso = Matrix.getFileSystemObject();
*
* //----------------------------------------------
* // 패턴1: 여러 PDF 파일을 하나로 병합
* //----------------------------------------------
* // MX-GRID 각 시트를 PDF로 변환
* var pdfFiles = [];
* var grids = ["MX_GRID_01", "MX_GRID_02", "MX_GRID_03"];
* for (var i = 0; i < grids.length; i++) {
*     var wb = Matrix.OpenWorkBook(req.getReportCode(), grids[i], true);
*     wb.Calculate(true);
*     var pdfPath = fso.getTemplatePath(util.getUniqueKey("PDF") + ".pdf");
*     wb.SaveAsPDF(pdfPath);
*     pdfFiles.push(pdfPath);
* }
*
* // 병합 실행
* var pdf = util.CreatePDFDocument();
* var mergedPath = fso.getTemplatePath(util.getUniqueKey("MERGED") + ".pdf");
* pdf.MergeFiles(pdfFiles, mergedPath);
*
* // 클라이언트에 파일 경로 전달
* var mergedFileName = fso.getFileName(mergedPath);
* res.WriteResponseText(JSON.stringify({
*     "FILE_NAME": mergedFileName
* }));
*
* //----------------------------------------------
* // 패턴2: 이미지 파일을 PDF로 변환 후 병합
* //----------------------------------------------
* var pdf = util.CreatePDFDocument();
* var imgFiles = fso.getFiles("_TEMP_/images");
* var pdfFiles = [];
* for (var i = 0; i < imgFiles.length; i++) {
*     var imgPath = fso.PathCombine("_TEMP_/images", imgFiles[i]);
*     var pdfPath = fso.getTemplatePath(util.getUniqueKey("IMG") + ".pdf");
*     // 이미지를 PDF로 변환 (너비 595, 높이 842 = A4 사이즈)
*     pdf.ImageFileToPDF(imgPath, pdfPath, 595, 842);
*     pdfFiles.push(pdfPath);
* }
*
* // 변환된 PDF들을 하나로 병합
* var mergedPath = fso.getTemplatePath(util.getUniqueKey("MERGED") + ".pdf");
* pdf.MergeFiles(pdfFiles, mergedPath);
* ```
*/
export interface ScriptPdfDocument{

  /**
   * 이미지 파일을 PDF 형식으로 변환합니다.
   *
  * @param imagePath 이미지 파일 경로
  * @param pdfPath PDF 출력 경로
  * @param width 페이지 너비 (A4 = `595`)
  * @param height 페이지 높이 (A4 = `842`)
  */
  ImageFileToPDF(imagePath: string, pdfPath: string, width: number, height: number): boolean;

  /**
   * 여러 개의 PDF 파일을 하나의 파일로 병합합니다.
   *
  * @param pdfFiles PDF 파일 경로 목록
  * @param saveFile 병합된 PDF 출력 경로
  */
  MergeFiles(pdfFiles: string[], saveFile: string): void;

}
