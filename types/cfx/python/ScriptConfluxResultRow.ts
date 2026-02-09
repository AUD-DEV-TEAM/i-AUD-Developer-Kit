/**
* Conflux Python Script의 결과 반환 데이터 레코드 모델입니다.
* 
*/
export interface ScriptConfluxResultRow{

  /** 
   * Column명 또는 index의 Data를 반환합니다.
   * 
   *
  * @param key
  * 값을 반환 받을 컬럼명을 지정하는 파라미터
  * 
  */
  get_data(key: str | int): Any;

  /** 
   * Column명 또는 index에 Data를 지정합니다.
   * 
   *
  * @param key
  * 컬럼명을 지정하는 파라미터
  * 
  * @param value
  *  컬럼 값을 지정하는 파라미터
  * 
  */
  set_data(key: str | int, value: Any): None;

}
