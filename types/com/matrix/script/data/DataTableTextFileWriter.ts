/**
* DataTable의 데이터를 CSV등 텍스트 파일로 출력할 수 있는 기능을 제공합니다.
*/
export interface DataTableTextFileWriter{

  /** 
   * File Stream 객체를 닫습니다.
해당 객체의 작업 완료 시 반드시 호출합니다.
   *
  */
  Close(): void;

  /** 
   * 파일에 문자열을 출력합니다.
CSV 또는 텍스트 파일에 추가 적인 정보를 출력할 때 사용합니다.
   *
   * @example
   * ```js
   * // 쿼리 결과를 CSV로 출력 하기 
   * var req = Matrix.getRequest();
   * var res = Matrix.getResponse();
   * var session  = Matrix.getSession();
   * var util = Matrix.getUtility();
   * 
   * var con = Matrix.getConnection();
   * var fso = Matrix.getFileSystemObject();
   * var sql; 
   * var stmt = null;
   * try{
   *     //_TEMP_ 경로 하위에 random한 파일 생성
   *     var FILE_NAME = util.getUniqueKey("CSV")+ ".csv";
   *     var path = fso.getTemplatePath(FILE_NAME);
   *     // csv writer 생성
   *     var csvWriter = util.CreateTableTextWriter(path ,"\n" ,"," , null ,null);
   *     con.Connect("Connection Code");
   *     //쿼리 실행
   *     stmt = con.PrepareCall("SELECT * FROM TABLE", true);
   *     stmt.executeQuery(csvWriter); //쿼리 실행 후 결과를 csv로 출력한다.
   *     // 출력한 레코드 갯수
   *     //csvWriter.getRowCount();
   *     
   *     csvWriter.Close(); //파일에 대한 출력 닫기
   *       con.DisConnect();
   *     con = null;
   *     
   *     //파일의 경로를 Client로 전달
   *     var out = res.getJsonResponseWriter();
   *     out.beginObject()
   *         .addProperty("FILE_NAME" ,FILE_NAME)
   *         .endObject()
   *         .close();
   * }catch(e){
   *     Matrix.ThrowException("Server Script Error:" + e.message);
   * }finally{
   *     // release here 
   *      if(stmt != null){ 
   *         stmt.Close(); 
   *         stmt = null; 
   *      } 
   *      if(con != null){ 
   *         con.DisConnect(); 
   *         con = null; 
   *      } 
   * }
   * 
   * // CLIENT SCRIPT
   *      Matrix.RunScript("" ,"Service1" ,function(p){
   *                                     if(p.Success == false){
   *                                        Matrix.Alert(p.Message);
   *                                        return;
   *                                    }
   *                                    var  ds = p.DataSet; 
   *                 Matrix.DownloadFile("_TEMP_",ds.FILE_NAME ,ds.FILE_NAME ,true);
   *     });
   * ```
  */
  Write(): void;

  /** 
   * 파일로 출력된 레코드 수량을 반환합니다.
   *
  * @param text 출력할 문자열
  */
  getRowCount(text: string): number;

}
