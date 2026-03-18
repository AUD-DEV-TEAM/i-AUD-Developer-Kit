# ExternalComponent 개발 프롬프트 예제

> 외부 JS 라이브러리(ECharts, CodeMirror 등)를 i-AUD 플러그인 컴포넌트로 래핑할 때 사용합니다.

---

## 핵심 포인트

- **ExternalComponent**는 외부 라이브러리를 IComponentControl 인터페이스로 래핑
- `.ts` (구현) + `.manifest` (메타데이터) + `.css` (스타일) 3파일 세트
- `src/reports/extcomponent/` 폴더에 컴포넌트 배치
- `src/reports/extcomponent_samples/` 에 샘플 보고서 배치
- 관련 Skill: `/iaud-extcomponent`, `/iaud-addin-component-create`

---

## 예제 1: 새 ExternalComponent 만들기

```
ECharts 기반 Treemap 차트 컴포넌트를 만들어줘.

<컴포넌트 정보>
- 이름: TreemapChart
- 폴더: src/reports/extcomponent/treemapComponent/
- 파일:
  - treemapComponent.ts (구현)
  - treemapComponent.manifest (메타데이터)
  - treemapComponent.css (스타일)

<기능>
- IComponentControl 인터페이스 구현
- Create(): ECharts 인스턴스 생성, 컨테이너에 렌더링
- Update(opt): 옵션 객체로 차트 데이터 갱신
- Resize(): 컨테이너 크기 변경 시 차트 리사이즈
- Dispose(): ECharts 인스턴스 해제
- SetValue(data): 외부에서 트리맵 데이터 설정
- GetValue(): 현재 차트 옵션 반환

<외부 라이브러리>
- echarts.min.js (CDN 또는 로컬 경로)

/iaud-extcomponent 참조
기존 echartsComponent를 참고해서 동일한 패턴으로 만들어줘
```

---

## 예제 2: ExternalComponent 사용하는 보고서 만들기

```
Treemap 컴포넌트를 사용하는 샘플 보고서를 만들어줘.

<보고서 정보>
- 보고서명: TreemapDemo
- 폴더: src/reports/extcomponent_samples/TreemapDemo/

<화면 구성>
- 상단 (높이 40px): BTN_SEARCH (Button), CMB_YEAR (ComboBox)
- 하단: EC_TREEMAP (ExternalComponent, ComponentType: "TreemapChart")

<동작>
1. 조회 시 DS_SALES 데이터를 가져옴
2. 데이터를 트리맵 구조로 변환 (카테고리 > 제품 > 매출)
3. EC_TREEMAP.SetValue(treeData) 호출

<주의>
- ExternalComponent는 OnComponentClassLoaded 이벤트 내에서 접근
- .design.json에 ComponentType과 ComponentPath 설정 필요
```

---

## 예제 3: 기존 ExternalComponent 커스터마이징

```
echartsComponent를 커스터마이징해서 다크 모드를 지원하도록 수정해줘.

<대상 파일>
src/reports/extcomponent/echartsComponent/echartsComponent.ts

<변경 사항>
- SetTheme(theme: "light" | "dark") 메서드 추가
- 다크 모드: 배경 #1e1e1e, 텍스트 #ffffff, 그리드선 #333
- 라이트 모드: 기본 ECharts 테마
- Update() 호출 시 현재 테마 유지

기존 코드를 먼저 읽고 패턴에 맞게 수정해줘
```

---

## ExternalComponent 파일 구조 요약

```
컴포넌트 3파일 세트:

1. [name].ts — IComponentControl 구현
   - Create(parent, name): 초기화, DOM 생성
   - Dispose(): 정리
   - Resize(): 크기 조절
   - Update(opt): 데이터/옵션 갱신
   - GetProperties(): 디자이너 속성 목록 (선택)

2. [name].manifest — 메타데이터 (JSON)
   - Name, Version, Description
   - Dependencies (외부 JS/CSS 경로)
   - Properties (노출 속성 정의)

3. [name].css — 컴포넌트 스타일
   - 컨테이너, 내부 요소 스타일
```
