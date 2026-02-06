import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection";

// 필수 변수
let CALL_BACK: Function;
let Matrix: Matrix;

// 요청/응답 객체
const req = Matrix.getRequest();
const res = Matrix.getResponse();

try {
    // 10건의 샘플 데이터 생성 (월별 매출 데이터)
    const sampleData = generateSampleData(10);

    // 데이터를 DataTable로 변환
    const dataTable = res.CreateTable("SalesData");
    dataTable.addColumn("MONTH", "string");
    dataTable.addColumn("SALES", "number");
    dataTable.addColumn("PROFIT", "number");
    dataTable.addColumn("COST", "number");
    dataTable.addColumn("GROWTH_RATE", "number");

    for (let i = 0; i < sampleData.length; i++) {
        const item = sampleData[i];
        const row = dataTable.NewRow();
        row.SetValue("MONTH", item.month);
        row.SetValue("SALES", item.sales);
        row.SetValue("PROFIT", item.profit);
        row.SetValue("COST", item.cost);
        row.SetValue("GROWTH_RATE", item.growthRate);
        dataTable.AddRow(row);
    }

    // 응답 반환
    res.sendSuccessMessage("샘플 데이터 조회 완료");

} catch(e) {
    Matrix.ThrowException(e.message);
}

/**
 * 샘플 데이터 생성 함수
 */
function generateSampleData(count: number) {
    const data = [];
    const baseDate = new Date(2024, 0, 1); // 2024년 1월

    let prevSales = 1000000; // 초기 매출 100만원

    for (let i = 0; i < count; i++) {
        const currentDate = new Date(baseDate);
        currentDate.setMonth(baseDate.getMonth() + i);

        // 월 형식으로 변환
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const monthStr = year + "-" + month;

        // 매출: 이전 달 대비 -10% ~ +20% 범위의 랜덤 증감
        const growthRate = (Math.random() * 30 - 10); // -10 ~ 20
        const sales = Math.round(prevSales * (1 + growthRate / 100));

        // 원가: 매출의 60~70%
        const costRate = 0.6 + Math.random() * 0.1; // 60~70%
        const cost = Math.round(sales * costRate);

        // 이익: 매출 - 원가
        const profit = sales - cost;

        data.push({
            month: monthStr,
            sales: sales,
            profit: profit,
            cost: cost,
            growthRate: Math.round(growthRate * 10) / 10 // 소수점 1자리
        });

        prevSales = sales;
    }

    return data;
}
