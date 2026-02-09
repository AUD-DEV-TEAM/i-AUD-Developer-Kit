import { Matrix } from "@AUD_SERVER/matrix/script/Matrix"; 

 // Please do not modify or delete the following variables: "CALL_BACK", "Matrix". 
let CALL_BACK : Function;
let Matrix : Matrix; 
 
const req = Matrix.getRequest();  /* Request */ 
const res = Matrix.getResponse(); /* Response */ 
const session  = Matrix.getSession(); /* Session */ 
const util = Matrix.getUtility(); /* Utility */ 
const fso = Matrix.getFileSystemObject(); /* File Access */ 
let   con = Matrix.getConnection(); /* DataBase Connection */ 
 
//------------------------------------
// OLAP Write-Back에서는 OlapContext만 사용할 수 있습니다.
// OLAP Context
var OLAPContext = Matrix.getOlapScriptContext();

/**
 * 데이터 수정 하기
 * 균등 배분 예시
 * @param cell
 * @param rows
 * @param dataField
 */
var UpdateCellValue = function (cell, rows, dataField) {
    var unLockedRows = []; //Lock이 아닌 Row 목록
    var editRow;
    var lockedValue = 0.0; //Lock된 Row의 값
    var beforeValue = 0.0; //수정전 값
    var fldValue = 0.0;
    var dataColumnIndex = dataField.DataColumnIndex; //수정된 데이터 셀의 DataColumnIndex
    var row;
    for (var r = 0, r2 = rows.length; r < r2; r++) {
        row = rows[r]; //데이터 셀을 구성하는 Row		
        fldValue = row.getNumber(dataColumnIndex); //수정된 데이터 셀의 값
        if (isNaN(fldValue) == true) { //수정된 데이터 셀의 값이 NaN일 경우
            fldValue = 0.0;
        }
        beforeValue += fldValue; //수정전 값 누적
        if (row.IsLockColumn(dataColumnIndex) == false) { //Lock이 아닐 경우에만 수정
            unLockedRows.push({ "Row": row, "Value": fldValue }); //Lock이 아닌 Row 목록에 추가
        }
        else {
            lockedValue += fldValue;
        }
    }
    if (unLockedRows.length == 0) {
        return; //모두 잠김 셀 이라면 수정하지 않음.
    }
    //잠김셀의 값의 합이 입력된 값보다 작은경우 (수정할 수 없다, 값이 음수 이상이어야 한다.)
    if (lockedValue > cell.After) {
        throw "Enter a value that is greater than the sum of the lock cells.(Lock:" + lockedValue + ", Input:" + cell.After + ")";
    }
    //가감해야 하는 값 
    var diff = cell.After - beforeValue;
    var diviedValue = diff / unLockedRows.length; //균등 배분 값
    OLAPContext.WriteLog("OLAP_WRITE_BACK", "diviedValue:" + diviedValue + ", diff:" + diff
        + ", beforeValue:" + beforeValue
        + ", lockedValue:" + lockedValue
        + ", cell.After:" + cell.After
        + ", unLockedRows.length:" + unLockedRows.length);
    //균등 배분
    for (var i = 0, i2 = unLockedRows.length; i < i2; i++) {
        editRow = unLockedRows[i]; //Lock이 아닌 Row 
        if (editRow.Value + diviedValue < 0) { //균등 배분값을 더했을때 0보다 작으면 해당 값 만큼 빼준다.
            diff -= editRow.Value;
            editRow.Value = 0.0;
            editRow.Row.setNumber(dataColumnIndex, 0.0);
        }
        else {
            //균등 배분값을 더한 값으로 수정
            diff -= diviedValue;
            editRow.Value += diviedValue;
            editRow.Row.setNumber(dataColumnIndex, editRow.Value);
        }
    }
    if (diff > 0) {
        //끝전 처리 (큰 데이터에 묻힌다.)
        var sortRows = unLockedRows.sort(function (a, b) {
            return b.Value - a.Value;
        }); //정렬
        //0보다 큰 값들.
        var sumValue = 0.0;
        unLockedRows = [];
        for (var i = 0, i2 = sortRows.length; i < i2; i++) {
            if (sortRows[i].Value <= 0) {
                break;
            }
            sumValue += sortRows[i].Value;
            unLockedRows.push(sortRows[i]);
        }
        for (var i = 0, i2 = unLockedRows.length; i < i2; i++) {
            editRow = unLockedRows[i]; //Lock이 아닌 Row 
            if (diff <= 0) {
                break;
            }
            //비율에 맞춰서 차감
            if (editRow.Value > 0) {
                var editValue = diff * (editRow.Value / sumValue); //비율에 맞춰서 차감
                diff -= editValue;
                unLockedRows[i].Value -= editValue;
                editRow.Row.setNumber(dataColumnIndex, editRow.Value);
            }
        }
    }
};
var editCells = OLAPContext.getEditCells(); //수정된 데이터 셀
var rows; //데이터셀을 구성하는 Rows
var dataCell; //수정된 데이터 셀
var dataField; //수정된 데이터 셀의 필드 정보
var beforeValue; //수정전 값
var afterValue; //수정후 값
for (var c = 0, c2 = editCells.length; c < c2; c++) {
    dataCell = editCells[c]; //수정된 데이터 셀
    rows = OLAPContext.getRows(dataCell); //수정된 데이터 셀을 구성하는 Rows
    dataField = OLAPContext.getField(dataCell.Field); //수정된 데이터 셀의 필드 정보
    beforeValue = dataCell.Before; //수정전 값
    afterValue = dataCell.After; //수정후 값
    if (beforeValue != afterValue) {
        UpdateCellValue(dataCell, rows, dataField); //수정된 데이터 셀의 값 업데이트
        //행을 추가하고 싶은경우...
        //let row = OLAPContext.addRow(dataCell);//수정된 데이터 셀 기준으로 Row 추가
        //row.setString(OLAPContext.getField("D7").DataColumnIndex, "추가");		
        //row.setNumber(dataField.DataColumnIndex, 100);
    }
}
