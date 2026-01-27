/**
 * 메일 발송 서버 스크립트
 *
 * ScriptUtility의 SendMail API를 사용하여 메일을 발송합니다.
 * SMTP 서버 설정은 환경에 맞게 수정이 필요합니다.
 */

import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptRequestPacket } from "@AUD_SERVER/matrix/script/ScriptRequestPacket";
import { ScriptResponsePacket } from "@AUD_SERVER/matrix/script/ScriptResponsePacket";
import { ScriptUtility } from "@AUD_SERVER/matrix/script/ScriptUtility";

// 필수 변수 선언 (삭제/수정 금지)
let CALL_BACK: Function;
let Matrix: Matrix;

// 핵심 객체 초기화
const req = Matrix.getRequest();      // 클라이언트 요청
const res = Matrix.getResponse();     // 클라이언트 응답
const util = Matrix.getUtility();     // 유틸리티

/**
 * SMTP 설정
 * 실제 운영 환경에서는 환경 변수나 설정 파일, DB에서 읽어오는 것을 권장합니다.
 */
const SMTP_CONFIG = {
    host: "smtp.gmail.com",                // SMTP 서버 주소
    port: "587",                            // SMTP 포트 (587: TLS, 465: SSL, 25: 일반)
    useSSL: false,                          // SSL 사용 여부 (587 포트는 false, 465 포트는 true)
    username: "your-email@gmail.com",       // 발신자 이메일 (SMTP 인증 계정)
    password: "your-app-password",          // 발신자 비밀번호 (Gmail의 경우 앱 비밀번호 사용)
    fromEmail: "your-email@gmail.com",      // 발신자 이메일 주소
    fromName: "i-AUD Mail System"           // 발신자 이름
};

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

    // 로그 기록
    Matrix.WriteLog("=== 메일 발송 시작 ===");
    Matrix.WriteLog("제목: " + subject);
    Matrix.WriteLog("받는사람: " + to);
    Matrix.WriteLog("참조: " + cc);
    Matrix.WriteLog("숨은참조: " + bcc);
    Matrix.WriteLog("HTML 형식: " + isHtml);

    // 메일 옵션 설정
    const params = [];

    // HTML 형식 설정
    if (isHtml) {
        params.push("CONTENT_TYPE=text/html");
    } else {
        params.push("CONTENT_TYPE=text/plain");
    }

    // 발신자 이름 설정
    params.push("FROM_NAME=" + SMTP_CONFIG.fromName);

    // TLS 사용 설정 (587 포트의 경우)
    if (!SMTP_CONFIG.useSSL && SMTP_CONFIG.port === "587") {
        params.push("USE_TLS=true");
    }

    // 첨부파일 (현재는 없음)
    const attachFiles: string[] = [];

    // 메일 발송 (util.SendMail API 사용)
    const success = util.SendMail(
        SMTP_CONFIG.host,           // SMTP 서버 주소
        SMTP_CONFIG.port,           // SMTP 포트
        SMTP_CONFIG.useSSL,         // SSL 사용 여부
        SMTP_CONFIG.username,       // SMTP 인증 계정
        SMTP_CONFIG.password,       // SMTP 인증 비밀번호
        SMTP_CONFIG.fromEmail,      // 발신자 이메일
        to,                         // 받는 사람
        cc || "",                   // 참조 (빈 문자열 가능)
        bcc || "",                  // 숨은참조 (빈 문자열 가능)
        subject,                    // 제목
        body,                       // 본문
        params,                     // 메일 옵션
        attachFiles                 // 첨부파일
    );

    if (success) {
        // 로그 기록
        Matrix.WriteLog("메일 발송 성공");
        Matrix.WriteLog("===================");

        // 성공 응답
        res.WriteResponseText("SUCCESS");
    } else {
        Matrix.ThrowException("메일 발송에 실패했습니다.");
    }

} catch (e) {
    // 오류 로깅
    Matrix.WriteLog("메일 발송 오류: " + e.message);
    if (e.stack) {
        Matrix.WriteLog(e.stack);
    }

    // 오류 응답
    Matrix.ThrowException("메일 발송 중 오류가 발생했습니다: " + e.message);
}
