# AddIn BaseControl 개발 프롬프트 예제

> AddIn 컨트롤의 BaseControl 클래스를 사용하여 HTML/CSS 기반 자유 UI를 개발할 때 사용합니다.

---

## 핵심 포인트

- **BaseControl**은 AddIn 컨트롤 안에서 순수 HTML/CSS로 자유 UI를 만드는 방식
- `addCSS()`, `addHTML()`, `addFunction()`으로 구성
- **반드시 `OnComponentClassLoaded` 이벤트 내에서 접근**
- `innerHTML` 사용 금지 → `clearHTML()` + `addHTML()` 사용
- 관련 Skill: `/iaud-base-control`

---

## 예제 1: 대시보드 카드 UI

```
OrderMgmt.script.ts에서 ADI_DASHBOARD (AddIn, BaseControl)에
대시보드 요약 카드 UI를 만들어줘.

<카드 구성>
- 4개 카드 가로 배치 (Flexbox)
  - "총 주문": DS_SUMMARY의 TOTAL_COUNT 값
  - "처리 완료": DS_SUMMARY의 COMPLETE_COUNT 값, 녹색
  - "처리 중": DS_SUMMARY의 PENDING_COUNT 값, 주황색
  - "오류": DS_SUMMARY의 ERROR_COUNT 값, 빨간색

<디자인>
- 각 카드: 흰 배경, 둥근 모서리, 그림자
- 상단에 아이콘 또는 컬러 바
- 숫자는 크게 (24px Bold), 라벨은 작게 (12px Gray)
- 반응형: 컨테이너 너비에 따라 카드 크기 조절

<데이터 연동>
- Matrix.RunScript 등으로 DS_SUMMARY 조회 완료 후
- BaseControl의 addFunction으로 등록한 updateCards 함수를 호출하여 값 갱신

/iaud-base-control 참조
```

---

## 예제 2: 탭 바 UI

```
ADI_TAB_BAR (AddIn, BaseControl)에 커스텀 탭 바를 만들어줘.

<탭 목록>
- "기본정보", "상세내역", "첨부파일", "이력"

<동작>
- 탭 클릭 시 활성 탭 스타일 변경 (하단 파란 보더)
- 탭 클릭 시 addFunction으로 등록한 onTabClick(tabIndex) 호출
- 클라이언트 스크립트에서 onTabClick 받아서 TAB_DETAIL (TabControl) 전환

<디자인>
- 수평 배치, 탭 간 간격 없음
- 활성 탭: Bold, 하단 2px 파란 보더
- 비활성 탭: 회색 텍스트
- 호버 시 배경색 변경

/iaud-base-control 참조
```

---

## 예제 3: 리사이저블 분할 패널

```
ADI_RESIZER (AddIn, BaseControl)에 좌우 분할 패널을 만들어줘.

<구조>
- 좌측 영역 (기본 40%)
- 드래그 가능한 분할선 (5px, 회색)
- 우측 영역 (나머지)

<동작>
- 분할선을 마우스로 드래그하면 좌우 비율 조절
- 최소 너비 제한: 좌 200px, 우 300px
- 분할선 호버 시 커서 col-resize

/iaud-base-control 참조
```

---

## 예제 4: 필터 칩 UI

```
ADI_FILTER (AddIn, BaseControl)에 필터 칩 UI를 만들어줘.

<동작>
- 여러 필터 조건을 칩(태그) 형태로 표시
- 각 칩에 X 버튼 → 클릭 시 해당 필터 제거
- "필터 초기화" 버튼 → 모든 칩 제거
- addFunction("addChip") → 외부에서 칩 추가 가능
- addFunction("getFilters") → 현재 활성 필터 목록 반환
- 칩 추가/제거 시 onFilterChanged 콜백으로 외부 알림

/iaud-base-control 참조
```

---

## BaseControl 패턴 요약

프롬프트에 아래를 포함하면 AI가 올바른 패턴을 적용합니다:

```
BaseControl 개발 규칙:
1. OnComponentClassLoaded 내에서 getScriptClass() as BaseControl 으로 접근
2. addCSS()로 스타일 주입, addHTML()로 마크업 주입
3. addFunction("funcName", callback)으로 외부 호출 가능한 함수 등록
4. innerHTML 사용 금지 → clearHTML() + addHTML() 사용
5. OnResize 이벤트에서 크기 변경 대응
6. Element 직접 접근은 최소화, 컴포넌트 API 우선 사용
```
