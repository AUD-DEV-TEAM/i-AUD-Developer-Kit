## 1. 개요

Portal에서 새 탭으로 보고서를 오픈하며, 파라미터를 전달합니다.

## 2. 화면 구성

| 컨트롤 구분 | 컨트롤명 | 기능 |
| --- | --- | --- |
| TextBox | TextBox | 파라미터로 전달할 컨트롤 |
| NumberBox | NumberBox | 파라미터로 전달할 컨트롤 |
| Calendar | Calendar | 파라미터로 전달할 컨트롤 |
| CalendarYMFromTo | CalendarYMFromTo | 파라미터로 전달할 컨트롤 |
| Button | BTN_SHOW | 팝업 오픈 |

## 3. 조회 조건 및 파라미터

- 파라미터

```
VS_TextBox
VN_NumberBox
VS_Calendar
VS_CalendarYMFromTo
```

## 4. 주요 API

| API | 설명 |
| --- | --- |
| `CustomReportOpen` | 포탈에서 새 탭으로 보고서 오픈 |