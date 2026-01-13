var OlapGrid = null; 
var RichTextBox = null; 

var initControlVariables = function(){
	OlapGrid = Matrix.getObject("OlapGrid"); 
	RichTextBox = Matrix.getObject("RichTextBox"); 
	OlapGrid.OnDataCellDoubleClick = function(s, e){
		RichTextBox.Text += "품목코드:" +  e.DataCell.getHeaderCell("CB9B03EAE").Value2
		                          +",창고코드:" +  e.DataCell.getHeaderCell("C1482C520").Value2
								  + "\n";
								  
	};
};
initControlVariables();
