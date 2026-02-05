import { Control } from "../../aud/control/Control";
/**
 * 사용자에게 서버에 파일을 업로드할 수 있도록 제공하는 버튼 컨트롤입니다.
 */
export interface FileUploadButton extends Control{

  /**
   * 컨트롤의 마우스 커서 모양을 가져오거나 설정합니다.
  */
  Cursor: string;

  /**
   * 다국어 코드를 가져오거나 설정합니다.
  */
  LanguageCode: string;

  /**
   * 표시 텍스트를 가져오거나 설정합니다.
  */
  Text: string;

  /**
   * MouseDown 시 적용할 BoxStyle을 지정합니다. BoxStyle이 존재하지 않거나 Style 속성이 없을 경우 설정되지 않습니다.
   *
   * @example
   * ```js
   * var btn = Matrix.getObject("FileUploadButton");
   * // Key를 입력한 경우
   * btn.SetMouseDownBoxStyle("BX5DF3C663CEBD410DB823074438DD30C6");
   * // 이름을 입력한 경우
   * btn.SetMouseDownBoxStyle("PRIMARY_BTN_Default");
   * ```
  * @param boxStyleIdentifier BoxStyle의 Key 또는 이름
  */
  SetMouseDownBoxStyle(boxStyleIdentifier: string): void;

  /**
   * MouseOver 시 적용할 BoxStyle을 지정합니다. BoxStyle이 존재하지 않거나 Style 속성이 없을 경우 설정되지 않습니다.
   *
   * @example
   * ```js
   * var btn = Matrix.getObject("FileUploadButton");
   * // Key를 입력한 경우
   * btn.SetMouseOverBoxStyle("BXCAF656A487E84A92A16419B0ACC273D0");
   * // 이름을 입력한 경우
   * btn.SetMouseOverBoxStyle("PRIMARY_BTN_Hover");
   * ```
  * @param boxStyleIdentifier BoxStyle의 Key 또는 이름
  */
  SetMouseOverBoxStyle(boxStyleIdentifier: string): void;

  /**
   * @event
   *
   * 파일 업로드 버튼이 클릭될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 파일 업로드 버튼 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link FileUploadButton}
  */
  OnClick : (sender : FileUploadButton
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 표시 텍스트
    */
    Text: string
    /**
     * `true`로 설정 시 이벤트가 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event
   *
   * 파일 업로드가 완료된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 파일 업로드 버튼 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link FileUploadButton}
  */
  OnUploadCompleted : (sender : FileUploadButton
  , args : {
    /**
     * 성공 여부
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
     * 파일 크기
    */
    FileSize: number
    /**
     * 파일 확장자
    */
    FileExtention: string
    /**
     * 컨트롤 이름
    */
    Tag: string
  }
  ) => void;


}
