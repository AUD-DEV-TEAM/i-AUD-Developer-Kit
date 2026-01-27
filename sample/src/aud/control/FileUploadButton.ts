import { Control } from "../../aud/control/Control";
/**
* 사용자에게 서버에 파일을 업로드할 수 있도록 제공하는 버튼을 표현합니다. 파일 업로드 완료 후 "OnUploadCompleted" 이벤트가 발생합니다.
*/
export interface FileUploadButton extends Control{

  /**
   * 컨트롤의 마우스 커서 모양을 지정합니다.
  */
  Cursor: string;

  /**
   * 컨트롤 다국어 코드
  */
  LanguageCode: string;

  /**
   * 텍스트
  */
  Text: string;

  /** 
   * MouseDown 했을 때 적용할 BoxStyle을 지정합니다.
BoxStyle이 존재하지 않거나, Style 속성이 없을 경우 설정되지 않습니다.
   *
   * @example
   * ```js
   * // MouseDown 시 BoxStyle을 변경 합니다.
   * // BoxStyle은 이름 또는 Key 값으로 변경하실 수 있습니다.
   * // FileUploadButton.SetMouseDownBoxStyle("");
   * var FileUploadButton = Matrix.getObject("FileUploadButton");
   * // Key를 입력한 경우
   * FileUploadButton.SetMouseDownBoxStyle("BX5DF3C663CEBD410DB823074438DD30C6");
   * // 이름을 입력한 경우
   * FileUploadButton.SetMouseDownBoxStyle("PRIMARY_BTN_Default");
   * ```
  * @param boxStyleIdentifier BoxStyle의 Key 또는 이름
  */
  SetMouseDownBoxStyle(boxStyleIdentifier: string): void;

  /** 
   * MouseOver 했을 때 적용할 BoxStyle을 지정합니다.
BoxStyle이 존재하지 않거나, Style 속성이 없을 경우 설정되지 않습니다.
   *
   * @example
   * ```js
   * // MouseOver 시 BoxStyle을 변경 합니다.
   * // BoxStyle은 이름 또는 Key 값으로 변경하실 수 있습니다.
   * // FileUploadButton.SetMouseOverBoxStyle("");
   * var FileUploadButton = Matrix.getObject("FileUploadButton");
   * // Key를 입력한 경우
   * FileUploadButton.SetMouseOverBoxStyle("BXCAF656A487E84A92A16419B0ACC273D0");
   * // 이름을 입력한 경우
   * FileUploadButton.SetMouseOverBoxStyle("PRIMARY_BTN_Hover");
   * ```
  * @param boxStyleIdentifier BoxStyle의 Key 또는 이름
  */
  SetMouseOverBoxStyle(boxStyleIdentifier: string): void;

  /**
   * @event 
   *
   * 파일 업로드 버튼 컨트롤이 클릭되는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link FileUploadButton}
  */
  OnClick : (sender : FileUploadButton
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 라벨 값
    */
    Text: string
    /**
     * true로 지정 시 이벤트가 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 파일 업로드 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link FileUploadButton}
  */
  OnUploadCompleted : (sender : FileUploadButton
  , args : { 
    /**
     * 성공여부
    */
    Success: boolean
    /**
     * 에러 메시지
    */
    Message: string
    /**
     * 서버에 저장된 파일의 경로
    */
    FolderName: string
    /**
     * 서버에 저장된 파일의 이름
    */
    SaveFileName: string
    /**
     * 사용자가 선택한 파일 이름
    */
    FileName: string
    /**
     * 파일 사이즈
    */
    FileSize: number
    /**
     * 파일의 확장자
    */
    FileExtention: string
    /**
     * 컨트롤 명
    */
    Tag: string
  }
  ) => void;


}
