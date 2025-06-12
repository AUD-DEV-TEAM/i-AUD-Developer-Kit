/**
* i-META Viewer 선택 영역 Box
*/
export interface MetaListBox{

  /** 
   * 모델을 update하는 메소드
   *
  * @param isSelf 외부 스크립트 통한 update인지 여부
   * @hidden
  */
  Update(isSelf: boolean): void;

}
