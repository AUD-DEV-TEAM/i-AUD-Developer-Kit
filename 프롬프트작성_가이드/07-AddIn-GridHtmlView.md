# AddIn GridHtmlView 개발 프롬프트 예제

> AddIn 컨트롤의 GridHtmlView 클래스를 사용하여 DataGrid 데이터를 HTML 카드/리스트로 표현할 때 사용합니다.

---

## 핵심 포인트

- **GridHtmlView**는 DataGrid의 데이터를 HTML 템플릿으로 렌더링하는 컴포넌트
- `aud-for`, `aud-bind`, `aud-on-click` 등 전용 디렉티브 사용
- **반드시 `OnComponentClassLoaded` 이벤트 내에서 접근**
- DataGrid를 바인딩해야 데이터가 표시됨
- 관련 Skill: `/iaud-grid-html-view`

---

## 예제 1: 카드 리스트 뷰

```
ADI_CARD_LIST (AddIn, GridHtmlView)에 주문 카드 리스트를 만들어줘.

<바인딩 그리드>
- GRD_ORDERS (DataGrid): 주문 데이터

<카드 디자인>
- 각 카드: 흰 배경, 둥근 모서리, 그림자, 패딩 16px
- 상단: ORDER_NAME (Bold, 16px) + STATUS 뱃지 (컬러 태그)
- 중앙: CUSTOMER_NAME, ORDER_DATE
- 하단: AMOUNT (오른쪽 정렬, 숫자 포맷)
- 카드 클릭 시 해당 행 선택 (aud-on-click 사용)

<레이아웃>
- 카드 그리드 배치 (CSS Grid, 3열)
- 반응형: 너비에 따라 2열 또는 1열

<aud 디렉티브 사용>
- aud-for="ROWS" 로 행 반복
- aud-bind="필드명" 으로 값 바인딩
- aud-on-click="SELECT_ROW" 로 행 선택
- aud-class="STATUS:active" 로 조건부 스타일

/iaud-grid-html-view 참조
```

---

## 예제 2: 마스터-디테일 뷰

```
ADI_DETAIL (AddIn, GridHtmlView)에 선택된 행의 상세 정보를 표시해줘.

<바인딩 그리드>
- GRD_ORDERS (DataGrid)

<상세 뷰 디자인>
- aud-for="CURRENT_ROW" 사용 (현재 선택 행)
- 2컬럼 폼 레이아웃:
  - 좌측: 라벨 (회색, 12px)
  - 우측: 값 (검정, 14px)
- 필드: ORDER_ID, ORDER_NAME, CUSTOMER, DATE, AMOUNT, STATUS, MEMO
- STATUS에 따라 뱃지 색상 다르게 표시

<동작>
- GRD_ORDERS에서 행 선택 시 자동으로 상세 갱신
- 데이터 없으면 "항목을 선택하세요" 안내 메시지

/iaud-grid-html-view 참조
```

---

## 예제 3: 입력 폼 뷰 (aud-model 양방향 바인딩)

```
ADI_EDIT_FORM (AddIn, GridHtmlView)에 편집 가능한 폼을 만들어줘.

<바인딩 그리드>
- GRD_EMP (DataGrid, 편집 가능)

<폼 구성>
- aud-for="CURRENT_ROW" 사용
- aud-model="필드명"으로 양방향 바인딩:
  - EMP_NAME: input[type=text]
  - DEPT_CODE: select (옵션은 addFunction으로 동적 생성)
  - SALARY: input[type=number]
  - MEMO: textarea
- 폼 하단에 "적용" 버튼 (aud-on-click 으로 그리드 업데이트)

/iaud-grid-html-view 참조
```

---

## 예제 4: 페이징이 있는 리스트

```
ADI_PAGED_LIST (AddIn, GridHtmlView)에 페이징 카드 리스트를 만들어줘.

<바인딩 그리드>
- GRD_ITEMS (DataGrid)

<기능>
- 페이지당 12개 카드 표시
- 하단에 페이지 네비게이션 (이전/다음/페이지 번호)
- GoToPage(pageNum) 으로 페이지 이동
- 현재 페이지 번호 표시

/iaud-grid-html-view 참조
```

---

## GridHtmlView 디렉티브 요약

프롬프트에 아래를 포함하면 AI가 디렉티브를 정확히 사용합니다:

```
GridHtmlView 템플릿 디렉티브:
- aud-for="ROWS"          : 전체 행 반복
- aud-for="CURRENT_ROW"   : 현재 선택 행
- aud-bind="필드명"        : 텍스트 바인딩 (읽기 전용)
- aud-model="필드명"       : 양방향 바인딩 (입력 필드)
- aud-on-click="함수명"   : 클릭 이벤트 (addFunction으로 등록)
- aud-on-click="SELECT_ROW": 행 선택 (내장)
- aud-class="필드명:클래스" : 조건부 CSS 클래스
- aud-attr-src="필드명"    : 속성 바인딩 (이미지 src 등)
```
