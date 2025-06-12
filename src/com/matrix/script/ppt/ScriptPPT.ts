import { ScriptSlide } from "../../../../com/matrix/script/ppt/ScriptSlide";
/**
* Power Point 문서에 대한 제어를 제공합니다.
*/
export interface ScriptPPT{

  /** 
   * 슬라이드를 복사합니다.
   *
  * @param slideIndex 슬라이드 위치
  */
  CopySlide(slideIndex: number): ScriptSlide;

  /** 
   * 슬라이드를 삭제합니다.
   *
  * @param slideIndex 슬라이드 위치
  */
  RemoveSlide(slideIndex: number): ScriptSlide;

  /** 
   * PPT 파일을 생성합니다.
   *
  * @param path 저장 경로 (reports 아래 경로만 사용)
  */
  Save(path: string): void;

  /** 
   * 슬라이드를 반환합니다.
   *
  * @param slideIndex 슬라이드 위치
  */
  getSlide(slideIndex: number): ScriptSlide;

}
