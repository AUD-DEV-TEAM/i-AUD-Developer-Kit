/**
* Conflux Python Script의 데이터 레코드 모델입니다.
* 
*/
export interface ScriptConfluxRow{

  /** 
   * row의 column 데이터 값을 반환합니다.
   * 
   *
  * @param key
  *  값을 반환 받을 데이터 컬럼명 파라미터
  * 
  */
  get_data(key: str | int): Any;

  /** 
   * row의 column 실수형 데이터 값을 반환합니다.
   * 
   *
  * @param key
  *   값을 반환 받을 실수형 데이터 컬럼명 파라미터
  * 
  */
  get_double(key: str | int): double;

  /** 
   * row의 column 정수형 데이터 값을 반환합니다.
   * 
   *
  * @param key
  *   값을 반환 받을 정수형 데이터 컬럼명 파라미터
  * 
  */
  get_int(key: str | int): int;

  /** 
   * row의 column 문자열 데이터 값을 반환합니다.
   * 
   *
  * @param key
  * 값을 반환 받을 문자형데이터 컬럼명 파라미터
  * 
  */
  get_string(key: str | int): str;

  /** 
   * row의 column 데이터 타입을 반환합니다.
   * 
   *
  * @param key
  * 데이터 타입을 반환 받을 컬럼명 파라미터
  * 
  */
  get_type(key: str | int): Any;

  /** 
   * row의 column 데이터 값을 반환합니다.
   * 
   *
  * @param key
  *  값을 반환 받을 데이터 컬럼명 파라미터
  * 
  */
  get_value(key: Any): Any;

  /** 
   * row의 column 데이터 값을 지정합니다.
   * 
   *
  * @param key
  * 데이터를 설정할 컬럼명을 지정하는 파라미터
  * 
  * @param value
  * 데이터 값을 지정하는 파라미터
  * 
  */
  set_data(key: str | int, value: Any): None;

}
