/**
 * 메일 발송 테스트 서버 스크립트
 *
 * 실제 메일을 발송하지 않고 로그만 출력하는 테스트용 스크립트입니다.
 * SMTP 서버 설정 없이 메일 발송 기능을 테스트할 수 있습니다.
 */

import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptRequestPacket } from "@AUD_SERVER/matrix/script/ScriptRequestPacket";
import { ScriptResponsePacket } from "@AUD_SERVER/matrix/script/ScriptResponsePacket";

// 필수 변수 선언 (삭제/수정 금지)
let CALL_BACK: Function;
let Matrix: Matrix;

// 핵심 객체 초기화
const req = Matrix.getRequest();      // 클라이언트 요청
const res = Matrix.getResponse();     // 클라이언트 응답

try {
    // 파라미터 추출
    const subject = req.getParam("VS_SUBJECT");
    const to = req.getParam("VS_TO");
    const cc = req.getParam("VS_CC");
    const bcc = req.getParam("VS_BCC");
    const body = req.getParam("VS_BODY");
    const isHtmlStr = req.getParam("VS_IS_HTML");
    const isHtml = (isHtmlStr === "Y" || isHtmlStr === "true");

    // 파라미터 검증
    if (!subject || subject.trim() === "") {
        Matrix.ThrowException("메일 제목이 없습니다.");
    }

    if (!to || to.trim() === "") {
        Matrix.ThrowException("받는 사람이 없습니다.");
    }

    if (!body || body.trim() === "") {
        Matrix.ThrowException("메일 본문이 없습니다.");
    }

    // 로그 출력
    Matrix.WriteLog("========================================");
    Matrix.WriteLog("=== 메일 발송 테스트 (실제 발송 안함) ===");
    Matrix.WriteLog("========================================");
    Matrix.WriteLog("제목: " + subject);
    Matrix.WriteLog("받는사람: " + to);

    if (cc && cc.trim() !== "") {
        Matrix.WriteLog("참조(CC): " + cc);
    }

    if (bcc && bcc.trim() !== "") {
        Matrix.WriteLog("숨은참조(BCC): " + bcc);
    }

    Matrix.WriteLog("HTML 형식: " + isHtml);
    Matrix.WriteLog("----------------------------------------");
    Matrix.WriteLog("본문:");
    Matrix.WriteLog(body);
    Matrix.WriteLog("========================================");

    // 성공 응답
    res.WriteResponseText("SUCCESS");

} catch (e) {
    // 오류 로깅
    Matrix.WriteLog("테스트 오류: " + e.message);
    if (e.stack) {
        Matrix.WriteLog(e.stack);
    }

    // 오류 응답
    Matrix.ThrowException("테스트 실패: " + e.message);
}
