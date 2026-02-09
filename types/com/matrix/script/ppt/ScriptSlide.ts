/**
* Power Point의 Slide 객체에 대한 제어를 제공합니다.
*/
export interface ScriptSlide{

  /** 
   * 슬라이드에 이미지를 삽입합니다. (이미지 비율 조절 : 너비 기준)
   *
  * @param controlName :컨트롤 명(콜론 필수)
  * @param imageInfo 이미지 인코딩 문자열 또는 이미지 경로 (reports 아래 경로만 사용)
  */
  WriteImage(controlName: string, imageInfo: string): void;

  /** 
   * 슬라이드에 이미지를 삽입합니다.
   *
  * @param controlName :컨트롤 명(콜론 필수)
  * @param imageInfo 이미지 인코딩 문자열 또는 이미지 경로 (reports 아래 경로만 사용)
  * @param fitType 이미지 비율 설정 타입 (width : 너비 기준으로 비율 조절, height : 높이 기준으로 비율 조절, none : 이미지 사이즈 그대로 출력)
  */
  WriteImage(controlName: string, imageInfo: string, fitType: string): void;

  /** 
   * 슬라이드에 텍스트를 삽입합니다.
   *
  * @param controlName :컨트롤 명(콜론 필수)
  * @param text 대상 문자열
  */
  WriteText(controlName: string, text: string): void;

}
