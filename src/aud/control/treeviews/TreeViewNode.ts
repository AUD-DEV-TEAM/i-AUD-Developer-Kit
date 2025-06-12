import { DataRow } from "../../../aud/data/DataRow";
/**
* TreeViewNode 객체
* @hidden
*/
export interface TreeViewNode{

  /**
   * 캡션
   * @hidden
  */
  Caption: string;

  /**
   * TreeViewNode 의 DataRow
   * @hidden
  */
  DataRow: DataRow | undefined | null;

  /**
   * 이미지 HTML Element
   * @hidden
  */
  ImageElement: HTMLImageElement;

  /**
   * 이미지 값
   * @hidden
  */
  ImageValue: string;

  /**
   * 체크 된건지 여부
   * @hidden
  */
  IsChecked: boolean;

  /**
   * Focus된 것인지 여부
   * @hidden
  */
  IsFocus: boolean;

  /**
   * Load된 것인지 여부
   * @hidden
  */
  IsLoaded: boolean;

  /**
   * 선택된 것인지 여부
   * @hidden
  */
  IsSelected: boolean;

  /**
   * 키
   * @hidden
  */
  Key: string;

  /**
   * 부모노드
   * @hidden
  */
  ParentNode: TreeViewNode;

  /**
   * 부모 값
   * @hidden
  */
  ParentValue: string;

  /** 
   * 값 셋팅 함수
   *
  * @param key 
  * @param value 
   * @hidden
  */
  SetValue(key?: string, value?: any): void;

}
