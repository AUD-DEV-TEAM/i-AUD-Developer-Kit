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
import { ISAVE_REPORT_INFO } from "../REPORT_INFO_INTERFACE";
import { ScriptDataTable } from "@AUD_SERVER/matrix/script/ScriptDataTable";

 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix". 
let CALL_BACK : Function;
let Matrix : Matrix; 
 
const req = Matrix.getRequest(); 
const res = Matrix.getResponse(); 
const session  = Matrix.getSession(); 
const util = Matrix.getUtility(); 
const fso = Matrix.getFileSystemObject(); 
let  con = Matrix.getConnection(); 
if(!req.getParam("VS_SAVE_REPORT_INFO")){
    Matrix.ThrowException("정보가 존재하지 않습니다.[VS_SAVE_REPORT_INFO]");
}
let SAVE_REPORT_INFO : ISAVE_REPORT_INFO = JSON.parse(req.getParam("VS_SAVE_REPORT_INFO"));


class ReportHelper{ 
    private DATE_TIME_NOW : string;
    private mConn : ScriptConnection;
    constructor(conn:ScriptConnection){
        this.mConn = conn;
        this.DATE_TIME_NOW = Matrix.getQueryGenerator().getDateTimeNowString(conn.getDbType());
    }
  

    /**
     * AUD 자동 생성 보고서 저장 하기
     */
    public SaveAudDocReport():void{
        let stmt: ScriptPreparedStatement | null = null; 
        let sqls: Array<string> = [];
        try {

            let IDX = 0;
            //기존 정보 제거
            sqls = [];            
            sqls.push("  DELETE FROM AUD_DOC_REPORT WHERE REPORT_CODE = ? ");
            stmt = this.mConn.PreparedStatement(sqls.join("\n"));
            IDX = 0;
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_CODE);
            stmt.executeUpdate();
            stmt.close();
            stmt = null;
            
            //신규 정보 저장
            sqls = [];            
            sqls.push(" INSERT INTO AUD_DOC_REPORT(");
            sqls.push("         REPORT_CODE ");
            sqls.push("        ,REPORT_NAME");
            sqls.push("        ,FOLDER_CODE");
            sqls.push("        ,REPORT_DESC");
            sqls.push("        ,CREATE_USER");
            sqls.push("        ,CREATE_DATE)VALUES(");
            sqls.push("         ? ");
            sqls.push("        ,? ");
            sqls.push("        ,? ");
            sqls.push("        ,? ");
            sqls.push("        ,? ");
            sqls.push("        ," + this.DATE_TIME_NOW);
            sqls.push("   )");             
            stmt = this.mConn.PreparedStatement(sqls.join("\n"));
            IDX = 0;
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_CODE);
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_NAME);
            stmt.setString(++IDX, SAVE_REPORT_INFO.FOLDER_CODE);
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_DESC);
            stmt.setString(++IDX, req.getUserCode());
            stmt.executeUpdate();
            stmt.close();
            stmt = null;

        }catch (e) {
            Matrix.ThrowException("AUD_DOC_REPORT 정보 저장 중 오류가 발생하였습니다.\n"+ e.message);
        }finally {
            if (stmt != null) {
                stmt.close();
                stmt = null;
            }
        }
    }

       
    /**
     * AUD 자동 생성 보고서 FORM 저장 하기
     */
    public SaveAudDocForm(table:ScriptDataTable):void{
        let stmt: ScriptPreparedStatement | null = null; 
        let sqls: Array<string> = [];
        try {

            let IDX = 0;

            sqls = [];            
            sqls.push(" DELETE FROM AUD_DOC_FORM WHERE REPORT_CODE = ? ");
            stmt = this.mConn.PreparedStatement(sqls.join("\n"));
            IDX = 0;
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_CODE);
            stmt.executeUpdate();
            stmt.close();
            stmt = null;
            
            //신규 정보 저장
            sqls = [];            
            sqls.push(" INSERT INTO AUD_DOC_FORM(");
            sqls.push("         REPORT_CODE ");
            sqls.push("         ,FORM_SEQ    ");        
            sqls.push("         ,FORM_NAME  ");
            sqls.push("         ,VISIBLE      ");
            sqls.push("         ,LAYOUT_MODEL      ");
            sqls.push("         ,CREATE_USER  ");
            sqls.push("         ,CREATE_DATE)VALUES(");
            sqls.push("         ? ");
            sqls.push("        ,? ");
            sqls.push("        ,? ");
            sqls.push("        ,? ");
            sqls.push("        ,? ");
            sqls.push("        ,? ");
            sqls.push("        ," + this.DATE_TIME_NOW);
            sqls.push("   )");             
            stmt = this.mConn.PreparedStatement(sqls.join("\n"));

          
            for(let r=0,r2=table.getRowCount();r<r2;r++){
                let row = table.getRow(r);
                if(row.getRowStatus() == "N"){
                    IDX = 0;
                    stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_CODE);
                    stmt.setInt(++IDX, row.getInt("FORM_SEQ"));
                    stmt.setString(++IDX, row.getString("FORM_NAME"));
                    stmt.setString(++IDX, row.getString("VISIBLE"));
                    stmt.setCharacterStream(++IDX, row.getString("LAYOUT_MODEL"));
                    stmt.setString(++IDX, req.getUserCode());
                    stmt.executeUpdate();
                }
            }            
            stmt.close();
            stmt = null;

        }catch (e) {
            Matrix.ThrowException("AUD_DOC_FORMT 정보 저장 중 오류가 발생하였습니다.\n"+ e.message);
        }finally {
            if (stmt != null) {
                stmt.close();
                stmt = null;
            }
        }
    }
    /**
     * 컨트롤 정보 저장 하기
     * @param table 
     */
    public SaveAudDocControl(table:ScriptDataTable):void{
        let stmt: ScriptPreparedStatement | null = null; 
        let sqls: Array<string> = [];
        try {

            let IDX = 0;

            sqls = [];            
            sqls.push(" DELETE FROM  AUD_DOC_CONTROL WHERE REPORT_CODE = ? ");
            stmt = this.mConn.PreparedStatement(sqls.join("\n"));
            IDX = 0;
            stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_CODE);
            stmt.executeUpdate();
            stmt.close();
            stmt = null;
            
            //신규 정보 저장
            sqls = [];            
            sqls.push(" INSERT INTO AUD_DOC_CONTROL(");
            sqls.push("         REPORT_CODE ");
            sqls.push("         ,FORM_SEQ		");
            sqls.push("         ,CONTROL_NAME	");
            sqls.push("         ,CONTROL_CODE	");
            sqls.push("         ,CONTROL_LEFT	");
            sqls.push("         ,CONTROL_TOP	");
            sqls.push("         ,CONTROL_WIDTH	");
            sqls.push("         ,CONTROL_HEIGHT	");
            sqls.push("         ,VAR_NAMES		");
            sqls.push("         ,CONTROL_LABEL	");
            sqls.push("         ,INPUT_MUST		");
            sqls.push("         ,TAB_INDEX		");
            sqls.push("         ,CONTROL_SEQ		");
            sqls.push("         ,CREATE_USER		");
            sqls.push("         ,CREATE_DATE)VALUES(");
            sqls.push("          ?		");
            sqls.push("         ,?		");
            sqls.push("         ,?		");
            sqls.push("         ,?		");
            sqls.push("         ,?		");
            sqls.push("         ,?		");
            sqls.push("         ,?		");
            sqls.push("         ,?		");
            sqls.push("         ,?		");
            sqls.push("         ,?		");
            sqls.push("         ,?		");
            sqls.push("         ,?		");
            sqls.push("         ,?		");
            sqls.push("         ,?		");
            sqls.push("         ," + this.DATE_TIME_NOW + ")");
            stmt = this.mConn.PreparedStatement(sqls.join("\n"));

            for(let r=0,r2=table.getRowCount();r<r2;r++){
                let row = table.getRow(r);
                if(row.getRowStatus() == "N"){
                    IDX = 0;
                    stmt.setString(++IDX, SAVE_REPORT_INFO.REPORT_CODE);
                    stmt.setInt(++IDX, row.getInt("FORM_SEQ"));
                    stmt.setString(++IDX, row.getString("CONTROL_NAME"));
                    stmt.setString(++IDX, row.getString("CONTROL_CODE"));
                    stmt.setInt(++IDX, row.getInt("CONTROL_LEFT"));
                    stmt.setInt(++IDX, row.getInt("CONTROL_TOP"));
                    stmt.setInt(++IDX, row.getInt("CONTROL_WIDTH"));
                    stmt.setInt(++IDX, row.getInt("CONTROL_HEIGHT"));
                    stmt.setString(++IDX, row.getString("VAR_NAMES"));
                    stmt.setString(++IDX, row.getString("CONTROL_LABEL"));
                    stmt.setString(++IDX, row.getString("INPUT_MUST"));
                    stmt.setInt(++IDX, row.getInt("TAB_INDEX"));
                    stmt.setInt(++IDX, row.getInt("CONTROL_SEQ"));
                    stmt.setString(++IDX, req.getUserCode());
                    stmt.executeUpdate();
                }
            }            
            stmt.close();
            stmt = null;

        }catch (e) {
            Matrix.ThrowException("AUD_DOC_CONTROL 정보 저장 중 오류가 발생하였습니다.\n"+ e.message);
        }finally {
            if (stmt != null) {
                stmt.close();
                stmt = null;
            }
        }
    }
 

}
//----------------------------------------------------
try{
    con.Connect("MTXRPTY");
    con.BeginTransaction();
    let helper = new ReportHelper(con);
    if(SAVE_REPORT_INFO.REPORT_CODE == "*"){
        SAVE_REPORT_INFO.REPORT_CODE = util.getUniqueKey("REP");
    }
    SAVE_REPORT_INFO.REPORT_PATH = SAVE_REPORT_INFO.FOLDER_CODE + "/" + SAVE_REPORT_INFO.REPORT_CODE + ".mtsd";
    //문서 정보 생성하기
    helper.SaveAudDocReport();
    helper.SaveAudDocForm(req.getTable("GRD_FORM_LIST"));
    helper.SaveAudDocControl(req.getTable("GRD_CONTROL_LIST"));
    con.CommitTransaction();
    con.DisConnect();
    con = null;

    res.WriteResponseText(JSON.stringify(SAVE_REPORT_INFO));
}catch(e){
    con.RollBackTransaction();
    Matrix.ThrowException("보고서 생성 중 오류가 발생하였습니다.\n" + e.message);
}finally{
    if(con){
        con.DisConnect();
    }
}