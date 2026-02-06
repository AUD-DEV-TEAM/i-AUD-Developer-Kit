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
import { Chart } from "@AUD_CLIENT/control/Chart";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";
 
let Matrix : Matrix; 

let Button : Button =   Matrix.getObject("Button") as Button;
let DataGrid : DataGrid =   Matrix.getObject("DataGrid") as DataGrid;
let DataGrid1 : DataGrid =   Matrix.getObject("DataGrid1") as DataGrid;

Button.OnClick = function(sender, args){
 	Matrix.RunScript("" ,"DataQuery" ,function(p){
                                	if(p.Success == false){
                               		Matrix.Alert(p.Message);
                               		return;
                               	}
                               	var  ds = p.DataSet;
								
								DataGrid.SetDataSet(ds.GetTable("FOLDER").ToDataSet());
								DataGrid1.SetDataSet(ds.GetTable("REPORT").ToDataSet()); 
                               });
 };	
  