/**
* name을 key값으로 하는 Dictionary 객체
*/
export interface NamedDictionary{

  /** 
   * 항목을 추가합니다.
   *
  * @param item 
   * @hidden
  */
  Add(item: any): void;

  /** 
   * Dictionary가 가지고 있는 item의 개수를 반환합니다.
   *
  */
  Count(): number;

  /** 
   * 항목을 반복합니다.
   *
  * @param enumFunc 
   * @hidden
  */
  ForEach(enumFunc?: (idx: number, item: any) => boolean | void): void;

  /** 
   * name에 해당하는 object를 반환합니다.
   *
  * @param name 키 값
  */
  Get(name: string): object;

}
