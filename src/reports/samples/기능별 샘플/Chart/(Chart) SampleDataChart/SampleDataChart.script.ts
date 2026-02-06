import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { HighChart_C } from "@AUD_CLIENT/control/HighChart_C";
import { Label } from "@AUD_CLIENT/control/Label";

// 필수 변수
let Matrix: Matrix;

// 컨트롤 변수
let btnSearch: Button;
let gridSales: DataGrid;
let chartSales: HighChart_C;
let lblSummary: Label;

/**
 * 문서 로드 완료 이벤트
 */
Matrix.OnDocumentLoadComplete = function(sender, args) {
    // 컨트롤 바인딩
    btnSearch = Matrix.getObject("btnSearch") as Button;
    gridSales = Matrix.getObject("gridSales") as DataGrid;
    chartSales = Matrix.getObject("chartSales") as HighChart_C;
    lblSummary = Matrix.getObject("lblSummary") as Label;

    // 이벤트 등록
    btnSearch.OnClick = btnSearchOnClick;

    // 초기 데이터 로드
    loadSampleData();
};

/**
 * 조회 버튼 클릭 이벤트
 */
const btnSearchOnClick = function(sender: Button, args: any) {
    loadSampleData();
};

/**
 * 샘플 데이터 조회
 */
function loadSampleData() {
    // 서버 스크립트 호출
    Matrix.RunScriptEx(["gridSales"], "GetSampleData", {}, function(p) {
        if (!p.Success) {
            Matrix.Alert(p.Message);
            return;
        }

        // 그리드에 데이터 표시
        gridSales.SetDataSet(p.DataSet);

        // 차트 표시
        displayChart(p.DataSet);

        // 요약 정보 표시
        displaySummary(p.DataSet);

        Matrix.Alert("데이터 조회 완료: " + p.DataSet.GetTable(0).Rows.length + "건");
    });
}

/**
 * Highchart 차트 표시
 */
function displayChart(dataSet: any) {
    const table = dataSet.Tables[0];
    const rows = table.Rows;

    // 차트 데이터 준비
    const categories: string[] = [];
    const salesData: number[] = [];
    const profitData: number[] = [];
    const costData: number[] = [];

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        categories.push(row.GetValue("MONTH"));
        salesData.push(row.GetValue("SALES"));
        profitData.push(row.GetValue("PROFIT"));
        costData.push(row.GetValue("COST"));
    }

    // Highchart 설정
    const chartConfig = {
        chart: {
            type: 'column'
        },
        title: {
            text: '월별 매출/이익/원가 분석'
        },
        xAxis: {
            categories: categories,
            title: {
                text: '월'
            }
        },
        yAxis: {
            title: {
                text: '금액 (원)'
            },
            labels: {
                formatter: function() {
                    return formatNumber(this.value);
                }
            }
        },
        tooltip: {
            shared: true,
            formatter: function() {
                let s = '<b>' + this.x + '</b><br/>';
                for (let i = 0; i < this.points.length; i++) {
                    s += '<span style="color:' + this.points[i].color + '">\u25CF</span> ' +
                         this.points[i].series.name + ': <b>' +
                         formatNumber(this.points[i].y) + '원</b><br/>';
                }
                return s;
            }
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            name: '매출',
            data: salesData,
            color: '#4472C4'
        }, {
            name: '이익',
            data: profitData,
            color: '#70AD47'
        }, {
            name: '원가',
            data: costData,
            color: '#FFC000'
        }],
        credits: {
            enabled: false
        }
    };

    // 차트 설정 적용
    chartSales.SetHighChartScript(chartConfig);
}

/**
 * 요약 정보 표시
 */
function displaySummary(dataSet: any) {
    const table = dataSet.Tables[0];
    const rows = table.Rows;

    let totalSales = 0;
    let totalProfit = 0;
    let totalCost = 0;
    let avgGrowthRate = 0;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        totalSales += row.GetValue("SALES");
        totalProfit += row.GetValue("PROFIT");
        totalCost += row.GetValue("COST");
        avgGrowthRate += row.GetValue("GROWTH_RATE");
    }

    avgGrowthRate = avgGrowthRate / rows.length;
    const profitRate = (totalProfit / totalSales * 100).toFixed(1);

    const summary = "총 매출: " + formatNumber(totalSales) + "원 | " +
                   "총 이익: " + formatNumber(totalProfit) + "원 | " +
                   "이익률: " + profitRate + "% | " +
                   "평균 성장률: " + avgGrowthRate.toFixed(1) + "%";

    lblSummary.Text = summary;
}

/**
 * 숫자 포맷팅 (천단위 구분)
 */
function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
