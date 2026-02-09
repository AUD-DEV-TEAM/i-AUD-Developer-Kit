## 1. 개요

AddIn 컨트롤에서 SmartEditor를 사용합니다.

## 2. 화면 구성

| 컨트롤 구분 | 컨트롤명 | 기능 |
| --- | --- | --- |
| AddIn | ADD_EDITOR | SmartEditor의 Edit 모드 |
| AddIn | ADD_VIEWER | SmartEditor의 Viewer 모드 |
| RichTextBox | TXT_HTML | SmartEditor의 HTML 코드를 할당 |
| Button | BTN_GET_VAL | ADD_EDITOR의 Value를 TXT_HTML에 할당 |
| Button | BTN_SET_VAL | TXT_HTML의 Value를 ADD_VIEWER에 할당 |

## 3. 주요 API

| API | 설명 |
| --- | --- |
| `SetViewerMode` | Viewer 모드로 전환 |
| `SetEditorMode` | Editor 모드로 전환 |
| `SetValue` | 값 할당 |
| `GetValue` | 값 반환 |