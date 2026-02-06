import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection";

// Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
declare let CALL_BACK: Function;
declare let Matrix: Matrix;

/************************************************
 * Layout 삭제하기
 ************************************************/
var req = Matrix.getRequest(); /* request */
var con: ScriptConnection | null = Matrix.getConnection(); /* DataBase Connector */

try {
  // 1. 데이터 베이스 연결
  con.Connect("MTXRPTY");

  var sql = " DELETE FROM MEX_USER_REPORT_LAYOUT WHERE LAYOUT_CODE = ? ";

  var stmt = con.PreparedStatement(sql);
  stmt.setString(1, req.getParam("VS_LAYOUT_CODE")); //LAYOUT_CODE
  stmt.executeUpdate();

  //데이터 베이스 연결 종료
  con.DisConnect();

  con = null;
} catch (e: any) {
  if (con != null) {
    con.DisConnect();
    con = null;
  }
  Matrix.ThrowException("데이터 저장 실패 :" + e.message);
}
