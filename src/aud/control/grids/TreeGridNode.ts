import { DataRow } from "../../../aud/data/DataRow";
import { enCheckBoxValueType } from "../../../aud/enums/grid/enCheckBoxValueType";
/**
* 트리 그리드의 트리 부분 레코드에 대한 모델
*/
export interface TreeGridNode{

  /**
   * 실제 레코드 객체
  */
  Data: DataRow;

  /**
   * 이미지 DOM 객체
  */
  Image: HTMLImageElement;

  /**
   * 트리 펼침 유무
  */
  IsExpand: boolean;

  /**
   * 레벨
  */
  Level: number;

  /**
   * 부모 노드
  */
  ParentNode: TreeGridNode;

  /**
   * 트리 체크 유무
  */
  TreeCheckValue: enCheckBoxValueType;

  /** 
   * 해당 행의 자식 행 목록중에서 특정 위치의 레코드(행)을 찾아준다.
   *
  * @param idx 행 위치
  */
  GetChildNode(idx: number): TreeGridNode;

  /** 
   * 자식 행의 수를 반환합니다.
   *
  */
  GetChildNodeCount(): number;

  /** 
   * 해당 행의 자식 행 전체 목록(필터로 인하여 숨은 레코드 포함)중에서 특정 위치의 레코드(행)을 찾아준다.
   *
  * @param idx 행 위치
  */
  GetChildNodeInTotalRows(idx: number): TreeGridNode;

  /** 
   * 전체 자식 행(필터로 인하여 숨은 레코드 포함)의 수를 반환합니다.
   *
  */
  GetTotalChildNodeCount(): number;

}
