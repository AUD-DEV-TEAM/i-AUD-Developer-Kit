# 영업 관리 시스템 (Sales Management System)

## 프로젝트 개요
IT 장비 및 소프트웨어 판매 회사를 위한 영업 관리 시스템입니다.
부서, 직원, 고객, 제품, 재고, 영업계획, 영업실적을 통합 관리합니다.

## 기술 스택
- **Database**: PostgreSQL (표준 SQL)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **프로토타입**: 정적 HTML/JS (Mock 데이터 사용)

## 데이터베이스 스키마

### 테이블 구조
| 테이블명 | 설명 | 주요 컬럼 |
|---------|------|----------|
| SM_COMMON_CODE | 공통 코드 관리 | GROUP_CD, CODE, CODE_NAME |
| SM_DEPARTMENT | 부서 정보 | DEPT_ID, DEPT_NAME, PARENT_DEPT_ID |
| SM_EMPLOYEE | 직원 정보 | EMP_ID, EMP_NAME, DEPT_ID, JOB_GRADE |
| SM_CUSTOMER | 고객/거래처 | CUST_ID, CUST_NAME, CUST_TYPE, CUST_GRADE |
| SM_PRODUCT | 제품 정보 | PROD_ID, PROD_NAME, CATEGORY, STD_PRICE |
| SM_INVENTORY | 재고 관리 | INV_ID, PROD_ID, CURR_QTY, SAFE_QTY |
| SM_SALES_PLAN | 영업 계획 | PLAN_ID, EMP_ID, PROD_ID, TARGET_AMT |
| SM_SALES_PERFORMANCE | 영업 실적 | SALES_ID, CUST_ID, EMP_ID, NET_AMOUNT |

### 공통 코드 그룹
- `JOB_GRADE`: 직급 (사원, 대리, 과장, 차장, 부장)
- `JOB_ROLE`: 직무 (영업, 마케팅, 지원)
- `EMP_STATUS`: 재직상태 (재직중, 휴직, 퇴직)
- `CUST_TYPE`: 고객유형 (법인, 개인, 공공)
- `CUST_GRADE`: 고객등급 (VIP, GOLD, SILVER)
- `PROD_CATEGORY`: 제품 카테고리
- `STD_UNIT`: 단위 (EA, BOX, SET)
- `PLAN_STATUS`: 계획상태 (초안, 확정)
- `PAY_METHOD`: 결제수단 (현금, 카드, 계좌이체, 외상)
- `SALES_STATUS`: 판매상태 (완료, 반품, 대기)

## 파일 구조

```
test/
├── CLAUDE.md                           # 프로젝트 문서
├── 영업 관리 시스템 테이블 생성 스크립트.sql  # DDL + 공통코드 초기값
├── SM_DEPARTMENT.DATA.SQL              # 부서 샘플 데이터 (12건)
├── SM_EMPLOYEE.DATA.SQL                # 직원 샘플 데이터 (25건)
├── SM_CUSTOMER.DATA.SQL                # 고객 샘플 데이터 (18건)
├── SM_PRODUCT.DATA.SQL                 # 제품 샘플 데이터 (100건)
├── SM_INVENTORY.DATA.SQL               # 재고 샘플 데이터 (103건)
├── SM_SALES_PLAN.DATA.SQL              # 영업계획 샘플 데이터 (70건)
├── SM_SALES_PERFORMANCE.DATA.SQL       # 영업실적 샘플 데이터 (63건)
└── prototype/                          # HTML/JS 프로토타입
    ├── index.html                      # 메인 대시보드
    ├── css/
    │   └── style.css                   # 공통 스타일
    ├── js/
    │   ├── mock-data.js                # Mock 데이터
    │   ├── common.js                   # 공통 함수
    │   └── dashboard.js                # 대시보드 로직
    └── pages/
        ├── employees.html              # 직원 관리
        ├── customers.html              # 고객 관리
        ├── products.html               # 제품 관리
        ├── inventory.html              # 재고 관리
        ├── sales-plan.html             # 영업 계획
        └── sales-performance.html      # 영업 실적
```

## 제품 카테고리

| 카테고리 | PROD_ID 범위 | 제품 수 |
|---------|-------------|--------|
| ELECTRONICS (전자제품) | PROD001-018 | 18개 |
| SOFTWARE (소프트웨어) | PROD020-032 | 13개 |
| NETWORK (네트워크) | PROD040-057 | 18개 |
| PERIPHERAL (주변기기) | PROD060-093 | 34개 |
| SUPPLIES (소모품) | PROD100-114 | 15개 |
| SERVER (서버/스토리지) | PROD120-134 | 15개 |
| 단종품 | PROD197-199 | 3개 |

## 조직 구조

```
경영지원본부 (DEPT001)
├── 인사팀 (DEPT011)
├── 재무팀 (DEPT012)
└── 총무팀 (DEPT013)

영업본부 (DEPT002)
├── 영업1팀 (DEPT021) - 법인영업
├── 영업2팀 (DEPT022) - 공공영업
└── 영업3팀 (DEPT023) - 개인/소상공인

마케팅본부 (DEPT003)
├── 마케팅팀 (DEPT031)
└── 고객지원팀 (DEPT032)

기술지원본부 (DEPT004)
├── 기술지원팀 (DEPT041)
└── 물류팀 (DEPT042)
```

## 주요 고객

### VIP 고객
- 삼성전자, LG전자, 현대자동차, 서울특별시청, 정미경(개인)

### GOLD 고객
- 테크솔루션, 스마트시스템, 디지털웍스, 한국전력공사, 건강보험공단, 박민수(개인)

### SILVER 고객
- 미래정보, 그린테크, 블루오션, 김철수(개인), 이영희(개인)

## 개발 가이드

### 컬럼 사이즈 규칙
- 코드성 데이터: `VARCHAR(50)`
- 이름: `VARCHAR(256)`
- 설명/비고: `VARCHAR(1024)`

### Audit 컬럼
모든 테이블에 다음 컬럼 포함:
- `CREATED_AT`: 생성일시
- `CREATED_BY`: 생성자
- `UPDATED_AT`: 수정일시
- `UPDATED_BY`: 수정자

### 공통 코드 규칙
- 그룹 정의: `CODE = '$'`로 저장
- 실제 코드: 영문 대문자 사용

## 향후 개발 계획

1. **Phase 1**: HTML/JS 프로토타입 (현재)
2. **Phase 2**: Backend API 개발 (Node.js/Express 또는 Spring Boot)
3. **Phase 3**: React/Vue.js 프론트엔드
4. **Phase 4**: 리포트 및 대시보드 고도화
5. **Phase 5**: 모바일 앱 개발
