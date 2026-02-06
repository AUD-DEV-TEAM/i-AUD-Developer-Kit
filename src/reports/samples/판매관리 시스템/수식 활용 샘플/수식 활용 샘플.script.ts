import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

let Matrix : Matrix;

/*****************************
 * Typed control declarations
 *****************************/
const GRD_SALES : DataGrid = Matrix.getObject("GRD_SALES") as DataGrid;


/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 **************************************/
const OnButtonClick = function(sender, args) {
	switch (args.Id) {
		case 'BTN_REF':
			Matrix.doRefresh('');
			break;
	}
};


/**************************************
 * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 number	RecordCount (Readonly:False) : 데이터셋의 레코드 수량
 **************************************/
const OnDataBindEnd = function(sender, args) {
	if (args.Id == 'GRD_SALES') {
		(Matrix.getObject('LBL_GRD_TITLE') as Label).Text = '  매출 실적 데이터 (' + args.RecordCount + '건)';
	}
};
