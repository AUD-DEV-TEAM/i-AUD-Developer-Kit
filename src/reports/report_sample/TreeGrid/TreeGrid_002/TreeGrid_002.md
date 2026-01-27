## 1. 개요

TreeGrid를 xlsx, htm, docx, hwp, pdf, csv, txt 파일로 다운로드 받습니다.

## 2. 화면 구성

| 컨트롤 구분 | 컨트롤명 | 기능 |
| --- | --- | --- |
| Button | BTN_EXP_XLSX | TreeGrid를 xlsx 파일로 다운로드 |
| Button | BTN_EXP_HTM | TreeGrid를 htm 파일로 다운로드 |
| Button | BTN_EXP_DOCX | TreeGrid를 docx 파일로 다운로드 |
| Button | BTN_EXP_HWP | TreeGrid를 hwp 파일로 다운로드 |
| Button | BTN_EXP_PDF | TreeGrid를 pdf 파일로 다운로드 |
| Button | BTN_EXP_CSV | TreeGrid를 csv 파일로 다운로드 |
| Button | BTN_EXP_TXT | TreeGrid를 txt 파일로 다운로드 |
| TreeGrid | TREE_EXPORT | 데이터 조회 |

## 3. Data Source

DB Connection : **AUD_SAMPLE_DB**

| Data Source | 테이블 | 바인딩 컨트롤 |
| --- | --- | --- |
| TREE_EXPORT | OLIST_CUSTOMERS | TREE_EXPORT |

## 4. 주요 API

| API | 설명 |
| --- | --- |
| `ExcelExportServiceCall` | Excel 형식으로 다운로드 |
| `HTMLExportServiceCall` | HTML 형식으로 다운로드 |
| `WordExportServiceCall` | Word 형식으로 다운로드 |
| `HMLExportServiceCall` | 한글(HML) 형식으로 다운로드 |
| `PDFExportServiceCall` | PDF 형식으로 다운로드 |
| `ExportServiceCall` | 내보내기 서비스를 통해 특정 컨트롤을 파일로 내보내기 |