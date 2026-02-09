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
		+ "\n   , SORT_ORDER 				"
		+ "\n   , USE_YN  					"
		+ "\n   , CREATED_AT  				"
		+ "\n   , CREATED_BY  				"
		+ "\n ) 							"
		+ "\n VALUES (  					"
		+ "\n     ?  						"
		+ "\n   , ?  						"
		+ "\n   , ? 						"
		+ "\n   , ? 						"
		+ "\n   , ? 						"
		+ "\n   , " + DATE_TIME_NOW + "		"
		+ "\n   , ? 						"
		+ "\n );  							";

	stmt = con.PreparedStatement(sql);

	let IDX = 0;
	stmt.setString(++IDX, req.getParam('VS_GROUP_CODE'));	// GROUP_CD
	stmt.setString(++IDX, req.getParam('VS_INP_CODE'));		// CODE
	stmt.setString(++IDX, req.getParam('VS_CODE_NAME'));	// CODE_NAME
	stmt.setInt(++IDX, Number(req.getParam('VN_SORT')));	// SORT_ORDER
	stmt.setString(++IDX, req.getParam('VS_USE_YN'));		// USE_YN
	stmt.setString(++IDX, req.getUserCode());				// CREATED_BY

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
	Matrix.ThrowException("상세 코드 등록 중 오류가 발생하였습니다.");
}finally{
	if(stmt){
		stmt.close();
	}
	if(con){
		con.DisConnect();
	}
}
