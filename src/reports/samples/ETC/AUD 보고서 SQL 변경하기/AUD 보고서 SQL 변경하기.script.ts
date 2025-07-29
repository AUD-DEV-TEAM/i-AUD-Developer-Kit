import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { CheckBox } from "@AUD_CLIENT/control/CheckBox";
import { Label } from "@AUD_CLIENT/control/Label";
import { iGrid } from "@AUD_CLIENT/control/iGrid";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Image } from "@AUD_CLIENT/control/Image";
import { ColorPicker } from "@AUD_CLIENT/control/ColorPicker";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { RadioButton } from "@AUD_CLIENT/control/RadioButton";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Group } from "@AUD_CLIENT/control/Group";
import { Tree } from "@AUD_CLIENT/control/Tree";
import { Chart } from "@AUD_CLIENT/control/Chart";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";
 
let Matrix : Matrix; 
/*****************************
 *  
 *****************************/

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
	let report_code = args.Row.GetValue("REPORT_CODE");
	ShowDesigner(report_code);
}