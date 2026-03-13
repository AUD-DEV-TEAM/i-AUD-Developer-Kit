## 1. 개요

---

Slicer 선택 조건에 따라 OlapGrid 및 Chart 데이터 동시 조회

## 2. 화면 구성

---

| 컨트롤 구분 | 컨트롤명  | 기능                                                           |
| ----------- | --------- | -------------------------------------------------------------- |
| Group       | HEADER    | 화면 상단에 보고서 제목 및 조회 조건 배치                      |
| Label       | LBL_TTL_1 | 보고서 제목                                                    |
| Button      | BTN_REF   | 조회 실행                                                      |
| OlapGrid    | OLAP      | OlapGrid 기반 데이터 시각화                                    |
| Chart       | CHT       | 막대 차트 기반 데이터 시각화                                   |
| Slicer      | Slicer    | Slicer로 선택한 조회 조건에 따라 OlapGrid 및 Chart 데이터 조회 |

## 3. 조회 조건 및 파라미터

---

- 조회조건

```jsx

```

- 파라미터

```jsx

```

## 4. Data Source

---

DB Connection : AUD_SAMPLE_DB

| Data Source                    | 테이블               | 바인딩 컨트롤 |
| ------------------------------ | -------------------- | ------------- |
| OLAP_PAYMENT                   | OLIST_ORDER_PAYMENTS | OLAP          |
| OLAP (OlapGrid를 Chart와 연결) |                      | CHT           |

## 5. 주요 API

---

| API         | 설명                                                 |
| ----------- | ---------------------------------------------------- |
| `doRefresh` | 컨트롤에 바인딩된 데이터 조회(Refresh)하는 기능 수행 |
