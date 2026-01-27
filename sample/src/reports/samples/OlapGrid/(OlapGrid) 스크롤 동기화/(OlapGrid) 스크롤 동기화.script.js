var chkSyncScroll = null; 
var Label3 = null; 
var OlapGrid = null; 
var OlapGrid1 = null; 
var tbxDebug = null; 

var initControlVariables = function(){
	chkSyncScroll = Matrix.getObject("chkSyncScroll"); 
	Label3 = Matrix.getObject("Label3"); 
	OlapGrid = Matrix.getObject("OlapGrid"); 
	OlapGrid1 = Matrix.getObject("OlapGrid1"); 
	tbxDebug = Matrix.getObject("tbxDebug"); 

}; 
/*****************************************
* 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
* * arguments :  
*****************************************/
 var OnDocumentLoadComplete  = function(sender, args)
 { 
 	initControlVariables();
	OlapGrid1.OnScroll = function(s, e){
		if(chkSyncScroll.Checked == false) return;
		try{
			OlapGrid.ScrollLeft = e.ScrollLeft;
			OlapGrid.ScrollTop = e.ScrollTop;
			OlapGrid.Update();
		}catch(e){}
	}; 
 };