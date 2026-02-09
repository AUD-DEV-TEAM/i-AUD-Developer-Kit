# 샘플 데이터 차트 예제

10건의 월별 매출 샘플 데이터를 조회하고 Highchart로 시각화하는 예제입니다.

## 화면 구성

이 예제를 실행하려면 **i-AUD Designer**에서 다음 컨트롤을 배치해야 합니다:

### 필요한 컨트롤

1. **Button (버튼)**
   - Name: `btnSearch`
   - Text: "데이터 조회"
   - 위치: 화면 상단

2. **Label (라벨)**
   - Name: `lblSummary`
   - Text: "" (빈 값)
   - 위치: 버튼 아래
   - 용도: 요약 정보 표시

3. **DataGrid (데이터그리드)**
   - Name: `gridSales`
   - 위치: 화면 왼쪽 또는 상단
   - 컬럼:
     - MONTH (문자열) - 월
     - SALES (숫자) - 매출
     - PROFIT (숫자) - 이익
     - COST (숫자) - 원가
     - GROWTH_RATE (숫자) - 성장률(%)

4. **HighChart_C (하이차트)**
   - Name: `chartSales`
   - 위치: 화면 오른쪽 또는 하단
   - 크기: 충분한 크기 (최소 600x400)

## 레이아웃 예시

```
┌─────────────────────────────────────────────┐
│  [데이터 조회 버튼]                           │
│  요약 정보: 총 매출: xxx | 총 이익: xxx ...  │
├──────────────────┬──────────────────────────┤
│                  │                          │
│   DataGrid       │      HighChart           │
│   (그리드)       │      (막대 차트)         │
│                  │                          │
│                  │                          │
└──────────────────┴──────────────────────────┘
```

## 사용 방법

### 1. i-AUD Designer에서 화면 구성

1. i-AUD Designer를 실행합니다
2. 새 보고서를 생성하거나 기존 보고서를 엽니다
3. 위에서 설명한 4개의 컨트롤을 배치합니다
4. 각 컨트롤의 Name 속성을 정확히 설정합니다

### 2. VS Code에서 스크립트 작성

1. VS Code에서 `AUD: Download Report` 명령 실행
2. 보고서를 다운로드합니다
3. 이 폴더의 스크립트 파일들을 복사합니다:
   - `SampleDataChart.script.ts` → 클라이언트 스크립트
   - `ServerScript/GetSampleData.ts` → 서버 스크립트

### 3. 배포 및 실행

1. 터미널에서 `tsc --w` 실행 (TypeScript 자동 빌드)
2. `AUD: Save Script` (Ctrl+Alt+S) - 스크립트만 서버에 배포
3. `AUD: Run Designer` (Ctrl+Alt+D) - 브라우저에서 실행

## 기능 설명

### 서버 스크립트 (GetSampleData.ts)

- 10건의 월별 매출 샘플 데이터를 생성합니다
- 각 월별로 매출, 이익, 원가, 성장률을 랜덤하게 생성합니다
- 매출: 이전 달 대비 -10% ~ +20% 범위로 변동
- 원가: 매출의 60~70%
- 이익: 매출 - 원가

### 클라이언트 스크립트 (SampleDataChart.script.ts)

1. **데이터 조회**
   - 서버 스크립트 호출하여 샘플 데이터 조회
   - 그리드에 데이터 표시

2. **차트 표시**
   - Highchart 컬럼 차트로 매출/이익/원가를 시각화
   - 툴팁에서 상세 정보 표시
   - 천단위 구분 기호 적용

3. **요약 정보**
   - 총 매출, 총 이익, 이익률, 평균 성장률 계산
   - 라벨에 표시

## 차트 커스터마이징

`displayChart` 함수에서 차트 설정을 변경할 수 있습니다:

```typescript
const chartConfig = {
    chart: {
        type: 'column'  // 차트 타입: column, line, bar, area 등
    },
    // ... 기타 설정
};
```

### 차트 타입 변경 예시

- `type: 'line'` - 라인 차트
- `type: 'bar'` - 가로 막대 차트
- `type: 'area'` - 영역 차트
- `type: 'pie'` - 파이 차트 (시리즈 구조 변경 필요)

## 참고

- Highchart 공식 문서: https://www.highcharts.com/
- i-AUD HighChart_C API: `types/aud/control/HighChart_C.ts`
