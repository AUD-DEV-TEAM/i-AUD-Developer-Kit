import { Control } from "../../aud/control/Control";
/**
* 이미지를 표현할 수 있는 컨트롤 입니다.
*/
export interface Image extends Control{

  /**
   * 컨트롤의 마우스 커서 모양을 지정합니다.
  */
  Cursor: string;

  /**
   * Base64 문자열 이미지로 설정
  */
  ImageBase64Text: string;

  /**
   * 이미지 이름(reports/WEB_IMAGES/???.png의 이름) 또는 절대주소(http://x.png) 설정
  */
  ImageSaveName: string;

  /**
   * Base64 문자열을 마우스 오버 이미지로 설정
  */
  OnImageBase64Text: string;

  /**
   * 마우스 오버 이미지 이름(reports/WEB_IMAGES/???.png의 이름) 또는 절대주소(http://x.png) 설정
  */
  OnImageSaveName: string;

  /**
   * 텍스트
  */
  Text: string;

  /** 
   * 엑셀 Export를 위한 JSON 정보를 반환합니다.(base64 text반환)
   *
  * @param range 엑셀 시트의 표시 시작 위치(eg.A5:J11)
  */
  GetExcelExportJSON(range: string): object;

  /**
   * @event 
   *
   * 이미지 컨트롤이 클릭되는 시점에 발생합니다.
   *
   * @param args
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
     * 라벨 값
    */
    Text: string
  }
  ) => void;


}
