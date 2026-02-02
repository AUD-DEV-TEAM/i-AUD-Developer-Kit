---
name: iaud-formula
description: i-AUD 계산수식(Formula) 작성 가이드. 텍스트박스, 라벨, 데이터그리드 등 컨트롤에 수식을 설정하여 값을 자동 연산하는 방법을 안내합니다. "계산수식", "수식 설정", "SUMIF", "컨트롤 참조", "그리드 수식", "JavaScript 수식" 등을 물어볼 때 사용하세요.
---

# i-AUD Formula (계산수식) 작성 가이드

i-AUD 계산수식(FormulaManager)은 텍스트박스, 라벨, 데이터그리드 등의 컨트롤에 수식을 설정하여 값을 자동 연산하는 시스템이다.
수식 내 다른 컨트롤을 참조하면 해당 컨트롤의 값 변경 시 자동으로 재연산된다.

---

## 수식 기본 문법

### 컨트롤 참조
- **`:컨트롤명`** - 다른 컨트롤의 값을 참조
- **`:전역변수명`** - 전역 파라미터(GlobalParam) 또는 Variable 참조
- **`[필드명]`** - 데이터그리드 내 필드(컬럼) 값 참조 (그리드 수식에서만 사용)

```
// 텍스트박스 txtPrice의 값 참조
:txtPrice

// 전역변수 gYear 참조
:gYear

// 그리드 필드 참조 (그리드 수식 내)
[PRICE] * [QTY]
```

### 연산자
| 연산자 | 설명 | 예시 |
|--------|------|------|
| `+` | 덧셈 | `:txtA + :txtB` |
| `-` | 뺄셈 | `[PRICE] - [DISCOUNT]` |
| `*` | 곱셈 | `[PRICE] * [QTY]` |
| `/` | 나눗셈 | `[TOTAL] / [COUNT]` |
| `%` | 나머지 | `[VALUE] % 2` |
| `=` | 비교(==) | `[STATUS] = "Y"` |
| `!=` | 불일치 | `[STATUS] != "N"` |
| `>` `<` `>=` `<=` | 비교 | `[AMT] > 1000` |

> **참고:** 수식 모드에서 단일 `=`는 비교(`==`)로 처리된다. JavaScript 모드(`return`, `var`, `{}`가 포함된 경우)에서는 대입(`=`)으로 처리된다.

### 주석
```
// 한 줄 주석
/* 여러 줄
   주석 */
```

### JavaScript 모드
수식에 `return`, `var`, `{`, `}` 키워드가 포함되면 JavaScript 모드로 동작한다.
```
var result = [PRICE] * [QTY];
if (result > 10000) {
    return result * 0.9;
} else {
    return result;
}
```

---

## 그리드 전용 키워드

| 키워드 | 설명 |
|--------|------|
| `CELL_VALUE` | 현재 셀의 기존 값 |
| `FIELD_LABEL` | 현재 컬럼의 Caption |
| `FIELD_KEY` | 현재 컬럼의 Name(필드키) |
| `IS_GRAND_TOTAL` | 현재 행이 총합계 행인지 여부 (boolean) |
| `IS_SUB_TOTAL` | 현재 행이 소계 행인지 여부 (boolean) |

```
// 총합계 행에서만 다른 계산 적용
IIF(IS_GRAND_TOTAL, [TOTAL_AMT], [PRICE] * [QTY])
```

---

## 함수 레퍼런스

### 조건/논리 함수

#### IIF(condition, trueValue, falseValue)
조건이 참이면 trueValue, 거짓이면 falseValue를 반환한다.
- `IF()`로도 사용 가능 (내부에서 `IIF`로 변환됨)
```
IIF([STATUS] = "Y", "활성", "비활성")
IIF(:txtAge > 20, "성인", "미성년")
```

#### AND(condition1, condition2, ...)
모든 조건이 참이면 `true`를 반환한다.
```
AND([AMT] > 0, [QTY] > 0)
```

#### OR(condition1, condition2, ...)
하나라도 참이면 `true`를 반환한다.
```
OR([STATUS] = "A", [STATUS] = "B")
```

#### CASE(condition1, value1, condition2, value2, ..., defaultValue)
조건-값 쌍을 순서대로 평가하여 첫 번째 참인 조건의 값을 반환한다.
인자가 홀수 개이면 마지막 값이 기본값이다.
- `SWITCH()`와 동일하게 동작한다.
```
CASE(
    [GRADE] = "A", 100,
    [GRADE] = "B", 80,
    [GRADE] = "C", 60,
    0
)
```

#### SWITCH(condition1, value1, condition2, value2, ..., defaultValue)
`CASE()`와 동일하다.

---

### 타입 변환 함수

#### TOSTRING(value, format?)
값을 문자열로 변환한다. format을 지정하면 서식을 적용한다.
```
TOSTRING(12345, "{0:N2}")        // "12,345.00"
TOSTRING(0.15, "{0:P1}")         // "15.0%"
TOSTRING(NOW(), "{0:YYYY-MM-DD}") // "2025-01-15"
```

**format 종류:**
| 포맷 | 설명 | 예시 |
|-------|------|------|
| `{0:N숫자}` | 숫자(천 단위 콤마, 소수점) | `{0:N2}` -> `1,234.56` |
| `{0:P숫자}` | 백분율 | `{0:P1}` -> `15.0%` |
| `{0:E숫자}` | 지수표현 | `{0:E2}` -> `1.23E45` |
| `{0:C숫자}` | 화폐 | `{0:C0}` -> `1,235` |
| `{0:#,###}` | 사용자 정의 숫자 | `{0:#,###.00}` |
| `{0:YYYY-MM-DD}` | 날짜 | `{0:YYYY-MM-DD}` -> `2025-01-15` |

#### TONUMBER(value, failValue)
값을 숫자로 변환한다. 변환 실패 시 failValue를 반환한다.
```
TONUMBER("123", 0)        // 123
TONUMBER("abc", -1)       // -1
TONUMBER([QTY], 0)        // 필드값을 숫자로 변환
```

#### TODATE(value, format?)
값을 날짜 문자열로 변환한다. format 미지정 시 `yyyy-MM-dd` 형식이다.
```
TODATE("20250115", "{0:yyyy-MM-dd}")   // "2025-01-15"
TODATE("20250115", "{0:yyyy/MM/dd}")   // "2025/01/15"
```

---

### 타입 체크 함수

| 함수 | 설명 | 반환 |
|------|------|------|
| `ISNULL(value)` | null 체크 | boolean |
| `ISBOOL(value)` | boolean 타입 체크 | boolean |
| `ISNUMBER(value)` | number 타입 체크 | boolean |
| `ISSTRING(value)` | string 타입 체크 | boolean |
| `ISDATETIME(value)` | Date 타입 체크 | boolean |

```
IIF(ISNULL([PRICE]), 0, [PRICE] * [QTY])
```

---

### 집계 함수 (Aggregate)

집계 함수는 데이터그리드의 데이터를 기반으로 연산한다. `:그리드컨트롤명`으로 그리드를 참조한다.

#### SUMIF(grid, fieldName, condition?)
조건에 맞는 행의 필드값 합계를 반환한다.
```
SUMIF(:DataGrid1, "AMT")                           // AMT 필드 전체 합계
SUMIF(:DataGrid1, "AMT", "[DEPT] = '영업부'")       // 영업부만 합계
SUMIF(:DataGrid1, "AMT", "[STATUS] = 'Y'")         // STATUS가 Y인 행만 합계
```

#### AVERAGEIF(grid, fieldName, condition?)
조건에 맞는 행의 필드값 평균을 반환한다.
```
AVERAGEIF(:DataGrid1, "SCORE")
AVERAGEIF(:DataGrid1, "SCORE", "[CLASS] = 'A'")
```

#### COUNTIF(grid, fieldName, condition?)
조건에 맞는 행의 수를 반환한다.
```
COUNTIF(:DataGrid1, "ID")                          // 전체 행 수
COUNTIF(:DataGrid1, "ID", "[STATUS] = 'Y'")        // STATUS가 Y인 행 수
```

#### MAXIF(grid, fieldName, condition?)
조건에 맞는 행 중 필드값의 최댓값을 반환한다.
```
MAXIF(:DataGrid1, "AMT")
MAXIF(:DataGrid1, "AMT", "[YEAR] = '2025'")
```

#### MINIF(grid, fieldName, condition?)
조건에 맞는 행 중 필드값의 최솟값을 반환한다.
```
MINIF(:DataGrid1, "AMT")
```

#### DISTINCTCOUNT(grid, fieldName)
필드의 고유값 개수를 반환한다.
```
DISTINCTCOUNT(:DataGrid1, "DEPT")
```

#### SELECTEDFIELDVALUE(grid, fieldName, defaultValue?)
그리드에서 현재 선택된 행의 필드값을 반환한다. 선택된 행이 없으면 defaultValue를 반환한다.
```
SELECTEDFIELDVALUE(:DataGrid1, "EMP_NAME", "")
SELECTEDFIELDVALUE(:DataGrid1, "DEPT_CD", "ALL")
```

#### SUMCELLS(grid, fieldName?)
그리드에서 선택된 셀들의 합계를 반환한다. fieldName을 지정하면 해당 필드만 대상으로 한다.
```
SUMCELLS(:DataGrid1)
SUMCELLS(:DataGrid1, "AMT")
```

#### COUNTCELLS(grid, fieldName?)
그리드에서 선택된 셀들의 개수를 반환한다.
```
COUNTCELLS(:DataGrid1)
```

#### AVGCELLS(grid, fieldName?)
그리드에서 선택된 셀들의 평균을 반환한다.
```
AVGCELLS(:DataGrid1, "SCORE")
```

> **참고:** SUMCELLS, COUNTCELLS, AVGCELLS는 숫자(Numeric) 타입이고 Visible한 컬럼의 셀만 대상으로 한다.

---

### 문자열 함수

#### LEFT(text, size)
문자열 왼쪽에서 size만큼 추출한다.
```
LEFT("ABCDE", 3)       // "ABC"
LEFT([CODE], 2)         // CODE 필드의 앞 2자리
```

#### RIGHT(text, size)
문자열 오른쪽에서 size만큼 추출한다.
```
RIGHT("ABCDE", 3)      // "CDE"
```

#### MID(text, startIndex, count)
startIndex부터 count만큼 추출한다 (0-based).
```
MID("ABCDE", 1, 3)     // "BCD"
```

#### LEN(text)
문자열 길이를 반환한다.
```
LEN("Hello")            // 5
LEN([NAME])             // NAME 필드의 문자열 길이
```

#### LOWER(text) / UPPER(text)
소문자/대문자로 변환한다.
```
LOWER("HELLO")          // "hello"
UPPER("hello")          // "HELLO"
```

#### FIND(text, findText, startIndex?)
text에서 findText의 위치를 반환한다 (0-based, 없으면 -1).
```
FIND("Hello World", "World")      // 6
FIND("Hello World", "xyz")        // -1
```

#### REPLACE(text, oldText, newText)
text에서 oldText를 newText로 모두 치환한다 (정규식 지원).
- `SUBSTITUTE()`로도 사용 가능하다.
```
REPLACE("Hello World", "World", "AUD")   // "Hello AUD"
REPLACE([CODE], "-", "")                  // CODE에서 하이픈 제거
```

#### TRIM(text)
앞뒤 공백을 제거한다.
```
TRIM("  Hello  ")      // "Hello"
```

---

### 수학 함수

| 함수 | 설명 | 예시 |
|------|------|------|
| `ABS(number)` | 절댓값 | `ABS(-5)` -> `5` |
| `CEIL(number)` | 올림 | `CEIL(3.2)` -> `4` |
| `FLOOR(number)` | 내림 | `FLOOR(3.8)` -> `3` |
| `ROUND(number, decimals?)` | 반올림 | `ROUND(3.456, 2)` -> `3.46` |
| `LOG(number, base?)` | 로그 | `LOG(100, 10)` -> `2` |
| `LOG10(number)` | 상용로그 | `LOG10(1000)` -> `3` |
| `EXP(number)` | e의 거듭제곱 | `EXP(1)` -> `2.718...` |
| `RAND(number)` | 0~number 사이 랜덤 | `RAND(100)` |
| `SIN(number)` | 사인 | `SIN(1.5708)` |
| `COS(number)` | 코사인 | `COS(0)` -> `1` |
| `TAN(number)` | 탄젠트 | `TAN(0.7854)` |
| `ASIN(number)` | 아크사인 | `ASIN(1)` |
| `ACOS(number)` | 아크코사인 | `ACOS(0)` |
| `ATAN(number)` | 아크탄젠트 | `ATAN(1)` |

---

### 날짜/시간 함수

#### NOW()
현재 날짜+시간을 `yyyyMMddHHmmssSSS` 형식 문자열로 반환한다.
```
NOW()       // "20250115143025123"
```

#### TODAY()
오늘 날짜를 `yyyyMMdd` 형식 문자열로 반환한다.
```
TODAY()     // "20250115"
```

#### YEAR(date), MONTH(date), DAY(date)
날짜에서 연/월/일을 추출한다. date는 Date 객체 또는 `yyyyMMdd` 이상의 문자열이다.
```
YEAR("20250115")    // 2025
MONTH("20250115")   // 1
DAY("20250115")     // 15
YEAR(TODAY())       // 현재 연도
```

#### WEEKDAY(date)
요일을 반환한다 (0=일요일, 1=월요일, ..., 6=토요일).
```
WEEKDAY("20250115")   // 3 (수요일)
```

#### HOUR(date), MINUTE(date), SECOND(date)
시/분/초를 추출한다. date는 10자리/12자리/14자리 이상의 문자열이어야 한다.
```
HOUR("20250115143025")      // 14
MINUTE("20250115143025")    // 30
SECOND("20250115143025")    // 25
```

#### DATEADD(interval, addValue, date)
날짜에 값을 더한다. interval은 숫자 상수이다.

**interval 값:**
| 상수 | 의미 |
|------|------|
| `1` | YEAR |
| `2` | MONTH |
| `5` | DAY |
| `11` | HOUR |
| `12` | MINUTE |
| `13` | SECOND |

```
DATEADD(5, 7, "20250115")        // 7일 후 -> "20250122..."
DATEADD(2, -1, "20250115")       // 1개월 전 -> "20241215..."
DATEADD(1, 1, TODAY())           // 1년 후
```

#### DATEDIFF(interval, dateA, dateB)
두 날짜 간의 차이를 반환한다 (dateB - dateA).
```
DATEDIFF(5, "20250101", "20250115")    // 14 (일)
DATEDIFF(2, "20240115", "20250115")    // 12 (개월)
DATEDIFF(1, "20200101", "20250101")    // 5 (년)
```

#### DATEPART(interval, date)
날짜의 특정 부분을 추출한다. YEAR(), MONTH() 등과 유사하나 interval로 지정한다.
```
DATEPART(1, "20250115")     // 2025 (년)
DATEPART(2, "20250115")     // 1 (월)
DATEPART(5, "20250115")     // 15 (일)
```

#### DATE(year, month, date, hour?, minute?, second?)
Date 객체를 생성한다.
```
DATE(2025, 1, 15)
DATE(2025, 1, 15, 14, 30, 0)
```

#### DATE2(year, month, date, format)
날짜를 생성하여 포맷된 문자열로 반환한다.
```
DATE2(2025, 1, 15, "{0:yyyy-MM-dd}")    // "2025-01-15"
```

---

## 수식 사용 예시

### 라벨/텍스트박스 수식
```
// 다른 컨트롤 참조하여 계산
:txtPrice * :txtQty

// 그리드 합계를 라벨에 표시
SUMIF(:DataGrid1, "AMT")

// 조건부 텍스트 표시
IIF(:txtScore >= 60, "합격", "불합격")

// 포맷 적용
TOSTRING(SUMIF(:DataGrid1, "AMT"), "{0:N0}")
```

### 데이터그리드 컬럼 수식
```
// 단가 x 수량
[PRICE] * [QTY]

// 할인율 적용 금액
[PRICE] * [QTY] * (1 - [DISCOUNT_RATE] / 100)

// 조건에 따른 등급
IIF([SCORE] >= 90, "A", IIF([SCORE] >= 80, "B", IIF([SCORE] >= 70, "C", "D")))

// CASE 사용
CASE(
    [DEPT] = "10", "영업부",
    [DEPT] = "20", "개발부",
    [DEPT] = "30", "관리부",
    "기타"
)

// 날짜 차이 계산
DATEDIFF(5, [START_DATE], [END_DATE])

// 총합계 행에서 다른 계산 적용 (GroupGrid)
IIF(IS_GRAND_TOTAL, CELL_VALUE, [PRICE] * [QTY])
```

### 복합 수식 (JavaScript 모드)
```
var price = TONUMBER([PRICE], 0);
var qty = TONUMBER([QTY], 0);
var total = price * qty;

if (total > 100000) {
    return TOSTRING(total * 0.9, "{0:N0}");
} else {
    return TOSTRING(total, "{0:N0}");
}
```

---

## 주의사항

1. **순환 참조 금지**: 수식에서 자기 자신을 참조하거나 순환 참조하면 오류가 발생한다.
2. **필드명/캡션**: 그리드 집계 함수의 fieldName 인자에는 필드명(Name) 또는 캡션(Caption) 모두 사용 가능하다.
3. **대소문자**: 함수명은 대소문자를 구분하지 않는다 (`SUMIF`, `SumIf`, `sumif` 모두 동일).
4. **문자열 리터럴**: 문자열은 큰따옴표(`"`) 또는 작은따옴표(`'`)로 감싼다.
5. **반환값**: 수식 모드에서는 `return`을 생략하면 자동으로 추가된다. JavaScript 모드에서는 명시적으로 `return`을 사용해야 한다.
6. **숫자 필드**: Numeric 타입 필드의 값이 null/undefined이면 `0`으로 처리된다.
7. **집계 함수의 condition**: condition 내에서 `[필드명]`으로 그리드의 각 행의 필드를 참조할 수 있다.