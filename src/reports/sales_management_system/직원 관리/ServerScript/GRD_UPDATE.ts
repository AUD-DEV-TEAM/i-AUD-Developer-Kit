import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";


// Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
let CALL_BACK : Function;
let Matrix : Matrix;

const req = Matrix.getRequest();
let con = Matrix.getConnection();
const gen = Matrix.getQueryGenerator();
const DATE_TIME_NOW = gen.getDateTimeNowString(con.getDbType());

let sql = "";
let stmt;

try {
	con.Connect("AUD_SAMPLE_DB");
	con.BeginTransaction();

	// UPDATE
	sql = "\n UPDATE SM_EMPLOYEE        						"
		+ "\n    SET EMP_NAME   = ?     						"
		+ "\n      , DEPT_ID    = ?    							"
		+ "\n      , JOB_GRADE  = ?     						"
		+ "\n      , EMP_STATUS = ?    							"
		+ "\n      , EMAIL		= ?  							"
		+ "\n      , PHONE      = ?     						"
		+ "\n      , HIRE_DATE  = TO_TIMESTAMP(?, 'YYYYMMDD')	"
		+ "\n      , UPDATED_AT = " + DATE_TIME_NOW + "		 	"
		+ "\n      , UPDATED_BY = ?    							"
		+ "\n  WHERE EMP_ID     = ?;    						";

	stmt = con.PreparedStatement(sql);
	let IDX = 0;
	stmt.setString(++IDX, req.getParam('VS_INP_NAME'));      // EMP_NAME
	stmt.setString(++IDX, req.getParam('VS_INP_DEPT'));      // DEPT_ID
	stmt.setString(++IDX, req.getParam('VS_INP_POSITION'));  // JOB_GRADE
	stmt.setString(++IDX, req.getParam('VS_INP_STATUS'));    // EMP_STATUS
	stmt.setString(++IDX, req.getParam('VS_INP_EMAIL'));     // EMAIL
	stmt.setString(++IDX, req.getParam('VS_INP_PHONE'));     // PHONE
	stmt.setString(++IDX, req.getParam('VS_INP_HIRE'));      // HIRE_DATE
	stmt.setString(++IDX, req.getUserCode());                // UPDATED_BY
	stmt.setString(++IDX, req.getParam('VS_EMP_ID'));        // EMP_ID

	Matrix.WriteLog(sql);
	stmt.executeUpdate();
	stmt.close();
	stmt = null;

	con.CommitTransaction();
	con.DisConnect();
	con = null;

} catch (e) {
	Matrix.WriteLog("ERROR" + e.message);
	if (con != null) {
		try {
			con.RollBackTransaction();
			con.DisConnect();
			con = null;
		} catch (e) {}
	}
	Matrix.ThrowException("Server Exception:" + e.message);
}