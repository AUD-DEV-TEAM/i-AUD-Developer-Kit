/**
 * 공통 유틸리티 함수
 */

// 숫자 포맷팅 (천단위 콤마)
function formatNumber(num) {
    if (num === null || num === undefined) return '-';
    return num.toLocaleString('ko-KR');
}

// 금액 포맷팅 (원화)
function formatCurrency(amount) {
    if (amount === null || amount === undefined) return '-';
    return '₩' + formatNumber(amount);
}

// 퍼센트 포맷팅
function formatPercent(value) {
    if (value === null || value === undefined) return '-';
    return value.toFixed(1) + '%';
}

// 날짜 포맷팅
function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR');
}

// 날짜/시간 포맷팅
function formatDateTime(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleString('ko-KR');
}

// 공통코드에서 코드명 가져오기
function getCodeName(groupCd, code) {
    const group = COMMON_CODES[groupCd];
    if (!group) return code;
    const item = group.find(c => c.CODE === code);
    return item ? item.CODE_NM : code;
}

// 부서명 가져오기
function getDepartmentName(deptId) {
    const dept = DEPARTMENTS.find(d => d.DEPT_ID === deptId);
    return dept ? dept.DEPT_NM : '-';
}

// 직원명 가져오기
function getEmployeeName(empId) {
    const emp = EMPLOYEES.find(e => e.EMP_ID === empId);
    return emp ? emp.EMP_NM : '-';
}

// 고객명 가져오기
function getCustomerName(custId) {
    const cust = CUSTOMERS.find(c => c.CUST_ID === custId);
    return cust ? cust.CUST_NM : '-';
}

// 제품명 가져오기
function getProductName(prodId) {
    const prod = PRODUCTS.find(p => p.PROD_ID === prodId);
    return prod ? prod.PROD_NM : '-';
}

// 상태 뱃지 생성
function createStatusBadge(status, type = 'default') {
    const statusMap = {
        // 직원 상태
        'ACTIVE': { label: '재직', class: 'badge-success' },
        'INACTIVE': { label: '퇴직', class: 'badge-danger' },
        'LEAVE': { label: '휴직', class: 'badge-warning' },
        // 고객 상태
        'NORMAL': { label: '정상', class: 'badge-success' },
        'DORMANT': { label: '휴면', class: 'badge-warning' },
        'WITHDRAWN': { label: '탈퇴', class: 'badge-danger' },
        // 제품 상태
        'SELLING': { label: '판매중', class: 'badge-success' },
        'DISCONTINUED': { label: '단종', class: 'badge-danger' },
        'PENDING': { label: '대기', class: 'badge-warning' },
        // 영업계획 상태
        'DRAFT': { label: '초안', class: 'badge-secondary' },
        'CONFIRMED': { label: '확정', class: 'badge-success' },
        'CANCELLED': { label: '취소', class: 'badge-danger' },
        // 영업실적 상태
        'COMPLETED': { label: '완료', class: 'badge-success' },
        'RETURN': { label: '반품', class: 'badge-danger' },
        // 고객 등급
        'VIP': { label: 'VIP', class: 'badge-primary' },
        'GOLD': { label: 'GOLD', class: 'badge-warning' },
        'SILVER': { label: 'SILVER', class: 'badge-secondary' }
    };

    const statusInfo = statusMap[status] || { label: status, class: 'badge-secondary' };
    return `<span class="badge ${statusInfo.class}">${statusInfo.label}</span>`;
}

// 테이블 행 생성
function createTableRow(data, columns) {
    const tr = document.createElement('tr');
    columns.forEach(col => {
        const td = document.createElement('td');
        if (typeof col.render === 'function') {
            td.innerHTML = col.render(data);
        } else {
            td.textContent = data[col.field] || '-';
        }
        tr.appendChild(td);
    });
    return tr;
}

// 테이블 데이터 렌더링
function renderTable(tableBodyId, data, columns) {
    const tbody = document.getElementById(tableBodyId);
    if (!tbody) return;

    tbody.innerHTML = '';
    data.forEach(item => {
        tbody.appendChild(createTableRow(item, columns));
    });
}

// 페이지네이션 생성
function createPagination(containerId, currentPage, totalPages, onPageChange) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    // 이전 버튼
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.textContent = '이전';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => onPageChange(currentPage - 1);
    container.appendChild(prevBtn);

    // 페이지 번호
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'page-btn' + (i === currentPage ? ' active' : '');
        pageBtn.textContent = i;
        pageBtn.onclick = () => onPageChange(i);
        container.appendChild(pageBtn);
    }

    // 다음 버튼
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.textContent = '다음';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => onPageChange(currentPage + 1);
    container.appendChild(nextBtn);
}

// 검색 필터링
function filterData(data, searchText, searchFields) {
    if (!searchText) return data;

    const lowerSearch = searchText.toLowerCase();
    return data.filter(item => {
        return searchFields.some(field => {
            const value = item[field];
            if (value === null || value === undefined) return false;
            return String(value).toLowerCase().includes(lowerSearch);
        });
    });
}

// 정렬
function sortData(data, field, direction = 'asc') {
    return [...data].sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];

        if (aVal === null || aVal === undefined) aVal = '';
        if (bVal === null || bVal === undefined) bVal = '';

        if (typeof aVal === 'number' && typeof bVal === 'number') {
            return direction === 'asc' ? aVal - bVal : bVal - aVal;
        }

        const comparison = String(aVal).localeCompare(String(bVal), 'ko');
        return direction === 'asc' ? comparison : -comparison;
    });
}

// 모달 열기
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

// 모달 닫기
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// 알림 표시
function showAlert(message, type = 'info') {
    alert(message); // 프로토타입에서는 기본 alert 사용
}

// 확인 대화상자
function showConfirm(message) {
    return confirm(message);
}

// 셀렉트박스 옵션 생성
function populateSelect(selectId, options, valueField, textField, includeEmpty = true) {
    const select = document.getElementById(selectId);
    if (!select) return;

    select.innerHTML = '';

    if (includeEmpty) {
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = '전체';
        select.appendChild(emptyOption);
    }

    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt[valueField];
        option.textContent = opt[textField];
        select.appendChild(option);
    });
}

// 공통코드로 셀렉트박스 채우기
function populateSelectFromCode(selectId, groupCd, includeEmpty = true) {
    const codes = COMMON_CODES[groupCd] || [];
    populateSelect(selectId, codes, 'CODE', 'CODE_NM', includeEmpty);
}

// 부서 셀렉트박스 채우기
function populateDepartmentSelect(selectId, includeEmpty = true) {
    populateSelect(selectId, DEPARTMENTS, 'DEPT_ID', 'DEPT_NM', includeEmpty);
}

// URL 파라미터 가져오기
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 로컬 스토리지 저장
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// 로컬 스토리지 불러오기
function loadFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// 현재 날짜 (YYYY-MM-DD)
function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

// 현재 년월 (YYYY-MM)
function getCurrentYearMonth() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

// 디바운스
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 초기화 시 공통 이벤트 바인딩
document.addEventListener('DOMContentLoaded', function() {
    // 모달 외부 클릭 시 닫기
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(modal => {
                modal.classList.remove('show');
            });
        }
    });
});
