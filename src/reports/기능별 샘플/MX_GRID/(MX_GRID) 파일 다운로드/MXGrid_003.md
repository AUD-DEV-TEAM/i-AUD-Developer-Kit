## 1. 개요


MX-Grid를 xlsx, htm, docx, hwp, pdf 파일로 다운로드 받습니다.

## 2. 화면 구성

| 컨트롤 구분 | 컨트롤명 | 기능 |
| --- | --- | --- |
| Button | BTN_EXP_XLSX | MX-Grid를 xlsx 파일로 다운로드 |
| Button | BTN_EXP_HTM | MX-Grid를 htm 파일로 다운로드 |
| Button | BTN_EXP_DOCX | MX-Grid를 docx 파일로 다운로드 |
| Button | BTN_EXP_HWP | MX-Grid를 hwp 파일로 다운로드 |
| Button | BTN_EXP_PDF | MX-Grid를 pdf 파일로 다운로드 |
| MX-Grid | MX_EXPORT | 데이터 조회 |

## 3. 주요 API

| API | 설명 |
| --- | --- |
| `ExcelExportServiceCall` | Excel 형식으로 다운로드 |
| `HTMLExportServiceCall` | HTML 형식으로 다운로드 |
| `WordExportServiceCall` | Word 형식으로 다운로드 |
| `HMLExportServiceCall` | 한글(HML) 형식으로 다운로드 |
| `PDFExportServiceCall` | PDF 형식으로 다운로드 |