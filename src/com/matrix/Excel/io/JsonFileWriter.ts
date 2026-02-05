/**
* 클라이언트에 JSON 형식의 응답을 출력하는 기능을 제공합니다.
* 메서드 체이닝을 지원하며, 대용량 데이터를 메모리에 적재하지 않고 스트리밍 방식으로 출력할 수 있습니다.
*
* @example
* ```js
* var req = Matrix.getRequest();
* var res = Matrix.getResponse();
* var con = Matrix.getConnection();
*
* //----------------------------------------------
* // 패턴1: 단순 JSON 객체 응답
* //----------------------------------------------
* // 결과: {"FOLDER_NAME":"_TEMP_","FILE_NAME":"export_001.xlsx"}
* var writer = res.getJsonResponseWriter();
* writer.beginObject()
*     .addProperty("FOLDER_NAME", "_TEMP_")
*     .addProperty("FILE_NAME", "export_001.xlsx")
*     .endObject()
*     .close();
*
* //----------------------------------------------
* // 패턴2: DB 조회 결과를 JSON 배열로 스트리밍 출력
* //----------------------------------------------
* // 결과: [{"EMP_CODE":"E001","EMP_NAME":"홍길동"},{"EMP_CODE":"E002","EMP_NAME":"김철수"}]
* con.Connect("AUD_SAMPLE_DB");
* var sql = "SELECT EMP_CODE, EMP_NAME FROM TB_EMPLOYEE";
*
* var writer = res.getJsonResponseWriter();
* writer.beginArray();
* con.ExecuteDataTable(sql, CALL_BACK(function(row) {
*     var rs = row.getDataTable();
*     writer.beginObject();
*     for (var c = 0, len = rs.getColumnCount(); c < len; c++) {
*         var name = rs.getColumn(c).getName();
*         writer.addProperty(name, row.getData(name));
*     }
*     writer.endObject();
*     return null; // 다음 row 읽기
* }));
* writer.endArray();
* writer.close();
* con.DisConnect();
*
* //----------------------------------------------
* // 패턴3: 중첩 JSON 구조 (객체 안에 배열)
* //----------------------------------------------
* // 결과: {"STATUS":"OK","ITEMS":["A","B","C"],"DETAIL":{"COUNT":3}}
* var writer = res.getJsonResponseWriter();
* writer.beginObject()
*     .addProperty("STATUS", "OK")
*     .beginArray("ITEMS")
*         .addToArray("A")
*         .addToArray("B")
*         .addToArray("C")
*     .endArray()
*     .beginObject("DETAIL")
*         .addProperty("COUNT", 3)
*     .endObject()
*     .endObject()
*     .close();
* ```
*/
export interface JsonFileWriter{

  /**
   * JSON 객체에 속성을 추가합니다. (구문: `"propName": propValue`)
   *
  * @param propName 속성 이름
  * @param propValue 속성 값
  */
  addProperty(propName: string, propValue: any): JsonFileWriter;

  /**
   * JSON 배열에 값을 추가합니다.
   *
  * @param value 추가할 값
  */
  addToArray(value: any): JsonFileWriter;

  /**
   * JSON 배열 시작 기호를 출력합니다. (구문: `"name": [`)
   *
  * @param name 배열의 속성 이름
  */
  beginArray(name: string): JsonFileWriter;

  /**
   * JSON 배열 시작 기호를 출력합니다. (구문: `[`)
   *
  */
  beginArray(): JsonFileWriter;

  /**
   * JSON 객체 시작 기호를 출력합니다. (구문: `"name": {`)
   *
  * @param name 객체의 속성 이름
  */
  beginObject(name: string): JsonFileWriter;

  /**
   * JSON 객체 시작 기호를 출력합니다. (구문: `{`)
   *
  */
  beginObject(): JsonFileWriter;

  /**
   * 버퍼의 내용을 출력하고 스트림을 닫습니다.
   *
  */
  close(): void;

  /**
   * JSON 배열 종료 기호를 출력합니다. (구문: `]`)
   *
  */
  endArray(): JsonFileWriter;

  /**
   * JSON 객체 종료 기호를 출력합니다. (구문: `}`)
   *
  */
  endObject(): JsonFileWriter;

  /**
   * JSON 스트림에 텍스트를 직접 출력합니다.
   *
  */
  write(): JsonFileWriter;

}
