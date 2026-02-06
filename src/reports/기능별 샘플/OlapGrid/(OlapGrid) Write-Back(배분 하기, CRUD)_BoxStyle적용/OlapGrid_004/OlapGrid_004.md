## 1. 개요

OlapGrid를 xlsx, htm, docx, hwp, pdf, csv, txt 파일로 다운로드 받습니다.

## 2. 화면 구성

| 컨트롤 구분 | 컨트롤명 | 기능 |
| --- | --- | --- |
| Button | BTN_EXP_XLSX | OlapGrid를 xlsx 파일로 다운로드 |
| Button | BTN_EXP_HTM | OlapGrid를 htm 파일로 다운로드 |
| Button | BTN_EXP_DOCX | OlapGrid를 docx 파일로 다운로드 |
| Button | BTN_EXP_HWP | OlapGrid를 hwp 파일로 다운로드 |
| Button | BTN_EXP_PDF | OlapGrid를 pdf 파일로 다운로드 |
| Button | BTN_EXP_CSV | OlapGrid를 csv 파일로 다운로드 |
| Button | BTN_EXP_TXT | OlapGrid를 txt 파일로 다운로드 |
| OlapGrid | OLAP_EXPORT | 데이터 조회 |

## 3. Data Source

DB Connection : **AUD_SAMPLE_DB**

| Data Source | 테이블 | 바인딩 컨트롤 |
| --- | --- | --- |
| OLAP_EXPORT | OLIST_CUSTOMERS | OLAP_EXPORT |

## 4. 주요 API

| API | 설명 |
| --- | --- |
| `ExcelExportServiceCall` | Excel 형식으로 다운로드 |
| `HTMLExportServiceCall` | HTML 형식으로 다운로드 |
| `WordExportServiceCall` | Word 형식으로 다운로드 |
| `HMLExportServiceCall` | 한글(HML) 형식으로 다운로드 |
| `PDFExportServiceCall` | PDF 형식으로 다운로드 |
| `ExportServiceCall` | 내보내기 서비스를 통해 특정 컨트롤을 파일로 내보내기 |