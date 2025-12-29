import { ConfluxResultTable } from "../../cfx/python/ConfluxResultTable";
import { ConfluxTable } from "../../cfx/python/ConfluxTable";
/**
* Conflux Python Script에서 접근 할 수 있는 메인 API 모델입니다.
*/
export interface Conflux{

  /** 
   * Result File을 추가하는 메서드. 특정 경로의 파일을 다운로드 할 수 있는 기능을 제공합니다.
   *
  * @param name  파일 이름을 입력받는 파라미터
  * @param path  파일의 경로를 입력받는 파라미터
  */
  add_result_file(name: str, path: str): None;

  /** 
   * ConfluxResultTable 타입의 결과 테이블을 추가합니다.
   *
  * @param name 결과 데이터의 이름을 지정하는 파라미터
  * @param result_table  결과 데이터로 넘길 ResultTable 객체를 지정하는 파라미터
  */
  add_result_table(name: str, result_table: ConfluxResultTable): None;

  /** 
   * pandas 라이브러리의 dataFrame 타입의 결과 테이블을 추가합니다.
   *
  * @param name  결과 데이터의 이름을 지정하는 파라미터
  * @param result_table 결과 데이터로 넘길 Pandas Dataframe 객체를 지정하는 파라미터
  */
  add_result_table(name: str, result_table: pandas.DataFrame): None;

  /** 
   * 결과 테이블을 생성합니다.
   *
  */
  create_result_table(): ConfluxResultTable;

  /** 
   * 사용자에게 다음의 Context 정보를 제공합니다.
- confluxServerIp: Duck DB Server IP
- confluxServerPort: Duck DB Server Port
- activityId: 현재 pythonScriptNode의 ActivityId 
- module: Python 모듈정보
- workFolder: 현재 conflux 보고서 경로
   *
   * @example
   * ```js
   * info = Conflux.get_context_value("confluxServerIp")
   * ```
  * @param key Conflux의 Context 정보를 가져오는데 사용되는 key값 파라미터
  */
  get_context_value(key: str): str;

  /** 
   * parentResultNode을 pandas 라이브러리의 dataFrame 타입으로 변경하여 반환합니다.
   *
  * @param name 데이터를 Pandas Dataframe으로 변환하여 가져올 노드의 코드, 테이블명, 이름을 입력받는 파라미터
  */
  get_data_frame(name: str): pandas.DataFrame;

  /** 
   * 테이블을 반환합니다.
   *
  * @param name 데이터로 가져올 노드의 코드, 테이블명, 이름을 입력받는 파라미터
  */
  get_table(name: str): ConfluxTable;

  /** 
   * 테이블 목록을 반환합니다.
   *
  */
  get_tables(): List<ConfluxTable>;

  /** 
   * 특정 변수의 값을 반환합니다.
   *
  * @param key 가져올 변수의 key값을 입력하는 파라미터
  */
  get_variable(key: str): str;

  /** 
   * 특정 변수의 값을 설정합니다.
   *
  * @param key  저장할 변수의 key값을 지정하는 파라미터
  * @param value  저장할 변수의 값을 지정하는 파라미터
  */
  set_variable(key: str, value: str): None;

  /** 
   * 사용자 로그를 작성합니다.
   *
   * @example
   * ```js
   * df = Conflux.get_data_frame("node_a")
   * write_log("testuser", "데이터 프레임 결과",df)
   * ```
  * @param filename 로그의 파일명을 지정하는 파라미터
  * @param message1  로그 메시지 파라미터
  * @param message2  로그 메시지 파라미터
  */
  write_custom_log(filename: str, message1: str | dict | list | pandas.DataFrame, message2?: str | dict | list | pandas.DataFrame): None;

  /** 
   * 사용자 로그를 작성합니다.
   *
   * @example
   * ```js
   * df = Conflux.get_data_frame("node_a")
   * write_log("데이터 프레임 결과",df)
   * ```
  * @param message1  로그 메시지 파라미터
  * @param message2  로그 메시지 파라미터
  */
  write_log(message1: str | dict | list | pandas.DataFrame, message2?: str | dict | list | pandas.DataFrame): None;

}
