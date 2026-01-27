var btnExecute = null; 
var Label = null; 
var Label1 = null; 
var Label3 = null; 
var OlapGrid = null; 
var tbxDebug = null; 
var tbxFieldNames = null; 
var tbxGroupName = null; 

var initControlVariables = function(){
	btnExecute = Matrix.getObject("btnExecute"); 
	Label = Matrix.getObject("Label"); 
	Label1 = Matrix.getObject("Label1"); 
	Label3 = Matrix.getObject("Label3"); 
	OlapGrid = Matrix.getObject("OlapGrid"); 
	tbxDebug = Matrix.getObject("tbxDebug"); 
	tbxFieldNames = Matrix.getObject("tbxFieldNames"); 
	tbxGroupName = Matrix.getObject("tbxGroupName"); 

};
initControlVariables();
   
/*****************************************
* 버튼 컨트롤이 클릭되는 시점에 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 string	Text (Readonly:False) : 라벨 값 
*****************************************/
 var OnButtonClick  = function(sender, args)
 {  
  
	var flds = tbxFieldNames.Text.split(","); 
	var fld;
	for(var i=0;i<flds.length; i++){
		fld = OlapGrid.getField(flds[i]);
		if(fld){
			fld.Area = 1 ; /*Row*/
		}
	}	 
 	if(args.Id == "btnExecute"){
 		//초기화
		OlapGrid.ClearFieldGroup();     //필드 그룹 모두 제거
		OlapGrid.ClearHierarchyGroup(); //hierarchy필드 모두 제거		
			
		OlapGrid.AddFieldGroup("GRP_FIELDS_01",flds);
		OlapGrid.Refresh();
		
		
	}else if(args.Id == "btnCreateHierarchy"){
 		//초기화
		OlapGrid.ClearFieldGroup();     //필드 그룹 모두 제거
		OlapGrid.ClearHierarchyGroup(); //hierarchy필드 모두 제거
		OlapGrid.AddHierarchyGroupInfo("HIERARCHY_01",tbxGroupName.Text ,flds);
		OlapGrid.Refresh();
		
		
	}
 };
 
 
 
 
 
 
 
 
 
 
 
  
  