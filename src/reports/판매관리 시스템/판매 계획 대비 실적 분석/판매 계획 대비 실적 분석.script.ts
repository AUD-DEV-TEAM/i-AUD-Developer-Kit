import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

let Matrix: Matrix;

// OlapGrid 컨트롤 참조
let olapGrid: OlapGrid;

/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 **************************************/
var OnDocumentLoadComplete = function (sender, args) {
    olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
};

/**************************************
 * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
 * * arguments :
 *       string  Id (Readonly:False) : 컨트롤이름
 *       number  RecordCount (Readonly:False) : 데이터셋의 레코드 수량
 **************************************/
var OnDataBindEnd = function (sender, args) {
    if (args.Id === "OlapGrid") {
        // 데이터 바인딩 완료 
    }
};
