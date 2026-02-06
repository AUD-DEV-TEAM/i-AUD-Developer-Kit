import { Matrix } from "@AUD_SERVER/matrix/script/Matrix"; 
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement"; 
import { ScriptDataRow } from "@AUD_SERVER/matrix/script/ScriptDataRow"; 

 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix". 
let CALL_BACK : Function;
let Matrix : Matrix; 
 
const req = Matrix.getRequest();  /* Request */ 
const res = Matrix.getResponse(); /* Response */ 
const session  = Matrix.getSession(); /* Session */ 
const util = Matrix.getUtility(); /* Utility */ 
const fso = Matrix.getFileSystemObject(); /* File Access */ 
let   con = Matrix.getConnection(); /* DataBase Connection */ 
const gen = Matrix.getQueryGenerator();
let stmt : ScriptPreparedStatement;
let VS_REPLACE_LIST = req.getParam("VS_REPLACE_LIST");
let REPLACE_LIST   : {[key:string]:string}; //변경 대상 목록

interface IDataSource{
	"Id": string;
	"Name":string;
	"UseMeta":string;
	"UseCache": string;
	"ConnectionCode":string;
	"Encrypted":string;	
	"SQL": string;
}
interface IReportInfo {
    "ReportCode": string;
    "FolderCode": string;
    "SavePath": string;
    "Editor": string;
    "EditDate": string;
    "TabPosition": 0,
    "UseLayout": false,
    "UsePersonalConditions": false,
    "DocumentVersion": "3.0.0.0",
    "RefreshType": 0
  };
interface IReport{
  "ReportInfo": IReportInfo,
  "DataSources": {
    "Datas": Array<IDataSource>
  }
}

/**
 * MTX_SQL 테이블 업데이트
 * @param reportInfo 
 * @param dsInfo 
 */
const UPDATE_MTX_SQL = function(reportInfo:IReportInfo, dsInfo:IDataSource){	
	stmt.setCharacterStream(1, dsInfo.SQL);
	stmt.setString(2, reportInfo.ReportCode);
	stmt.setString(3, dsInfo.Id);
	stmt.executeUpdate();
}
/**
 * 쿼리 Replace
 * @param ds 
 */
const UPDATE_SQL = function(ds:IDataSource) : boolean{
	let updated = false;
	let sql = ds.SQL;
	if(ds.Encrypted == "True"){
		sql = util.getDecrypt(sql);
	}
	
	for(let key in REPLACE_LIST){
		if(sql.indexOf(key)>=0){
			sql = util.Replace(sql, key, REPLACE_LIST[key]);
			updated = true;
		}
	}
	if(updated){
		
		if(ds.Encrypted == "True"){
			ds.SQL = util.getEncrypt(sql);
		}else{
			ds.SQL = sql;
		}
		
	}
	return updated;
}
/**
 * 보고서 파싱
 * @param reportPath 
 */
const UPDATE_REPORT = function(row:ScriptDataRow, reportPath:string){
	let filePath = fso.PathCombine([reportPath]);
	let text = fso.ReadTextFile(filePath);
	let report = JSON.parse(text) as IReport;
	let updated = false;
	for(let i=0,i2=report.DataSources.Datas.length; i<i2; i++){
		if(UPDATE_SQL(report.DataSources.Datas[i])){			
			UPDATE_MTX_SQL(report.ReportInfo, report.DataSources.Datas[i]);
			updated = true;
		}
	}
	if(updated){
		report.ReportInfo.Editor   = req.getUserCode();
		report.ReportInfo.EditDate = util.ToString(util.Now(), "yyyy-MM-dd HH:mm:ss");
		row.setData("UPDATE_STATUS", "수정 완료");
		fso.DeleteFile(filePath);
		fso.WriteTextFile(filePath, JSON.stringify(report));
	}
	
}
////////////// PROCESSING //////////////////////
	
try{
	if(VS_REPLACE_LIST){
		
		REPLACE_LIST = JSON.parse(VS_REPLACE_LIST) as {[key:string]:string};

		con.Connect("MTXRPTY");

		let sqls: Array<string> = [];
		sqls.push("  UPDATE MTX_SQL  		");
		sqls.push("  SET SQL_TEXT = ?  		");
		sqls.push("    , MODIFY_DATE = " + gen.getDateTimeNowString(con.getDbType()));
		sqls.push("   WHERE REPORT_CODE = ? ");
		sqls.push("     AND SQL_ID = ?  	");
		
		stmt = con.PreparedStatement(sqls.join("\n"));

		const table = req.getTable("MAIN");
		let row : ScriptDataRow;
		for(let r=0,r2=table.getRowCount(); r<r2; r++){
			row = table.getRow(r);
			UPDATE_REPORT(row, row.getString("REPORT_PATH"));
		} 
		stmt.close();
		stmt = null;

		res.getDataSet().AddTable(table, "T1");
	}else{
		Matrix.ThrowException("변경 대상 목록을 입력해 주세요.");
	}
}catch(e){
	Matrix.ThrowException("Server Error! " +e.message);
}finally{
	if(stmt){
		stmt.close();
	}
	con.DisConnect();

}