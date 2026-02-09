## 1. 개요

---

DataGrid와 Chart 활용해 특정 기간 내 데이터 조회

## 2. 화면 구성

---

| 컨트롤 구분         | 컨트롤명                     | 기능                                      |
| ------------------- | ---------------------------- | ----------------------------------------- |
| Group               | HEADER                       | 화면 상단에 보고서 제목 및 조회 조건 배치 |
| Label               | LBL_TTL_1                    | 보고서 제목                               |
| Label               | LBL_COND_1                   | 조회 조건 제목                            |
| Calendar (D FromTo) | VS_YMD_FROM,                 |
| VS_YMD_TO           | 조회 시작일자, 종료일자 선택 |
| Button              | BTN_REF                      | 조회 실행                                 |
| DataGrid            | GRD                          | DataGrid(표) 기반 데이터 시각화           |
| Chart               | CHT                          | 막대 차트 기반 데이터 시각화              |

## 3. 조회 조건 및 파라미터

---

- 조회조건

```markdown
VS_YMD_FROM
VS_YMD_TO
```

- 파라미터

```jsx

```

## 4. Data Source

---

DB Connection : AUD_SAMPLE_DB

| Data Source    | 테이블        | 바인딩 컨트롤 |
| -------------- | ------------- | ------------- |
| GRD_ITEM_SALES | OLIST_ORDERS, |

OLIST_ORDER_PAYMENTS,
OLIST_ORDER_ITEMS | GRD |
| CHT_ITEM_SALES_TOP5 | OLIST_ORDERS,
OLIST_ORDER_PAYMENTS,
OLIST_ORDER_ITEMS | CHT |

## 5. 주요 API

---

| API                      | 설명                                                 |
| ------------------------ | ---------------------------------------------------- |
| `OnDocumentLoadComplete` | 문서 로드 된 후 AutoRefresh 수행 전 발생             |
| `doRefresh`              | 컨트롤에 바인딩된 데이터 조회(Refresh)하는 기능 수행 |
