import { ListBox } from "../../aud/control/ListBox";
/**
* i-META Viewer 선택 영역 Box
* @hidden
*/
export interface MetaListBox extends ListBox{

  /**
   * 공통 속성을 갖는 그룹 리스트
   * @hidden
  */
  GroupName: string;

  /** 
   * 모델을 update하는 메소드
   *
  * @param isSelf 외부 스크립트 통한 update인지 여부
   * @hidden
  */
  Update(isSelf?: boolean): void;

}
