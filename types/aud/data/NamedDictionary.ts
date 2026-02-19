/**
* name을 key값으로 하는 Dictionary 객체
*/
export interface NamedDictionary<T = any>{

  /**
   * 항목을 추가합니다.
   *
  * @param item 아이템
   * @hidden
  */
  Add(item: T): void;

  /**
   * 모든 객체를 제거 합니다.
   *
  */
  Clear(): void;

  /**
   * 특정 키를 가지는 객체가 존재하는지 여부를 반환 합니다.
   *
  * @param name 객체의 고유이름
  */
  Contains(name: string): boolean;

  /**
   * Dictionary가 가지고 있는 item의 개수를 반환합니다.
   *
  */
  Count(): number;

  /**
   * 항목을 반복합니다.
   *
  * @param enumFunc Enum 함수
   * @hidden
  */
  ForEach(enumFunc?: (idx: number, item: T) => boolean | void): void;

  /**
   * 조건에 맞는 항목만 필터링한 새 NamedDictionary를 반환합니다.
   *
   * @param filterFunc 필터 함수
   */
  Filter(filterFunc: (item: T) => boolean): NamedDictionary<T>;

  /**
   * name에 해당하는 object를 반환합니다.
   *
  * @param name 키 값
  */
  Get(name: string): T;

  /**
   * 특정 위치의 객체를 반환 합니다.
   *
  * @param index Index
  */
  GetByIndex(index: number): T;

  /**
   * 특정 키를 가지는 객체를 제거합니다.
   *
  * @param name 객체의 고유이름
  */
  Remove(name: string): void;

}
