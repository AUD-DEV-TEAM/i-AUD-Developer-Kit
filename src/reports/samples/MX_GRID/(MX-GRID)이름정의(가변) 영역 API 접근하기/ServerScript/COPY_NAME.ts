import { Matrix } from "@AUD_SERVER/matrix/script/Matrix"; 
import { ScriptRecordSet } from "@AUD_SERVER/matrix/script/ScriptRecordSet"; 
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement"; 
import { ScriptDataRow } from "@AUD_SERVER/matrix/script/ScriptDataRow"; 
import { ScriptTextFileWriter } from "@AUD_SERVER/matrix/script/io/ScriptTextFileWriter"; 
import { ScriptRequestPacket } from "@AUD_SERVER/matrix/script/ScriptRequestPacket"; 
import { ScriptResponsePacket } from "@AUD_SERVER/matrix/script/ScriptResponsePacket"; 
import { ScriptUtility } from "@AUD_SERVER/matrix/script/ScriptUtility"; 
import { ScriptFileSystemObject } from "@AUD_SERVER/matrix/script/ScriptFileSystemObject";  
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection"; 
import { ScriptSession } from "@AUD_SERVER/matrix/script/ScriptSession"; 
import { ScriptQueryGenerator } from "@AUD_SERVER/matrix/script/ScriptQueryGenerator"; 

 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix". 
let CALL_BACK : Function;
let Matrix : Matrix; 

/**
 * 현재 실행 중인 MX-GRID의 엑셀 파일을 로딩하여
 * 특정 이름정의  영역을 다른 곳에 붙여 넣는다.
 */

const req = Matrix.getRequest(); 
const res = Matrix.getResponse(); 
const session  = Matrix.getSession(); 
const util = Matrix.getUtility(); 
const fso = Matrix.getFileSystemObject(); 
let  con = Matrix.getConnection(); 
 

var wb = Matrix.getWorkBook();
wb.Calculate(true); //계산수행 (이름정의 영역도 함께 계산된다.)

var V1 = wb.getWorkSheet("V1");

//이름 정의 정보를 가져온다.
//이 기능은 DataSet.maf 7.0.500.135 버전 이후에 지원됩니다.
var name = wb.getName("T1_DATA_AREA");
//이름 정의의 영역 정보 반환
var nameRanges = name.getRanges();
if(nameRanges.length > 0){
    //영역 붙여 넣기
    var range = nameRanges[0];
    range.Paste(V1, 1,1);
}
