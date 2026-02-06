import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection";

// Please do not modify or delete the following variables: "CALL_BACK", "Matrix".
declare let CALL_BACK: Function;
declare let Matrix: Matrix;

/************************************************
 * 테이블을 생성합니다.
 ************************************************/
var req = Matrix.getRequest(); /* request */
var con: ScriptConnection | null = Matrix.getConnection(); /* DataBase Connector */

try {
  con.Connect("MTXRPTY");
  var sql = req.getServerScript("@CREATE_TABLE");

  con.ExecuteUpdate(sql); //테이블 생성

  con.DisConnect();

  con = null;
} catch (e: any) {
  if (con != null) {
    con.DisConnect();
    con = null;
  }
  Matrix.ThrowException("테이블 생성 실패 " + e.message);
}
