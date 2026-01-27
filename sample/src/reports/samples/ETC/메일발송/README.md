# 메일 발송 시스템

i-AUD에서 메일을 발송할 수 있는 클라이언트/서버 스크립트 예제입니다.

## 📁 파일 구성

```
메일발송/
├── .aud.json                    # 보고서 메타데이터
├── REPMAIL001.mtsd              # 보고서 구조 정의 (JSON)
├── 메일발송.script.ts           # 클라이언트 스크립트 (TypeScript)
└── ServerScript/
    ├── sendEmail.ts            # 실제 메일 발송 서비스
    └── sendEmailTest.ts        # 테스트용 서비스 (로그만 출력)
```

## 🎯 주요 기능

### 클라이언트 스크립트 (메일발송.script.ts)

- 📧 메일 정보 입력 폼 (제목, 받는 사람, 참조, 숨은참조, 본문)
- ✅ 이메일 주소 형식 유효성 검사
- 🔄 HTML 형식 발송 옵션
- 🔔 발송 성공/실패 알림
- 🧹 입력 폼 초기화 기능

### 서버 스크립트

#### 1. sendEmail.ts - 실제 메일 발송
- JavaMail API 사용
- 일반 텍스트 또는 HTML 형식 지원
- 여러 수신자 지원 (TO, CC, BCC)
- SMTP 인증 및 TLS/SSL 지원

#### 2. sendEmailTest.ts - 테스트용
- 실제 메일 발송 없이 로그만 출력
- SMTP 서버 설정 없이 테스트 가능
- 개발 및 디버깅에 유용

## ⚙️ 사용 방법

### 1. i-AUD Designer에서 UI 디자인

보고서에 다음 컨트롤들을 배치하세요:

| 컨트롤 이름 | 타입 | 설명 |
|------------|------|------|
| `txtSubject` | TextBox | 메일 제목 |
| `txtTo` | TextBox | 받는 사람 (쉼표로 구분) |
| `txtCc` | TextBox | 참조 (선택사항) |
| `txtBcc` | TextBox | 숨은참조 (선택사항) |
| `txtBody` | RichTextBox | 메일 본문 |
| `chkHtml` | CheckBox | HTML 형식 여부 |
| `btnSend` | Button | 발송 버튼 ("발송") |
| `btnClear` | Button | 취소 버튼 ("취소") |

### 2. SMTP 서버 설정

[ServerScript/sendEmail.ts:31-43](ServerScript/sendEmail.ts#L31-L43)의 `SMTP_CONFIG` 설정을 수정하세요:

```typescript
const SMTP_CONFIG = {
    host: "smtp.gmail.com",              // SMTP 서버 주소
    port: 587,                            // 포트 (587: TLS, 465: SSL)
    username: "your-email@gmail.com",     // 발신자 이메일
    password: "your-app-password",        // 비밀번호 (Gmail: 앱 비밀번호)
    fromEmail: "your-email@gmail.com",    // 발신자 이메일
    fromName: "i-AUD Mail System",        // 발신자 이름
    useTLS: true,                         // TLS 사용
    useSSL: false,                        // SSL 사용
    auth: true                            // 인증 사용
};
```

### 3. 일반적인 SMTP 설정 예시

#### Gmail
```typescript
host: "smtp.gmail.com"
port: 587
useTLS: true
useSSL: false
// Gmail 앱 비밀번호 사용 권장
// https://myaccount.google.com/apppasswords
```

#### Outlook/Hotmail
```typescript
host: "smtp-mail.outlook.com"
port: 587
useTLS: true
useSSL: false
```

#### Office 365
```typescript
host: "smtp.office365.com"
port: 587
useTLS: true
useSSL: false
```

#### 일반 SMTP (SSL)
```typescript
host: "smtp.example.com"
port: 465
useTLS: false
useSSL: true
```

### 4. VS Code에서 배포

```bash
# 1. TypeScript 빌드 (watch 모드)
tsc --w

# 2. VS Code에서 명령 실행
# Ctrl+Shift+P → "AUD: Save Script"
# 또는 단축키: Ctrl+Alt+S

# 3. 브라우저에서 실행
# Ctrl+Shift+P → "AUD: Run Designer"
# 또는 단축키: Ctrl+Alt+D
```

## 🧪 테스트 방법

### 1. 테스트 모드 사용 (권장)

SMTP 서버 설정 없이 먼저 테스트:

[메일발송.script.ts:140](메일발송.script.ts#L140)의 서비스 이름을 변경:

```typescript
// 실제 발송
Matrix.RunScriptEx([], "sendEmail", paramList, function(p) { ... });

// 테스트 (로그만 출력)
Matrix.RunScriptEx([], "sendEmailTest", paramList, function(p) { ... });
```

### 2. 서버 로그 확인

테스트 모드 실행 후 i-AUD 서버 로그를 확인하세요:

```
========================================
=== 메일 발송 테스트 (실제 발송 안함) ===
========================================
제목: 테스트 메일
받는사람: test@example.com
HTML 형식: false
----------------------------------------
본문:
테스트 메일 본문입니다.
========================================
```

## 🔐 보안 권장사항

### 1. 비밀번호 관리

**⚠️ 중요:** 실제 운영 환경에서는 코드에 직접 비밀번호를 작성하지 마세요!

**권장 방법:**

#### 환경 변수 사용
```typescript
const SMTP_CONFIG = {
    username: java.lang.System.getenv("SMTP_USERNAME"),
    password: java.lang.System.getenv("SMTP_PASSWORD"),
    // ...
};
```

#### 데이터베이스에서 읽기
```typescript
const req = Matrix.getRequest();
const con = Matrix.getConnection();
con.Connect("CONFIG_DB");

const stmt = con.PreparedStatement(
    "SELECT SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS FROM EMAIL_CONFIG WHERE CONFIG_ID = ?"
);
stmt.setString(1, "DEFAULT");
const rs = stmt.ExecuteQuery();

if (rs.next()) {
    const SMTP_CONFIG = {
        host: rs.getString("SMTP_HOST"),
        port: rs.getInt("SMTP_PORT"),
        username: rs.getString("SMTP_USER"),
        password: rs.getString("SMTP_PASS")
    };
}
```

### 2. Gmail 사용 시

Gmail을 SMTP 서버로 사용할 경우:

1. **2단계 인증 활성화**
2. **앱 비밀번호 생성** (권장)
   - Google 계정 → 보안 → 2단계 인증 → 앱 비밀번호
   - https://myaccount.google.com/apppasswords
3. 일반 비밀번호 대신 앱 비밀번호 사용

### 3. 입력 검증

악의적인 헤더 인젝션을 방지하려면 서버에서도 검증을 추가하세요:

```typescript
// 이메일 주소 검증
function isValidEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// 개행 문자 제거 (헤더 인젝션 방지)
function sanitizeHeader(value: string): string {
    return value.replace(/[\r\n]/g, '');
}

const subject = sanitizeHeader(req.getParam("VS_SUBJECT"));
const to = sanitizeHeader(req.getParam("VS_TO"));
```

## 🐛 오류 처리

### 일반적인 오류와 해결 방법

#### 1. 인증 실패 (Authentication failed)
```
원인: 사용자 이름/비밀번호 오류
해결:
- SMTP 사용자명과 비밀번호 확인
- Gmail의 경우 앱 비밀번호 사용
- 2단계 인증 설정 확인
```

#### 2. 연결 실패 (Connection refused)
```
원인: SMTP 서버 연결 불가
해결:
- SMTP 서버 주소 및 포트 확인
- 방화벽 설정 확인
- TLS/SSL 설정 확인
```

#### 3. 수신자 거부 (Recipient rejected)
```
원인: 이메일 주소 형식 오류 또는 발송 제한
해결:
- 이메일 주소 형식 재확인
- SMTP 서버의 발송 제한 확인
- SPF/DKIM 설정 확인 (스팸 방지)
```

#### 4. JavaMail 클래스 없음
```
원인: JavaMail 라이브러리 미설치
해결:
- i-AUD 서버에 JavaMail API 라이브러리 설치 필요
- javax.mail, javax.activation 라이브러리 확인
```

## 📚 API 참조

### 클라이언트 API

```typescript
// Matrix API
Matrix.getObject(name: string): Control
Matrix.Alert(message: string): void
Matrix.Confirm(message: string, title: string, callback: Function, type: number): void
Matrix.RunScriptEx(grids: string[], serviceName: string, params: object, callback: Function): void
Matrix.ShowProgress(message: string): void
Matrix.HideProgress(): void

// TextBox
textbox.Text: string
textbox.Focus(): void

// CheckBox
checkbox.Checked: boolean
```

### 서버 API

```typescript
// Matrix
Matrix.getRequest(): ScriptRequestPacket
Matrix.getResponse(): ScriptResponsePacket
Matrix.WriteLog(message: string): void
Matrix.ThrowException(message: string): void

// ScriptRequestPacket
req.getParam(name: string): string

// ScriptResponsePacket
res.WriteResponseText(text: string): void
```

## 📖 추가 학습 자료

- i-AUD 클라이언트 스크립트 가이드: [.claude/skills/iaud-client-script/SKILL.md](.claude/skills/iaud-client-script/SKILL.md)
- i-AUD 서버 스크립트 가이드: [.claude/skills/iaud-server-script/SKILL.md](.claude/skills/iaud-server-script/SKILL.md)
- JavaMail API 문서: https://javaee.github.io/javamail/

## 💡 확장 아이디어

### 1. 첨부파일 지원

```typescript
// 클라이언트: 파일 업로드
Matrix.UploadLocalFile("_TEMP_", "", function(p) {
    if (p.Success) {
        paramList["VS_FILE_PATH"] = p.FolderName + "/" + p.SaveFileName;
        paramList["VS_FILE_NAME"] = p.FileName;
        // sendEmail 호출
    }
});

// 서버: 첨부파일 추가
const MimeMultipart = Java.type("javax.mail.internet.MimeMultipart");
const MimeBodyPart = Java.type("javax.mail.internet.MimeBodyPart");
const FileDataSource = Java.type("javax.activation.FileDataSource");

const multipart = new MimeMultipart();
const attachPart = new MimeBodyPart();
const source = new FileDataSource(filePath);
attachPart.setDataHandler(new DataHandler(source));
attachPart.setFileName(fileName);
multipart.addBodyPart(attachPart);
```

### 2. 메일 템플릿

```typescript
// 템플릿 불러오기
const fso = Matrix.getFileSystemObject();
let template = fso.ReadTextFile("/templates/welcome.html");

// 변수 치환
template = template.replace("{{USERNAME}}", userName);
template = template.replace("{{DATE}}", new Date().toString());
```

### 3. 발송 이력 저장

```typescript
// 데이터베이스에 발송 이력 저장
const con = Matrix.getConnection();
const sql = `
    INSERT INTO EMAIL_HISTORY (TO_EMAIL, SUBJECT, STATUS, SENT_DATE)
    VALUES (?, ?, ?, NOW())
`;
const stmt = con.PreparedStatement(sql);
stmt.setString(1, to);
stmt.setString(2, subject);
stmt.setString(3, "SUCCESS");
stmt.executeUpdate();
```

## 📞 문의

기술 지원이 필요한 경우 i-AUD 관리자에게 문의하세요.
