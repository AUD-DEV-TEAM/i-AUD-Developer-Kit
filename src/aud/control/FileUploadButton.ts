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
