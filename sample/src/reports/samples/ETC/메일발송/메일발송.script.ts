/**
 * 메일 발송 클라이언트 스크립트
 *
 * 사용자로부터 메일 정보를 입력받아 서버로 전송하여 메일을 발송합니다.
 */

import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { CheckBox } from "@AUD_CLIENT/control/CheckBox";

// Matrix 변수 선언 (필수)
let Matrix: Matrix;

// 컨트롤 변수 선언
let txtSubject: TextBox;
let txtTo: TextBox;
let txtCc: TextBox;
let txtBcc: TextBox;
let txtBody: RichTextBox;
let chkHtml: CheckBox;
let btnSend: Button;
let btnClear: Button;

/**
 * 문서 로드 완료 시 초기화
 */
Matrix.OnDocumentLoadComplete = function(_sender, _args) {
    // 컨트롤 바인딩
    txtSubject = Matrix.getObject("txtSubject") as TextBox;
    txtTo = Matrix.getObject("txtTo") as TextBox;
    txtCc = Matrix.getObject("txtCc") as TextBox;
    txtBcc = Matrix.getObject("txtBcc") as TextBox;
    txtBody = Matrix.getObject("txtBody") as RichTextBox;
    chkHtml = Matrix.getObject("chkHtml") as CheckBox;
    btnSend = Matrix.getObject("btnSend") as Button;
    btnClear = Matrix.getObject("btnClear") as Button;

    // 이벤트 등록
    btnSend.OnClick = btnSendOnClick;
    btnClear.OnClick = btnClearOnClick;

    // 초기값 설정
    initializeForm();
};

/**
 * 폼 초기화
 */
function initializeForm(): void {
    // 플레이스홀더 설정 (가능한 경우)
    // 테스트용 기본값 (개발 시에만 사용)
    // txtSubject.Text = "테스트 메일";
    // txtTo.Text = "test@example.com";
}

/**
 * 메일 발송 버튼 클릭 이벤트
 */
const btnSendOnClick = function(_sender: Button, _args: any): void {
    // 유효성 검사
    if (!validateForm()) {
        return;
    }

    // 확인 메시지
    Matrix.Confirm("메일을 발송하시겠습니까?", "메일 발송", function(ok) {
        if (ok) {
            sendEmail();
        }
    }, 0);
};

/**
 * 초기화 버튼 클릭 이벤트
 */
const btnClearOnClick = function(_sender: Button, _args: any): void {
    Matrix.Confirm("입력한 내용을 모두 지우시겠습니까?", "확인", function(ok) {
        if (ok) {
            clearForm();
        }
    }, 0);
};

/**
 * 폼 유효성 검사
 */
function validateForm(): boolean {
    // 제목 검사
    if (!txtSubject.Text || txtSubject.Text.trim() === "") {
        Matrix.Alert("메일 제목을 입력해주세요.");
        txtSubject.Focus();
        return false;
    }

    // 받는 사람 검사
    if (!txtTo.Text || txtTo.Text.trim() === "") {
        Matrix.Alert("받는 사람을 입력해주세요.");
        txtTo.Focus();
        return false;
    }

    // 본문 검사
    if (!txtBody.Text || txtBody.Text.trim() === "") {
        Matrix.Alert("메일 본문을 입력해주세요.");
        txtBody.Focus();
        return false;
    }

    // 이메일 형식 검증
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 받는 사람 이메일 검증
    const toEmails = txtTo.Text.split(',').map(e => e.trim());
    for (let i = 0; i < toEmails.length; i++) {
        if (!emailPattern.test(toEmails[i])) {
            Matrix.Alert("받는 사람 이메일 주소 형식이 올바르지 않습니다: " + toEmails[i]);
            txtTo.Focus();
            return false;
        }
    }

    // 참조(CC) 이메일 검증
    if (txtCc.Text && txtCc.Text.trim() !== "") {
        const ccEmails = txtCc.Text.split(',').map(e => e.trim());
        for (let i = 0; i < ccEmails.length; i++) {
            if (ccEmails[i] && !emailPattern.test(ccEmails[i])) {
                Matrix.Alert("참조(CC) 이메일 주소 형식이 올바르지 않습니다: " + ccEmails[i]);
                txtCc.Focus();
                return false;
            }
        }
    }

    // 숨은참조(BCC) 이메일 검증
    if (txtBcc.Text && txtBcc.Text.trim() !== "") {
        const bccEmails = txtBcc.Text.split(',').map(e => e.trim());
        for (let i = 0; i < bccEmails.length; i++) {
            if (bccEmails[i] && !emailPattern.test(bccEmails[i])) {
                Matrix.Alert("숨은참조(BCC) 이메일 주소 형식이 올바르지 않습니다: " + bccEmails[i]);
                txtBcc.Focus();
                return false;
            }
        }
    }

    return true;
}

/**
 * 메일 발송
 */
function sendEmail(): void {
    // 파라미터 준비
    const paramList = {
        "VS_SUBJECT": txtSubject.Text.trim(),
        "VS_TO": txtTo.Text.trim(),
        "VS_CC": txtCc.Text ? txtCc.Text.trim() : "",
        "VS_BCC": txtBcc.Text ? txtBcc.Text.trim() : "",
        "VS_BODY": txtBody.Text.trim(),
        "VS_IS_HTML": chkHtml.Checked ? "Y" : "N"
    };

    // 서버 스크립트 호출
    Matrix.RunScriptEx([], "sendEmail", paramList, function(p) {

        if (p.Success === false) {
            Matrix.Alert("메일 발송 실패: " + p.Message);
            return;
        }

        // 성공 메시지
        Matrix.Alert("메일이 성공적으로 발송되었습니다.");

        // 폼 초기화 여부 확인
        Matrix.Confirm("입력한 내용을 초기화하시겠습니까?", "확인", function(ok) {
            if (ok) {
                clearForm();
            }
        }, 0);
    });
}

/**
 * 폼 초기화
 */
function clearForm(): void {
    txtSubject.Text = "";
    txtTo.Text = "";
    txtCc.Text = "";
    txtBcc.Text = "";
    txtBody.Text = "";
    chkHtml.Checked = false;
    txtSubject.Focus();
}
