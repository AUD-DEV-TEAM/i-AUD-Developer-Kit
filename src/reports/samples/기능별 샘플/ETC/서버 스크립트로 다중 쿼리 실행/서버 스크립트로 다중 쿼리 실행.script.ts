import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
 
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
  