/**
 * 대시보드 페이지 스크립트
 */

document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
});

function initDashboard() {
    // 부서 셀렉트박스 초기화
    initSearchFilters();

    // 대시보드 데이터 렌더링
    renderDashboard();
}

function initSearchFilters() {
    const deptSelect = document.getElementById('searchDept');
    if (deptSelect && typeof DEPARTMENTS !== 'undefined') {
        deptSelect.innerHTML = '<option value="">전체</option>';
        DEPARTMENTS.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept.DEPT_ID;
            option.textContent = dept.DEPT_NM;
            deptSelect.appendChild(option);
        });
    }
}

function searchDashboard() {
    renderDashboard();
}

function renderDashboard() {
    const searchYear = document.getElementById('searchYear')?.value || '2025';
    const searchDept = document.getElementById('searchDept')?.value || '';

    renderSummaryCards(searchYear, searchDept);
    renderMonthlySales(searchYear, searchDept);
    renderCategorySales(searchYear, searchDept);
    renderTeamPerformance(searchYear, searchDept);
    renderEmployeePerformance(searchYear, searchDept);
    renderRecentSales(searchYear, searchDept);
}

// 요약 카드 렌더링
function renderSummaryCards(year, deptId) {
    document.getElementById('totalSales').textContent = formatCurrency(DASHBOARD_SUMMARY.totalSales);
    document.getElementById('achievementRate').textContent = formatPercent(DASHBOARD_SUMMARY.achievementRate);
    document.getElementById('activeCustomers').textContent = formatNumber(DASHBOARD_SUMMARY.activeCustomers) + '개사';
    document.getElementById('totalProducts').textContent = formatNumber(DASHBOARD_SUMMARY.totalProducts) + '종';
}

// 월별 매출 렌더링
function renderMonthlySales(year, deptId) {
    const tbody = document.getElementById('monthlySalesBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    MONTHLY_SALES.forEach(item => {
        const rate = item.target > 0 ? (item.sales / item.target * 100) : 0;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.month}</td>
            <td>${formatCurrency(item.sales)}</td>
            <td>${formatCurrency(item.target)}</td>
            <td>${formatPercent(rate)}</td>
        `;
        tbody.appendChild(tr);
    });
}

// 카테고리별 매출 렌더링
function renderCategorySales(year, deptId) {
    const tbody = document.getElementById('categorySalesBody');
    if (!tbody) return;

    const total = CATEGORY_SALES.reduce((sum, item) => sum + item.sales, 0);

    tbody.innerHTML = '';
    CATEGORY_SALES.forEach(item => {
        const ratio = total > 0 ? (item.sales / total * 100) : 0;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.category}</td>
            <td class="number">${formatCurrency(item.sales)}</td>
            <td class="number" style="width: 180px;">
                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">
                    <div style="width: 80px; height: 12px; background: #e2e8f0; border-radius: 2px; overflow: hidden;">
                        <div style="width: ${ratio}%; height: 100%; background: #7c93c3; border-radius: 2px;"></div>
                    </div>
                    <span>${formatPercent(ratio)}</span>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 팀별 실적 렌더링
function renderTeamPerformance(year, deptId) {
    const tbody = document.getElementById('teamPerformanceBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    TEAM_PERFORMANCE.forEach(item => {
        const rate = item.target > 0 ? (item.sales / item.target * 100) : 0;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.team}</td>
            <td>${formatCurrency(item.target)}</td>
            <td>${formatCurrency(item.sales)}</td>
            <td><strong>${formatPercent(rate)}</strong></td>
        `;
        tbody.appendChild(tr);
    });
}

// 직원별 실적 TOP 5 렌더링
function renderEmployeePerformance(year, deptId) {
    const tbody = document.getElementById('employeePerformanceBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    EMPLOYEE_PERFORMANCE.slice(0, 5).forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${index + 1}</strong></td>
            <td>${item.name}</td>
            <td>${item.team}</td>
            <td><strong>${formatCurrency(item.sales)}</strong></td>
        `;
        tbody.appendChild(tr);
    });
}

// 최근 영업 실적 렌더링
function renderRecentSales(year, deptId) {
    const tbody = document.getElementById('recentSalesBody');
    if (!tbody) return;

    // 최근 10건만 표시
    const recentData = SALES_PERFORMANCE.slice(0, 10);

    tbody.innerHTML = '';
    recentData.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.PERF_ID}</td>
            <td>${formatDate(item.SALE_DT)}</td>
            <td>${getCustomerName(item.CUST_ID)}</td>
            <td>${getProductName(item.PROD_ID)}</td>
            <td>${formatNumber(item.SALE_QTY)}</td>
            <td>${formatCurrency(item.SALE_AMT)}</td>
            <td>${createStatusBadge(item.PERF_STATUS)}</td>
        `;
        tbody.appendChild(tr);
    });
}
