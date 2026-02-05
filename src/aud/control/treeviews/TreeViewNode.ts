import { DataRow } from "../../../aud/data/DataRow";
/**
 * TreeViewNode 객체입니다.
 */
export interface TreeViewNode {

  /**
   * 캡션을 가져오거나 설정합니다.
   * @hidden
   */
  Caption: string;

  /**
   * TreeViewNode의 DataRow를 가져옵니다.
   * @hidden
   */
  readonly DataRow: DataRow | undefined | null;

  /**
   * 글자 굵기 여부를 가져오거나 설정합니다.
   * @hidden
   */
  FontBold: boolean;

  /**
   * 글자 색상을 가져오거나 설정합니다.
   * @hidden
   */
  FontColor: string;

  /**
   * 글자체를 가져오거나 설정합니다.
   * @hidden
   */
  FontFamily: string;

  /**
   * 글자 이탤릭체 여부를 가져오거나 설정합니다.
   * @hidden
   */
  FontItalic: boolean;

  /**
   * 글자 크기를 가져오거나 설정합니다.
   * @hidden
   */
  FontSize: number;

  /**
   * 이미지 HTML Element를 가져오거나 설정합니다.
   * @hidden
   */
  ImageElement: HTMLImageElement;

  /**
   * 이미지 값을 가져오거나 설정합니다.
   * @hidden
   */
  ImageValue: string;

  /**
   * 체크되었는지 여부를 가져옵니다.
   * @hidden
   */
  readonly IsChecked: boolean;

  /**
   * 포커스되었는지 여부를 가져오거나 설정합니다.
   * @hidden
   */
  IsFocus: boolean;

  /**
   * 로드되었는지 여부를 가져오거나 설정합니다.
   * @hidden
   */
  IsLoaded: boolean;

  /**
   * 선택되었는지 여부를 가져오거나 설정합니다.
   * @hidden
   */
  IsSelected: boolean;

  /**
   * 키를 가져오거나 설정합니다.
   * @hidden
   */
  Key: string;

  /**
   * TreeViewNode의 레벨을 가져옵니다.
   * @hidden
   */
  readonly Level: number;

  /**
   * 부모 노드를 가져오거나 설정합니다.
   * @hidden
   */
  ParentNode: TreeViewNode;

  /**
   * 부모 값을 가져오거나 설정합니다.
   * @hidden
   */
  ParentValue: string;

  /**
   * 하위 노드 목록을 반환합니다.
   *
   * @param isRecursive 리프 노드까지 조회할지 여부
   */
  GetChildNodeList(isRecursive?: boolean): TreeViewNode[];

  /**
   * 노드의 체크 상태를 설정합니다.
   *
   * @param isChecked 체크 상태
   */
  SetCheckStatus(isChecked: boolean): void;

  /**
   * 값을 설정합니다.
   *
   * @param key 키
   * @param value 값
   */
  SetValue(key?: string, value?: any): void;

}
