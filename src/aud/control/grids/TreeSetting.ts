import { TreeGrid } from "../../../aud/control/TreeGrid";
import { TreeGridNode } from "../../../aud/control/grids/TreeGridNode";
/**
 * 트리 그리드의 트리 관련 옵션 기능들을 설정 및 수행하는 모델
 */
export interface TreeSetting{

  /**
   * 체크 필드 명
   */
  CheckField: string;

  /**
   * 자식 필드 명
   */
  ChildField: string;

  /**
   * 이미지 필드명
   */
  ImageField: string;

  /**
   * 부모 필드 명
   */
  ParentField: string;

  /**
   * 노드의 자식을 접어준다.
   *
   * @param grid 트리 그리드 객체
   * @param row 트리 노드 객체
   */
  Contract(grid: TreeGrid, row: TreeGridNode): void;

  /**
   * 노드의 자식을 펼쳐준다.
   *
   * @param grid 트리 그리드 객체
   * @param row 트리 노드 객체
   */
  Expand(grid: TreeGrid, row: TreeGridNode): void;

}
