import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Tree } from "@AUD_CLIENT/control/Tree";
 
let Matrix : Matrix; 

const Tree : Tree =   Matrix.getObject("Tree") as Tree;
const MAIN : DataGrid =   Matrix.getObject("MAIN") as DataGrid;
const btnExecute : Button =   Matrix.getObject("btnExecute") as Button;

Tree.OnNodeDbClick = function(s, e){
	var node = e.Node; 
	var folderCode = node.GetValue("CODE");
	Matrix.SetVariable("VS_FOLDER_CODE", folderCode);		
	Matrix.doRefresh("MAIN");
};
	 
btnExecute.OnClick = function(s, e){
 
	Matrix.RunScript("MAIN", "UPDATE_SQL",function(p){
                                       	if(p.Success == false){
                                      		Matrix.Error("저장 오류",p.Message);
                                      		return;
                                      	}
                                      	var  ds = p.DataSet;  
										MAIN.SetDataSet(ds);
                                      });
};  

const ShowDesigner = function (reportCode:string) {
    let url = Matrix.GetGlobalConfig().CONTEXT_PATH + "/AUD/designer.jsp?id=" + reportCode;
    window.open(url);
};

MAIN.OnCellDoubleClick = function(sender, args){
	let report_code = args.Row.GetValue("REPORT_CODE") as string;
	ShowDesigner(report_code);
}
