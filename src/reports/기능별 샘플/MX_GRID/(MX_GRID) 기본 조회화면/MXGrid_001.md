## 1. 개요

---

MXGrid 기반 데이터 조회

## 2. 화면 구성

---

| 컨트롤 구분 | 컨트롤명   | 기능                                      |
| ----------- | ---------- | ----------------------------------------- |
| Group       | HEADER     | 화면 상단에 보고서 제목 및 조회 조건 배치 |
| Label       | LBL_TTL_1  | 보고서 제목                               |
| Label       | LBL_COND_1 | 조회 조건 제목                            |
| ComboBox    | VS_ORD_STS | 조회 조건 선택용 ComboBox                 |
| Button      | BTN_REF    | 조회 실행                                 |
| MXGrid      | MX         | MXGrid (엑셀) 기반 데이터 조회            |

## 3. 조회 조건 및 파라미터

---

- 조회조건

```markdown
VS_ORD_STS
```

- 파라미터

```jsx

```

## 4. Data Source

---

DB Connection : AUD_SAMPLE_DB

| Data Source | 테이블       | 바인딩 컨트롤 |
| ----------- | ------------ | ------------- |
| MX_ORD      | OLIST_ORDERS | MX            |

## 5. 주요 API

---

| API         | 설명                                                 |
| ----------- | ---------------------------------------------------- |
| `doRefresh` | 컨트롤에 바인딩된 데이터 조회(Refresh)하는 기능 수행 |
