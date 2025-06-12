export interface ImageService {
    /*
     * 이미지 리스트 조회 서비스
     * 이미지 선택 팝업창(istudio.control.properties.ImageSelector.js)에서 사용
     */
    SelectList(keyword: string, callBackFnc: any): void;

    /*
     * 이미지 정보 추가
     * 이미지 선택 팝업창(istudio.control.properties.ImageSelector.js)에서 사용
     */
    Insert(info: object, callBackFnc: any): void;

    /*
     * 이미지 정보 삭제
     * 이미지 선택 팝업창(istudio.control.properties.ImageSelector.js)에서 사용
     */
    Delete(info: object, callBackFnc: any): void;

    /**
       * Base64 Text 를 File 로 저장 (기본 확장자 : PNG)
       이미지 에디터(istudio.ImageEditorManager.js)에서 사용
      * @param FileExt
      * @constructor
      */
    SaveBase64ToFile(info: any, callBackFnc: any): void;

    /**
       * 
      * @param HTMLInputElement //Html InputBox
      * @param saveName //save fileName
      */
    UploadImage(el: HTMLInputElement, saveName: string | null, callBack: Function);
    
    /*
     * 이미지 압축 서비스
     * 이미지 선택 팝업창(ImageSelector.mtsd)에서 사용
     */
    CompressImages(imageList: object | string, callBackFnc: any): void;
}