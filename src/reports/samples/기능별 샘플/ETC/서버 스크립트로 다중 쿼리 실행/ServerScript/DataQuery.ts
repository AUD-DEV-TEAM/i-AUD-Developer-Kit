import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptDataRow } from "@AUD_SERVER/matrix/script/ScriptDataRow";
import { ScriptDataTable } from "@AUD_SERVER/matrix/script/ScriptDataTable";

 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix". 
let CALL_BACK : Function;
let Matrix : Matrix; 

/**
 * 서버스크립트에서 client에 다중의 데이터 셋을 출력 하는 샘플입니다.
 * 다중의 데이터 셋은 순차적으로 실행되므로 컨트롤의 데이터소스로 연결하는
 * 방식에 비해 속도가 늦을 수 있습니다. 
 */

const req = Matrix.getRequest(); 
const res = Matrix.getResponse(); 
const session  = Matrix.getSession(); 
const util = Matrix.getUtility(); 
const fso = Matrix.getFileSystemObject(); 
let  con = Matrix.getConnection(); 
   
let table : ScriptDataTable;
let row : ScriptDataRow;
try{
  //STEP 1 FOLDER 실행
  let RES_DS = res.getDataSet();
  
  
  
  //첫번째 쿼리 실행
  table = req.ExecuteReportDataSource("FOLDER");
  RES_DS.AddTable(table ,"FOLDER");
  
  //변수 바인딩
  var arrFolders = [];
  for(var r=0,len=table.getRowCount(); r<len; r++){
  	row = table.getRow(r);
	  arrFolders.push("'" + row.getData("FOLDER_CODE")  + "'" );
  }
  
  //두번째 쿼리를 실행하기 위해 파라미터 설정
  req.setParam("VS_FOLDERS" ,arrFolders.join(","));
  //두번째 쿼리 실행
  table = req.ExecuteReportDataSource("REPORT");
  RES_DS.AddTable(table ,"REPORT");
  
    

}catch(e){
	Matrix.WriteLog(e.message);
	Matrix.ThrowException("데이터 가져오기 실패 " + e.message);
}