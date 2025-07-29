/**
* PDF 문서 작업을 지원합니다.
*/
export interface ScriptPdfDocument{

  /** 
   * 이미지 파일을 PDF형식으로 변환 합니다.
   *
  * @param imagePath Image 경로
  * @param pdfPath PDF 출력 위치
  * @param width 너비 값
  * @param height 높이 값
  */
  ImageFileToPDF(imagePath: string, pdfPath: string, width: double, height: double): boolean;

  /** 
   * 여러개의 PDF 파일을 한개의 파일로 병합 니다.
   *
  * @param pdfFiles PDF 파일 목록
  * @param saveFile PDF 출력 위치
  */
  MergeFiles(pdfFiles: string[], saveFile: string): void;

}
