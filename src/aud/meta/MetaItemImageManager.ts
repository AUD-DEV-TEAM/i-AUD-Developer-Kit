import { enMetaFieldCategory } from "../../aud/enums/meta/enMetaFieldCategory";
import { enMetaItemType } from "../../aud/enums/meta/enMetaItemType";
/**
* MetaView Image 관리 객체
* @hidden
*/
export interface MetaItemImageManager{

  /** 
   * 버튼 이미지를 반환해주는 메소드
   *
  * @param imageCode 
   * @hidden
  */
  GetButtonImage(imageCode?: string): HTMLImageElement;

  /** 
   * 그리드 배치 유지 시 그리드 컨트롤에 존재하는 항목에 대한 메타 아이템을 만들 때 해당 아이템의 이미지를 구해주는 메소드
   *
  * @param isCalcField 
  * @param categoryType 
   * @hidden
  */
  GetGridFieldImage(isCalcField?: boolean, categoryType?: enMetaFieldCategory): HTMLImageElement;

  /** 
   * 메타 아이템 유형 및 카테고리 유형에 따라 알맞은 메타 아이템 이미지를 반환해주는 메소드
   *
  * @param type 메타 항목 유형
  * @param categoryType 메타 category 유형
   * @hidden
  */
  GetImage(type?: enMetaItemType, categoryType?: enMetaFieldCategory): HTMLImageElement;

  /** 
   * 이미지를 로드하는 메소드
   *
  */
  Load(): void;

}
