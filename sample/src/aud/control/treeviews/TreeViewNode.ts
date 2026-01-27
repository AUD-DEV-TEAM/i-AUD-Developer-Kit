import { DataRow } from "../../../aud/data/DataRow";
/**
* TreeViewNode 객체
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
   readonly DataRow: DataRow | undefined | null;

  /**
   * 글자 굵기
   * @hidden
  */
  FontBold: boolean;

  /**
   * 글자 색상
   * @hidden
  */
  FontColor: string;

  /**
   * 글자체
   * @hidden
  */
  FontFamily: string;

  /**
   * 글자 이탤릭체
   * @hidden
  */
  FontItalic: boolean;

  /**
   * 글자 크기
   * @hidden
  */
  FontSize: number;

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
   readonly IsChecked: boolean;

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
   * TreeViewNode 의 Level
   * @hidden
  */
   readonly Level: number;

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
   * 하위 노드 구하는 메소드
   *
  * @param isRecursive leaf 노드까지 조회할지 여부
  */
  GetChildNodeList(isRecursive?: boolean): TreeViewNode[];

  /** 
   * 노드를 체크하는 메소드
   *
  * @param isChecked 체크 상태
  */
  SetCheckStatus(isChecked: boolean): void;

  /** 
   * 값 셋팅 함수
   *
  * @param key Key
  * @param value Value
  */
  SetValue(key?: string, value?: any): void;

}
