/**
 * 영업 관리 시스템 - Mock 데이터
 * SQL 샘플 데이터 기반 JavaScript 객체
 */

// 공통 코드
const COMMON_CODES = {
    JOB_GRADE: [
        { code: 'STAFF', name: '사원' },
        { code: 'SENIOR', name: '대리' },
        { code: 'MANAGER', name: '과장' },
        { code: 'DEPUTY', name: '차장' },
        { code: 'DIRECTOR', name: '부장' }
    ],
    JOB_ROLE: [
        { code: 'SALES', name: '영업' },
        { code: 'MARKETING', name: '마케팅' },
        { code: 'SUPPORT', name: '지원' }
    ],
    EMP_STATUS: [
        { code: 'ACTIVE', name: '재직중' },
        { code: 'LEAVE', name: '휴직' },
        { code: 'RETIRED', name: '퇴직' }
    ],
    CUST_TYPE: [
        { code: 'CORP', name: '법인' },
        { code: 'PERSONAL', name: '개인' },
        { code: 'PUBLIC', name: '공공' }
    ],
    CUST_GRADE: [
        { code: 'VIP', name: 'VIP' },
        { code: 'GOLD', name: 'GOLD' },
        { code: 'SILVER', name: 'SILVER' }
    ],
    PROD_CATEGORY: [
        { code: 'ELECTRONICS', name: '전자제품' },
        { code: 'SOFTWARE', name: '소프트웨어' },
        { code: 'NETWORK', name: '네트워크' },
        { code: 'PERIPHERAL', name: '주변기기' },
        { code: 'SUPPLIES', name: '소모품' },
        { code: 'SERVER', name: '서버/스토리지' }
    ],
    PAY_METHOD: [
        { code: 'CASH', name: '현금' },
        { code: 'CARD', name: '카드' },
        { code: 'TRANSFER', name: '계좌이체' },
        { code: 'CREDIT', name: '외상' }
    ],
    SALES_STATUS: [
        { code: 'COMPLETED', name: '완료' },
        { code: 'PENDING', name: '대기' },
        { code: 'RETURN', name: '반품' }
    ],
    PLAN_STATUS: [
        { code: 'DRAFT', name: '초안' },
        { code: 'CONFIRMED', name: '확정' }
    ]
};

// 부서 데이터
const DEPARTMENTS = [
    { deptId: 'DEPT001', deptName: '경영지원본부', parentDeptId: null, managerId: 'EMP001' },
    { deptId: 'DEPT002', deptName: '영업본부', parentDeptId: null, managerId: 'EMP002' },
    { deptId: 'DEPT003', deptName: '마케팅본부', parentDeptId: null, managerId: 'EMP003' },
    { deptId: 'DEPT004', deptName: '기술지원본부', parentDeptId: null, managerId: 'EMP004' },
    { deptId: 'DEPT011', deptName: '인사팀', parentDeptId: 'DEPT001', managerId: 'EMP005' },
    { deptId: 'DEPT012', deptName: '재무팀', parentDeptId: 'DEPT001', managerId: 'EMP006' },
    { deptId: 'DEPT013', deptName: '총무팀', parentDeptId: 'DEPT001', managerId: 'EMP007' },
    { deptId: 'DEPT021', deptName: '영업1팀', parentDeptId: 'DEPT002', managerId: 'EMP011' },
    { deptId: 'DEPT022', deptName: '영업2팀', parentDeptId: 'DEPT002', managerId: 'EMP021' },
    { deptId: 'DEPT023', deptName: '영업3팀', parentDeptId: 'DEPT002', managerId: 'EMP025' },
    { deptId: 'DEPT031', deptName: '마케팅팀', parentDeptId: 'DEPT003', managerId: 'EMP008' },
    { deptId: 'DEPT032', deptName: '고객지원팀', parentDeptId: 'DEPT003', managerId: 'EMP009' }
];

// 직원 데이터
const EMPLOYEES = [
    { empId: 'EMP001', empName: '김대표', deptId: 'DEPT001', jobGrade: 'DIRECTOR', jobRole: 'SUPPORT', email: 'ceo@company.com', phone: '010-1111-0001', empStatus: 'ACTIVE' },
    { empId: 'EMP002', empName: '이영업', deptId: 'DEPT002', jobGrade: 'DIRECTOR', jobRole: 'SALES', email: 'sales.dir@company.com', phone: '010-1111-0002', empStatus: 'ACTIVE' },
    { empId: 'EMP003', empName: '박마케팅', deptId: 'DEPT003', jobGrade: 'DIRECTOR', jobRole: 'MARKETING', email: 'marketing.dir@company.com', phone: '010-1111-0003', empStatus: 'ACTIVE' },
    { empId: 'EMP011', empName: '박팀장', deptId: 'DEPT021', jobGrade: 'MANAGER', jobRole: 'SALES', email: 'park.team@company.com', phone: '010-2222-0011', empStatus: 'ACTIVE', commPct: 0.05 },
    { empId: 'EMP012', empName: '최대리', deptId: 'DEPT021', jobGrade: 'SENIOR', jobRole: 'SALES', email: 'choi@company.com', phone: '010-2222-0012', empStatus: 'ACTIVE', commPct: 0.03 },
    { empId: 'EMP013', empName: '김사원', deptId: 'DEPT021', jobGrade: 'STAFF', jobRole: 'SALES', email: 'kim.staff@company.com', phone: '010-2222-0013', empStatus: 'ACTIVE', commPct: 0.02 },
    { empId: 'EMP021', empName: '강팀장', deptId: 'DEPT022', jobGrade: 'MANAGER', jobRole: 'SALES', email: 'kang.team@company.com', phone: '010-3333-0021', empStatus: 'ACTIVE', commPct: 0.05 },
    { empId: 'EMP022', empName: '이과장', deptId: 'DEPT022', jobGrade: 'MANAGER', jobRole: 'SALES', email: 'lee.manager@company.com', phone: '010-3333-0022', empStatus: 'ACTIVE', commPct: 0.04 },
    { empId: 'EMP023', empName: '서대리', deptId: 'DEPT022', jobGrade: 'SENIOR', jobRole: 'SALES', email: 'seo@company.com', phone: '010-3333-0023', empStatus: 'ACTIVE', commPct: 0.03 },
    { empId: 'EMP024', empName: '홍사원', deptId: 'DEPT022', jobGrade: 'STAFF', jobRole: 'SALES', email: 'hong@company.com', phone: '010-3333-0024', empStatus: 'ACTIVE', commPct: 0.02 }
];

// 고객 데이터
const CUSTOMERS = [
    { custId: 'CUST001', custName: '삼성전자(주)', bizRegNo: '124-81-00998', custType: 'CORP', custGrade: 'VIP', creditLimit: 500000000, phone: '02-2255-0114', email: 'purchase@samsung.com', addrMain: '경기도 수원시 영통구 삼성로 129' },
    { custId: 'CUST002', custName: 'LG전자(주)', bizRegNo: '107-86-14075', custType: 'CORP', custGrade: 'VIP', creditLimit: 400000000, phone: '02-3777-1114', email: 'purchase@lge.com', addrMain: '서울특별시 영등포구 여의대로 128' },
    { custId: 'CUST003', custName: '현대자동차(주)', bizRegNo: '101-81-15099', custType: 'CORP', custGrade: 'VIP', creditLimit: 600000000, phone: '02-3464-1114', email: 'purchase@hyundai.com', addrMain: '서울특별시 서초구 헌릉로 12' },
    { custId: 'CUST010', custName: '(주)테크솔루션', bizRegNo: '215-87-12345', custType: 'CORP', custGrade: 'GOLD', creditLimit: 100000000, phone: '02-555-1234', email: 'info@techsolution.co.kr', addrMain: '서울특별시 강남구 테헤란로 152' },
    { custId: 'CUST011', custName: '(주)스마트시스템', bizRegNo: '123-45-67890', custType: 'CORP', custGrade: 'GOLD', creditLimit: 80000000, phone: '02-777-5678', email: 'contact@smartsys.kr', addrMain: '경기도 성남시 분당구 판교로 256' },
    { custId: 'CUST012', custName: '(주)디지털웍스', bizRegNo: '456-78-90123', custType: 'CORP', custGrade: 'GOLD', creditLimit: 70000000, phone: '031-888-9012', email: 'sales@digitalworks.co.kr', addrMain: '경기도 안양시 동안구 시민대로 327' },
    { custId: 'CUST020', custName: '(주)미래정보', bizRegNo: '789-01-23456', custType: 'CORP', custGrade: 'SILVER', creditLimit: 30000000, phone: '02-333-4567', email: 'info@miraeinfo.com', addrMain: '서울특별시 마포구 월드컵북로 396' },
    { custId: 'CUST021', custName: '(주)그린테크', bizRegNo: '234-56-78901', custType: 'CORP', custGrade: 'SILVER', creditLimit: 25000000, phone: '032-444-5678', email: 'green@greentech.kr', addrMain: '인천광역시 연수구 센트럴로 194' },
    { custId: 'CUST030', custName: '서울특별시청', bizRegNo: '100-83-00000', custType: 'PUBLIC', custGrade: 'VIP', creditLimit: 1000000000, phone: '02-120', email: 'purchase@seoul.go.kr', addrMain: '서울특별시 중구 세종대로 110' },
    { custId: 'CUST031', custName: '한국전력공사', bizRegNo: '100-83-45678', custType: 'PUBLIC', custGrade: 'GOLD', creditLimit: 200000000, phone: '061-345-3114', email: 'purchase@kepco.co.kr', addrMain: '전라남도 나주시 전력로 55' },
    { custId: 'CUST032', custName: '국민건강보험공단', bizRegNo: '100-82-12345', custType: 'PUBLIC', custGrade: 'GOLD', creditLimit: 150000000, phone: '033-736-1000', email: 'purchase@nhis.or.kr', addrMain: '강원도 원주시 건강로 32' },
    { custId: 'CUST040', custName: '김철수', bizRegNo: null, custType: 'PERSONAL', custGrade: 'SILVER', creditLimit: 5000000, phone: '010-2222-3333', email: 'kimcs@gmail.com', addrMain: '서울특별시 송파구 올림픽로 300' },
    { custId: 'CUST043', custName: '정미경', bizRegNo: null, custType: 'PERSONAL', custGrade: 'VIP', creditLimit: 20000000, phone: '010-8888-9999', email: 'jungmk@gmail.com', addrMain: '서울특별시 강남구 압구정로 111' }
];

// 제품 데이터 (주요 제품만)
const PRODUCTS = [
    // 전자제품
    { prodId: 'PROD001', prodName: '노트북 프로 15인치', category: 'ELECTRONICS', stdUnit: 'EA', costPrice: 800000, stdPrice: 1200000, saleYn: 'Y' },
    { prodId: 'PROD002', prodName: '노트북 에어 13인치', category: 'ELECTRONICS', stdUnit: 'EA', costPrice: 600000, stdPrice: 900000, saleYn: 'Y' },
    { prodId: 'PROD003', prodName: '노트북 프로 17인치', category: 'ELECTRONICS', stdUnit: 'EA', costPrice: 1100000, stdPrice: 1650000, saleYn: 'Y' },
    { prodId: 'PROD004', prodName: '게이밍 노트북 15인치', category: 'ELECTRONICS', stdUnit: 'EA', costPrice: 1200000, stdPrice: 1800000, saleYn: 'Y' },
    { prodId: 'PROD005', prodName: '울트라북 14인치', category: 'ELECTRONICS', stdUnit: 'EA', costPrice: 900000, stdPrice: 1350000, saleYn: 'Y' },
    { prodId: 'PROD006', prodName: '데스크탑 워크스테이션', category: 'ELECTRONICS', stdUnit: 'EA', costPrice: 1500000, stdPrice: 2200000, saleYn: 'Y' },
    { prodId: 'PROD007', prodName: '데스크탑 비즈니스', category: 'ELECTRONICS', stdUnit: 'EA', costPrice: 500000, stdPrice: 750000, saleYn: 'Y' },
    { prodId: 'PROD010', prodName: '24인치 모니터 FHD', category: 'ELECTRONICS', stdUnit: 'EA', costPrice: 120000, stdPrice: 180000, saleYn: 'Y' },
    { prodId: 'PROD011', prodName: '27인치 모니터 QHD', category: 'ELECTRONICS', stdUnit: 'EA', costPrice: 250000, stdPrice: 380000, saleYn: 'Y' },
    { prodId: 'PROD014', prodName: '34인치 울트라와이드', category: 'ELECTRONICS', stdUnit: 'EA', costPrice: 450000, stdPrice: 680000, saleYn: 'Y' },
    { prodId: 'PROD015', prodName: '게이밍 모니터 27인치', category: 'ELECTRONICS', stdUnit: 'EA', costPrice: 380000, stdPrice: 570000, saleYn: 'Y' },
    // 소프트웨어
    { prodId: 'PROD020', prodName: 'Office 365 Business Basic', category: 'SOFTWARE', stdUnit: 'EA', costPrice: 50000, stdPrice: 90000, saleYn: 'Y' },
    { prodId: 'PROD021', prodName: 'Office 365 Business Standard', category: 'SOFTWARE', stdUnit: 'EA', costPrice: 80000, stdPrice: 150000, saleYn: 'Y' },
    { prodId: 'PROD022', prodName: 'Office 365 Business Premium', category: 'SOFTWARE', stdUnit: 'EA', costPrice: 130000, stdPrice: 250000, saleYn: 'Y' },
    { prodId: 'PROD024', prodName: 'Windows 11 Pro', category: 'SOFTWARE', stdUnit: 'EA', costPrice: 120000, stdPrice: 200000, saleYn: 'Y' },
    { prodId: 'PROD026', prodName: '백신 솔루션 기업용 (1년)', category: 'SOFTWARE', stdUnit: 'EA', costPrice: 30000, stdPrice: 55000, saleYn: 'Y' },
    { prodId: 'PROD028', prodName: 'ERP 시스템 기본', category: 'SOFTWARE', stdUnit: 'EA', costPrice: 5000000, stdPrice: 8000000, saleYn: 'Y' },
    { prodId: 'PROD029', prodName: 'ERP 시스템 프리미엄', category: 'SOFTWARE', stdUnit: 'EA', costPrice: 10000000, stdPrice: 15000000, saleYn: 'Y' },
    // 네트워크
    { prodId: 'PROD042', prodName: '기가비트 스위치 24포트', category: 'NETWORK', stdUnit: 'EA', costPrice: 150000, stdPrice: 250000, saleYn: 'Y' },
    { prodId: 'PROD044', prodName: '10G 스위치 24포트', category: 'NETWORK', stdUnit: 'EA', costPrice: 800000, stdPrice: 1300000, saleYn: 'Y' },
    { prodId: 'PROD048', prodName: '기업용 AP (Access Point)', category: 'NETWORK', stdUnit: 'EA', costPrice: 200000, stdPrice: 350000, saleYn: 'Y' },
    { prodId: 'PROD049', prodName: 'NAS 스토리지 2베이', category: 'NETWORK', stdUnit: 'EA', costPrice: 200000, stdPrice: 350000, saleYn: 'Y' },
    { prodId: 'PROD050', prodName: 'NAS 스토리지 4베이', category: 'NETWORK', stdUnit: 'EA', costPrice: 400000, stdPrice: 650000, saleYn: 'Y' },
    { prodId: 'PROD052', prodName: '방화벽 UTM 소형', category: 'NETWORK', stdUnit: 'EA', costPrice: 500000, stdPrice: 850000, saleYn: 'Y' },
    { prodId: 'PROD053', prodName: '방화벽 UTM 중형', category: 'NETWORK', stdUnit: 'EA', costPrice: 1200000, stdPrice: 2000000, saleYn: 'Y' },
    // 주변기기
    { prodId: 'PROD060', prodName: '레이저 프린터 흑백 A4', category: 'PERIPHERAL', stdUnit: 'EA', costPrice: 150000, stdPrice: 250000, saleYn: 'Y' },
    { prodId: 'PROD063', prodName: '복합기 흑백 A4', category: 'PERIPHERAL', stdUnit: 'EA', costPrice: 300000, stdPrice: 480000, saleYn: 'Y' },
    { prodId: 'PROD064', prodName: '복합기 컬러 A4', category: 'PERIPHERAL', stdUnit: 'EA', costPrice: 500000, stdPrice: 800000, saleYn: 'Y' },
    { prodId: 'PROD065', prodName: '복합기 컬러 A3', category: 'PERIPHERAL', stdUnit: 'EA', costPrice: 1200000, stdPrice: 1800000, saleYn: 'Y' },
    { prodId: 'PROD072', prodName: '무선 키보드마우스 세트', category: 'PERIPHERAL', stdUnit: 'SET', costPrice: 35000, stdPrice: 55000, saleYn: 'Y' },
    { prodId: 'PROD075', prodName: '웹캠 FHD', category: 'PERIPHERAL', stdUnit: 'EA', costPrice: 50000, stdPrice: 85000, saleYn: 'Y' },
    { prodId: 'PROD083', prodName: '외장 SSD 1TB', category: 'PERIPHERAL', stdUnit: 'EA', costPrice: 80000, stdPrice: 130000, saleYn: 'Y' },
    // 소모품
    { prodId: 'PROD100', prodName: 'A4 복사용지 75g (2500매)', category: 'SUPPLIES', stdUnit: 'BOX', costPrice: 18000, stdPrice: 28000, saleYn: 'Y' },
    { prodId: 'PROD101', prodName: 'A4 복사용지 80g (2500매)', category: 'SUPPLIES', stdUnit: 'BOX', costPrice: 20000, stdPrice: 32000, saleYn: 'Y' },
    { prodId: 'PROD105', prodName: '토너 카트리지 정품 (흑)', category: 'SUPPLIES', stdUnit: 'EA', costPrice: 80000, stdPrice: 120000, saleYn: 'Y' },
    { prodId: 'PROD106', prodName: '토너 카트리지 정품 (컬러4색)', category: 'SUPPLIES', stdUnit: 'SET', costPrice: 250000, stdPrice: 400000, saleYn: 'Y' },
    // 서버
    { prodId: 'PROD120', prodName: '타워 서버 엔트리', category: 'SERVER', stdUnit: 'EA', costPrice: 1500000, stdPrice: 2400000, saleYn: 'Y' },
    { prodId: 'PROD121', prodName: '타워 서버 스탠다드', category: 'SERVER', stdUnit: 'EA', costPrice: 3000000, stdPrice: 4800000, saleYn: 'Y' },
    { prodId: 'PROD122', prodName: '랙 서버 1U', category: 'SERVER', stdUnit: 'EA', costPrice: 4000000, stdPrice: 6500000, saleYn: 'Y' },
    { prodId: 'PROD123', prodName: '랙 서버 2U', category: 'SERVER', stdUnit: 'EA', costPrice: 7000000, stdPrice: 11000000, saleYn: 'Y' },
    { prodId: 'PROD124', prodName: 'SAN 스토리지 엔트리', category: 'SERVER', stdUnit: 'EA', costPrice: 8000000, stdPrice: 13000000, saleYn: 'Y' },
    { prodId: 'PROD125', prodName: 'SAN 스토리지 미드레인지', category: 'SERVER', stdUnit: 'EA', costPrice: 20000000, stdPrice: 32000000, saleYn: 'Y' }
];

// 영업 실적 데이터 (최근)
const SALES_PERFORMANCE = [
    { salesId: 'SALES-2025-0001', salesDate: '2025-01-03', custId: 'CUST001', custName: '삼성전자(주)', empId: 'EMP011', empName: '박팀장', prodId: 'PROD001', prodName: '노트북 프로 15인치', unitPrice: 1200000, qty: 35, discountAmt: 2100000, netAmount: 39900000, taxAmount: 3990000, costAmount: 28000000, payMethod: 'TRANSFER', salesStatus: 'COMPLETED', remarks: '삼성전자 2025년 첫 발주' },
    { salesId: 'SALES-2025-0002', salesDate: '2025-01-08', custId: 'CUST002', custName: 'LG전자(주)', empId: 'EMP011', empName: '박팀장', prodId: 'PROD002', prodName: '노트북 에어 13인치', unitPrice: 900000, qty: 40, discountAmt: 1800000, netAmount: 34200000, taxAmount: 3420000, costAmount: 24000000, payMethod: 'TRANSFER', salesStatus: 'COMPLETED', remarks: 'LG전자 경량노트북' },
    { salesId: 'SALES-2025-0003', salesDate: '2025-01-10', custId: 'CUST030', custName: '서울특별시청', empId: 'EMP012', empName: '최대리', prodId: 'PROD010', prodName: '24인치 모니터 FHD', unitPrice: 180000, qty: 100, discountAmt: 900000, netAmount: 17100000, taxAmount: 1710000, costAmount: 12000000, payMethod: 'TRANSFER', salesStatus: 'COMPLETED', remarks: '서울시청 모니터 납품' },
    { salesId: 'SALES-2025-0004', salesDate: '2025-01-12', custId: 'CUST031', custName: '한국전력공사', empId: 'EMP021', empName: '강팀장', prodId: 'PROD120', prodName: '타워 서버 엔트리', unitPrice: 2400000, qty: 6, discountAmt: 720000, netAmount: 13680000, taxAmount: 1368000, costAmount: 9000000, payMethod: 'TRANSFER', salesStatus: 'COMPLETED', remarks: '한국전력 서버 추가' },
    { salesId: 'SALES-2025-0005', salesDate: '2025-01-15', custId: 'CUST010', custName: '(주)테크솔루션', empId: 'EMP022', empName: '이과장', prodId: 'PROD020', prodName: 'Office 365 Business Basic', unitPrice: 90000, qty: 300, discountAmt: 1350000, netAmount: 25650000, taxAmount: 2565000, costAmount: 15000000, payMethod: 'TRANSFER', salesStatus: 'COMPLETED', remarks: '테크솔루션 Office 365 갱신' },
    { salesId: 'SALES-2025-0006', salesDate: '2025-01-17', custId: 'CUST011', custName: '(주)스마트시스템', empId: 'EMP023', empName: '서대리', prodId: 'PROD042', prodName: '기가비트 스위치 24포트', unitPrice: 250000, qty: 35, discountAmt: 437500, netAmount: 8312500, taxAmount: 831250, costAmount: 5250000, payMethod: 'CREDIT', salesStatus: 'COMPLETED', remarks: '스마트시스템 스위치 납품' },
    { salesId: 'SALES-2025-0007', salesDate: '2025-01-20', custId: 'CUST012', custName: '(주)디지털웍스', empId: 'EMP024', empName: '홍사원', prodId: 'PROD060', prodName: '레이저 프린터 흑백 A4', unitPrice: 250000, qty: 30, discountAmt: 375000, netAmount: 7125000, taxAmount: 712500, costAmount: 4500000, payMethod: 'TRANSFER', salesStatus: 'COMPLETED', remarks: '디지털웍스 프린터 납품' },
    { salesId: 'SALES-2025-0008', salesDate: '2025-01-22', custId: 'CUST003', custName: '현대자동차(주)', empId: 'EMP013', empName: '김사원', prodId: 'PROD100', prodName: 'A4 복사용지 75g (2500매)', unitPrice: 28000, qty: 250, discountAmt: 350000, netAmount: 6650000, taxAmount: 665000, costAmount: 4500000, payMethod: 'TRANSFER', salesStatus: 'COMPLETED', remarks: '현대자동차 복사용지' },
    { salesId: 'SALES-2025-0009', salesDate: '2025-01-20', custId: 'CUST032', custName: '국민건강보험공단', empId: 'EMP021', empName: '강팀장', prodId: 'PROD122', prodName: '랙 서버 1U', unitPrice: 6500000, qty: 4, discountAmt: 1300000, netAmount: 24700000, taxAmount: 2470000, costAmount: 16000000, payMethod: 'TRANSFER', salesStatus: 'PENDING', remarks: '건강보험공단 서버 발주 - 배송 대기' },
    { salesId: 'SALES-2025-0010', salesDate: '2025-01-21', custId: 'CUST021', custName: '(주)그린테크', empId: 'EMP022', empName: '이과장', prodId: 'PROD028', prodName: 'ERP 시스템 기본', unitPrice: 8000000, qty: 1, discountAmt: 400000, netAmount: 7600000, taxAmount: 760000, costAmount: 5000000, payMethod: 'TRANSFER', salesStatus: 'PENDING', remarks: '그린테크 ERP 도입 - 설치 진행 중' }
];

// 영업 계획 데이터 (2025년 1월)
const SALES_PLANS = [
    { planId: 'PLAN-2025-001', planYear: '2025', planMonth: '01', empId: 'EMP011', empName: '박팀장', prodId: 'PROD001', prodName: '노트북 프로 15인치', targetQty: 40, targetAmt: 48000000, planStatus: 'CONFIRMED' },
    { planId: 'PLAN-2025-002', planYear: '2025', planMonth: '01', empId: 'EMP011', empName: '박팀장', prodId: 'PROD002', prodName: '노트북 에어 13인치', targetQty: 50, targetAmt: 45000000, planStatus: 'CONFIRMED' },
    { planId: 'PLAN-2025-003', planYear: '2025', planMonth: '01', empId: 'EMP012', empName: '최대리', prodId: 'PROD010', prodName: '24인치 모니터 FHD', targetQty: 150, targetAmt: 27000000, planStatus: 'CONFIRMED' },
    { planId: 'PLAN-2025-004', planYear: '2025', planMonth: '01', empId: 'EMP021', empName: '강팀장', prodId: 'PROD120', prodName: '타워 서버 엔트리', targetQty: 8, targetAmt: 19200000, planStatus: 'CONFIRMED' },
    { planId: 'PLAN-2025-005', planYear: '2025', planMonth: '01', empId: 'EMP022', empName: '이과장', prodId: 'PROD020', prodName: 'Office 365 Business Basic', targetQty: 400, targetAmt: 36000000, planStatus: 'CONFIRMED' },
    { planId: 'PLAN-2025-006', planYear: '2025', planMonth: '01', empId: 'EMP023', empName: '서대리', prodId: 'PROD042', prodName: '기가비트 스위치 24포트', targetQty: 50, targetAmt: 12500000, planStatus: 'CONFIRMED' },
    { planId: 'PLAN-2025-007', planYear: '2025', planMonth: '01', empId: 'EMP024', empName: '홍사원', prodId: 'PROD060', prodName: '레이저 프린터 흑백 A4', targetQty: 40, targetAmt: 10000000, planStatus: 'CONFIRMED' },
    { planId: 'PLAN-2025-008', planYear: '2025', planMonth: '01', empId: 'EMP013', empName: '김사원', prodId: 'PROD100', prodName: 'A4 복사용지 75g (2500매)', targetQty: 300, targetAmt: 8400000, planStatus: 'CONFIRMED' }
];

// 재고 현황 데이터 (주요 품목)
const INVENTORY = [
    { invId: 'INV-001', prodId: 'PROD001', prodName: '노트북 프로 15인치', currQty: 45, safeQty: 20, waitInQty: 30, waitOutQty: 5, storageLoc: 'A-01-01' },
    { invId: 'INV-002', prodId: 'PROD002', prodName: '노트북 에어 13인치', currQty: 60, safeQty: 25, waitInQty: 20, waitOutQty: 8, storageLoc: 'A-01-02' },
    { invId: 'INV-010', prodId: 'PROD010', prodName: '24인치 모니터 FHD', currQty: 120, safeQty: 50, waitInQty: 50, waitOutQty: 20, storageLoc: 'A-03-01' },
    { invId: 'INV-020', prodId: 'PROD020', prodName: 'Office 365 Business Basic', currQty: 500, safeQty: 100, waitInQty: 0, waitOutQty: 50, storageLoc: 'LICENSE' },
    { invId: 'INV-042', prodId: 'PROD042', prodName: '기가비트 스위치 24포트', currQty: 40, safeQty: 15, waitInQty: 25, waitOutQty: 6, storageLoc: 'B-01-03' },
    { invId: 'INV-060', prodId: 'PROD060', prodName: '레이저 프린터 흑백 A4', currQty: 40, safeQty: 20, waitInQty: 25, waitOutQty: 8, storageLoc: 'C-01-01' },
    { invId: 'INV-100', prodId: 'PROD100', prodName: 'A4 복사용지 75g (2500매)', currQty: 500, safeQty: 200, waitInQty: 300, waitOutQty: 80, storageLoc: 'D-01-01' },
    { invId: 'INV-120', prodId: 'PROD120', prodName: '타워 서버 엔트리', currQty: 8, safeQty: 5, waitInQty: 5, waitOutQty: 2, storageLoc: 'E-01-01' },
    { invId: 'INV-122', prodId: 'PROD122', prodName: '랙 서버 1U', currQty: 4, safeQty: 2, waitInQty: 3, waitOutQty: 1, storageLoc: 'E-01-03' }
];

// 대시보드 요약 데이터
const DASHBOARD_SUMMARY = {
    // 매출 요약 (2025년 1월)
    sales: {
        currentMonth: 184917500,
        lastMonth: 167500000,
        changePercent: 10.4,
        targetAmount: 206100000,
        achievementRate: 89.7
    },
    // 영업 성과
    performance: {
        totalOrders: 10,
        completedOrders: 8,
        pendingOrders: 2,
        returnOrders: 0
    },
    // 재고 현황
    inventory: {
        totalProducts: 100,
        lowStockProducts: 12,
        outOfStockProducts: 0
    },
    // 고객 현황
    customers: {
        totalCustomers: 18,
        newCustomers: 2,
        activeCustomers: 15
    }
};

// 월별 매출 데이터 (2024년)
const MONTHLY_SALES = [
    { month: '01', sales: 89500000, target: 100000000 },
    { month: '02', sales: 78000000, target: 95000000 },
    { month: '03', sales: 112000000, target: 110000000 },
    { month: '04', sales: 98500000, target: 105000000 },
    { month: '05', sales: 87000000, target: 100000000 },
    { month: '06', sales: 125000000, target: 115000000 },
    { month: '07', sales: 142000000, target: 130000000 },
    { month: '08', sales: 138000000, target: 135000000 },
    { month: '09', sales: 95000000, target: 110000000 },
    { month: '10', sales: 156000000, target: 140000000 },
    { month: '11', sales: 148000000, target: 145000000 },
    { month: '12', sales: 167500000, target: 160000000 }
];

// 카테고리별 매출 (2025년 1월)
const CATEGORY_SALES = [
    { category: 'ELECTRONICS', name: '전자제품', amount: 91200000, percentage: 49.3 },
    { category: 'SOFTWARE', name: '소프트웨어', amount: 33250000, percentage: 18.0 },
    { category: 'SERVER', name: '서버/스토리지', amount: 38380000, percentage: 20.8 },
    { category: 'NETWORK', name: '네트워크', amount: 8312500, percentage: 4.5 },
    { category: 'PERIPHERAL', name: '주변기기', amount: 7125000, percentage: 3.8 },
    { category: 'SUPPLIES', name: '소모품', amount: 6650000, percentage: 3.6 }
];

// 팀별 실적 (2025년 1월)
const TEAM_PERFORMANCE = [
    { teamId: 'DEPT021', teamName: '영업1팀', targetAmt: 128400000, actualAmt: 97850000, achievementRate: 76.2 },
    { teamId: 'DEPT022', teamName: '영업2팀', targetAmt: 77700000, actualAmt: 79642500, achievementRate: 102.5 }
];

// 영업사원별 실적 (2025년 1월)
const EMPLOYEE_PERFORMANCE = [
    { empId: 'EMP011', empName: '박팀장', deptName: '영업1팀', targetAmt: 93000000, actualAmt: 74100000, achievementRate: 79.7, orderCount: 2 },
    { empId: 'EMP012', empName: '최대리', deptName: '영업1팀', targetAmt: 27000000, actualAmt: 17100000, achievementRate: 63.3, orderCount: 1 },
    { empId: 'EMP013', empName: '김사원', deptName: '영업1팀', targetAmt: 8400000, actualAmt: 6650000, achievementRate: 79.2, orderCount: 1 },
    { empId: 'EMP021', empName: '강팀장', deptName: '영업2팀', targetAmt: 19200000, actualAmt: 38380000, achievementRate: 199.9, orderCount: 2 },
    { empId: 'EMP022', empName: '이과장', deptName: '영업2팀', targetAmt: 36000000, actualAmt: 33250000, achievementRate: 92.4, orderCount: 2 },
    { empId: 'EMP023', empName: '서대리', deptName: '영업2팀', targetAmt: 12500000, actualAmt: 8312500, achievementRate: 66.5, orderCount: 1 },
    { empId: 'EMP024', empName: '홍사원', deptName: '영업2팀', targetAmt: 10000000, actualAmt: 7125000, achievementRate: 71.3, orderCount: 1 }
];

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        COMMON_CODES,
        DEPARTMENTS,
        EMPLOYEES,
        CUSTOMERS,
        PRODUCTS,
        SALES_PERFORMANCE,
        SALES_PLANS,
        INVENTORY,
        DASHBOARD_SUMMARY,
        MONTHLY_SALES,
        CATEGORY_SALES,
        TEAM_PERFORMANCE,
        EMPLOYEE_PERFORMANCE
    };
}
