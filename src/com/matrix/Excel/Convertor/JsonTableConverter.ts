import { ScriptResponsePacket } from "../../../../com/matrix/script/ScriptResponsePacket";
/**
* 엑셀 모델을 읽어서 MX-GRID에서 해석할 수 있는 JSON 모델을 출력합니다.
*/
export interface JsonTableConverter{

  /** 
   * Write JSON Response.
   *
  * @param response response
  * @param targetSheetNames target sheet name(eg.sheet1,shtt2)
  */
  WriteResponse(response: ScriptResponsePacket, targetSheetNames: string): void;

  /** 
   * Creates a file in the given path.
   *
  * @param folderName Folder Name
  * @param fileName File Name
  * @param targetSheetNames target sheet name(eg.sheet1,shtt2)
  */
  WriteToFile(folderName: string, fileName: string, targetSheetNames: string): void;

  /** 
   * Generates a json character from an object.
   *
  * @param targetSheetNames target sheet name(eg.sheet1,shtt2)
  */
  getJsonString(targetSheetNames: string): string;

}
