 
var OlapGrid = null;  
var tbxDebug = null; 

var initControlVariables = function(){
 
	OlapGrid = Matrix.getObject("OlapGrid");  
	tbxDebug = Matrix.getObject("tbxDebug");  
};
 /*****************************************
* 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
* * arguments :  
*****************************************/
 var OnDocumentLoadComplete  = function(sender, args)
 {
 	initControlVariables();
 };
/*****************************************
* 체크박스 컨트롤의 값이 변경될 경우 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 bool	IsChecked (Readonly:False) : 체크 상태 
*****************************************/
 var OnCheckValueChange  = function(sender, args)
 { 
 	switch(args.Id)
	{
		case  "DisplayRowSubTotal":
		case  "DisplayRowGrandTotal":
		case  "DisplayColumnSubTotal":
		case  "DisplayColumnGrandTotal":		 
			var option = OlapGrid.getGlobalOption();
			option[args.Id] = args.IsChecked;
			tbxDebug.Text = "//Script 사용 예제 "
						+"\n// " + Matrix.getObject(args.Id).Text
						+ "\n var option = OlapGrid.getMenuOption();"
						+ "\n  option." +  args.Id + " = " + args.IsChecked + ";";
		
			OlapGrid.Refresh();
			break;
		
		default:
			var option = OlapGrid.getMenuOption();
			option[args.Id] = args.IsChecked;			
			tbxDebug.Text = "//Script 사용 예제 "
						+"\n// " + Matrix.getObject(args.Id).Text
						+ "\n var option = OlapGrid.getMenuOption();"
						+ "\n  option." +  args.Id + " = " + args.IsChecked + ";";
			break;
	
	}
 
 	 
 };
 