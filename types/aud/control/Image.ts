import { Control } from "../../aud/control/Control";
/**
* 이미지를 표현할 수 있는 컨트롤입니다.
*/
export interface Image extends Control{

  /**
   * 컨트롤의 마우스 커서 모양을 가져오거나 설정합니다.
  */
  Cursor: string;

  /**
   * Base64 문자열 이미지를 가져오거나 설정합니다.
  */
  ImageBase64Text: string;

  /**
   * 이미지 이름(reports/WEB_IMAGES/???.png) 또는 절대 주소(http://x.png)를 가져오거나 설정합니다.
  */
  ImageSaveName: string;

  /**
   * 마우스 오버 시 표시할 Base64 문자열 이미지를 가져오거나 설정합니다.
  */
  OnImageBase64Text: string;

  /**
   * 마우스 오버 시 표시할 이미지 이름(reports/WEB_IMAGES/???.png) 또는 절대 주소(http://x.png)를 가져오거나 설정합니다.
  */
  OnImageSaveName: string;

  /**
   * 표시 텍스트를 가져오거나 설정합니다.
  */
  Text: string;

  /**
   * 엑셀 내보내기를 위한 JSON 정보를 반환합니다. (Base64 텍스트 반환)
   *
  * @param range 엑셀 시트의 표시 시작 위치 (예: A5:J11)
  */
  GetExcelExportJSON(range: string): string;

  /**
   * @event
   *
   * 이미지 컨트롤이 클릭될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 이미지 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Image}
  */
  OnClick : (sender : Image
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 표시 텍스트
    */
    Text: string
  }
  ) => void;


}
