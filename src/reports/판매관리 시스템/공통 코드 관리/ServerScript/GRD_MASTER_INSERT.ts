import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement";

// Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK: Function;
let Matrix: Matrix;

const req = Matrix.getRequest();
let con = Matrix.getConnection();
const gen = Matrix.getQueryGenerator();
const DATE_TIME_NOW = gen.getDateTimeNowString(con.getDbType());

let sql = "";
let stmt : ScriptPreparedStatement = null;

try {
	con.Connect("AUD_SAMPLE_DB");
	con.BeginTransaction();

	sql = "INSERT INTO SM_COMMON_CODE (		"
		+ "\n     GROUP_CD	 				"
		+ "\n   , CODE						"
		+ "\n   , CODE_NAME					"
		+ "\n   , CODE_DESC  				"
		+ "\n   , SORT_ORDER 				"
		+ "\n   , USE_YN  					"
		+ "\n   , CREATED_AT  				"
		+ "\n   , CREATED_BY  				"
		+ "\n ) 							"
		+ "\n VALUES (  					"
		+ "\n     ?  						"
		+ "\n   , '$'  						"
		+ "\n   , ? 						"
		+ "\n   , ? 						"
		+ "\n   , 0 						"
		+ "\n   , 'Y' 						"
		+ "\n   , " + DATE_TIME_NOW + "		"
		+ "\n   , ? 						"
		+ "\n );  							";

	stmt = con.PreparedStatement(sql);

	let IDX = 0;
	stmt.setString(++IDX, req.getParam('VS_INP_GROUP_CODE'));	// GROUP_CODE
	stmt.setString(++IDX, req.getParam('VS_INP_GROUP_NAME'));	// CODE_NAME
	stmt.setString(++IDX, req.getParam('VS_INP_CODE_DESC'));	// CODE_DESC
	stmt.setString(++IDX, req.getUserCode());					// CREATED_BY

	Matrix.WriteLog(sql);
	stmt.executeUpdate();
	stmt.close();
	stmt = null;

	con.CommitTransaction();

} catch(e) {
	Matrix.WriteLog("ERROR" + e.message);
	if (con != null) {
		try {
			con.RollBackTransaction();
		} catch(e) {}
	}
	Matrix.ThrowException("코드 그룹 등록 중 오류가 발생하였습니다.");
}finally{
	if(stmt){
		stmt.close();
	}
	if(con){
		con.DisConnect();
	}
}
