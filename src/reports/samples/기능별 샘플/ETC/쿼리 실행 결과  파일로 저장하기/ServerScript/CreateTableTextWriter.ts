import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement";
import { DataTableTextFileWriter } from "@AUD_SERVER/matrix/script/data/DataTableTextFileWriter";

 // Please do not modify or delete the following letiables: "CALL_BACK", "Matrix". 
let CALL_BACK : Function;
let Matrix : Matrix; 

/**
 * CreateTableTextWriter 객체를 사용하여 쿼리 실행 결과를 CSV 파일로 출력합니다.
 * 행/열에 대한 구분자를 파라미터로 전달하여 CSV 및 다른 형식의 텍스트 파일을 생성하실 수 있습니다.
 */ 
const req = Matrix.getRequest(); 
const res = Matrix.getResponse(); 
const session  = Matrix.getSession(); 
const util = Matrix.getUtility(); 
const fso = Matrix.getFileSystemObject(); 
let  con = Matrix.getConnection(); 
 
let sql : string; 
let stmt : ScriptPreparedStatement|null= null;
try{
    //_TEMP_ 경로 하위에 random한 파일 생성
    let FILE_NAME = util.getUniqueKey("CSV")+ ".csv";
    let path = fso.getTemplatePath(FILE_NAME);
    // csv writer 생성
    // 다른 형식의 출력을 원하시면 row Delemeter 과 column delemeter를 변경할 수 있습니다.
    let csvWriter : DataTableTextFileWriter = util.CreateTableTextWriter(path ,"\n" ,"," , null ,null);
    //데이터 베이스 연결
    con.Connect("MTXRPTY");
    //쿼리 실행
    stmt = con.PreparedStatement("SELECT *  FROM mtx_folder ");
    //쿼리 실행 시 csvWriter를 통해 파일로 출력 한다.
    stmt.executeQuery(csvWriter as any); 
    
    //파일에 대한 출력 닫기
    csvWriter.Close(); 

    //데이터 베이스 연결 종료
    con.DisConnect();
    con = null;
    
    //파일의 경로를 Client로 전달
    let out = res.getJsonResponseWriter();
    out.beginObject()
        .addProperty("FILE_NAME" ,FILE_NAME)
        .endObject()
        .close();
}catch(e){
    Matrix.ThrowException("파일 내보내기 실패:" + e.message);
}finally{
    // release here 
        if(stmt != null){ 
            stmt.close(); 
            stmt = null; 
        } 
        if(con != null){ 
            con.DisConnect(); 
            con = null; 
        } 
}