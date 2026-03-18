# DataSource SQL 작성 프롬프트 예제

> `DataSource/` 폴더의 `.sql` 파일에서 파라미터 바인딩, Dynamic SQL을 작성할 때 사용합니다.

---

## 핵심 포인트

- **DataSource 이름**은 `.design.json`에 정의된 이름과 일치해야 함
- **파라미터 바인딩 문법**이 일반 SQL과 다름 (`@AND`, `@OR`, `:파라미터명`)
- **Dynamic SQL**은 i-AUD 전용 지시어 사용
- 관련 Skill: `/iaud-sql-guide`

---

## 예제 1: 기본 파라미터 바인딩 SQL

```
src/reports/Work/OrderMgmt/DataSource/DS_ORDERS.sql 을 만들어줘.

<DataSource 정보>
- 이름: DS_ORDERS
- DB 연결: AUD_SAMPLE_DB
- 바인딩 컨트롤:
  - :FROM_DATE → TXT_FROM_DATE (TextBox)
  - :TO_DATE → TXT_TO_DATE (TextBox)
  - :KEYWORD → TXT_KEYWORD (TextBox)

<SQL 구조>
- TB_ORDER 테이블에서 주문 목록 조회
- ORDER_DATE BETWEEN :FROM_DATE AND :TO_DATE
- KEYWORD가 비어있지 않으면 ORDER_NAME LIKE '%' || :KEYWORD || '%'

i-AUD의 @AND 조건부 바인딩 문법을 사용해줘
/iaud-sql-guide 참조
```

---

## 예제 2: Dynamic SQL (@AND/@OR 패턴)

```
DS_EMP_SEARCH.sql을 만들어줘.

<설명>
여러 검색 조건이 선택적으로 적용되는 Dynamic SQL

<조건>
- :DEPT_CODE → 비어있으면 조건 무시
- :EMP_NAME → 비어있으면 조건 무시
- :STATUS → 비어있으면 조건 무시, 여러 값 가능 (IN 조건)
- :FROM_DATE, :TO_DATE → 둘 다 있을 때만 날짜 범위 조건

i-AUD SQL의 @AND 문법:
  WHERE 1=1
  @AND DEPT_CODE = :DEPT_CODE
  @AND EMP_NAME LIKE '%' || :EMP_NAME || '%'

이 패턴으로 작성해줘. /iaud-sql-guide 참조
```

---

## 예제 3: 여러 DataSource가 있는 보고서

```
아래 DataSource SQL 파일들을 모두 만들어줘.

<보고서>
src/reports/Work/SalesDashboard/

<DataSource 목록>
1. DS_MONTHLY_SALES.sql
   - 월별 매출 합계 (올해, 전년 비교)
   - 파라미터: :YEAR

2. DS_TOP_PRODUCTS.sql
   - 매출 상위 10개 제품
   - 파라미터: :YEAR, :MONTH

3. DS_REGION_SALES.sql
   - 지역별 매출 집계
   - 파라미터: :YEAR, :QUARTER

각 SQL에 i-AUD 파라미터 바인딩 문법 적용
/iaud-sql-guide 참조
```

---

## 예제 4: 서브쿼리 + 집계 함수

```
DS_SALES_SUMMARY.sql을 만들어줘.

<요구사항>
- 부서별, 월별 매출 요약 크로스탭 구조
- 파라미터: :YEAR, :DEPT_CODE (선택)
- GROUP BY 부서코드, 월
- 전월 대비 증감률 계산
- NULL은 0으로 치환 (COALESCE)

Oracle DB 문법으로 작성
/iaud-sql-guide 참조
```

---

## i-AUD SQL 핵심 문법 요약

프롬프트에 아래를 포함하면 AI가 i-AUD SQL 문법을 정확히 사용합니다:

```
i-AUD DataSource SQL 문법:
- 파라미터: :파라미터명 (컨트롤 바인딩 또는 GlobalParam)
- 조건부 AND: @AND 컬럼 = :파라미터  (파라미터가 비어있으면 해당 줄 무시)
- 조건부 OR: @OR 컬럼 = :파라미터
- WHERE절 시작: WHERE 1=1 (조건부 AND/OR 앞에 사용)
- IN 조건: @AND 컬럼 IN (:파라미터)  (콤마 구분 문자열 자동 분리)
```
