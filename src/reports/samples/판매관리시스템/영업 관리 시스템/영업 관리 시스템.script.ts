import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { WebContainer } from "@AUD_CLIENT/control/WebContainer";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

let Matrix : Matrix;

/* Init Controls */
const GRD_TREE: DataGrid = Matrix.getObject("GRD_TREE") as DataGrid;
const WEB: WebContainer = Matrix.getObject("WEB") as WebContainer;
const url = 'https://rnd.bimatrix.co.kr/aud7//AUD/main.jsp?id=';


GRD_TREE.OnCellClick = function(s, e) {
	WEB.URL = url + e.Row.GetValue('CODE');
	Matrix.doRefresh('WEB');
};
