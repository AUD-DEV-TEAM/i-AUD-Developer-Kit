 
/*****************************************
* Occurs when the value of the checkbox control changes.
* * arguments :  
*		 string	Id (Readonly:False) : Control Name 
*		 bool	IsChecked (Readonly:False) : Check status 
*****************************************/
 var OnCheckValueChange  = function(sender, args)
 {
 	if(args.Id == "CHK_SELECT_ALL"){
		var grid = Matrix.getObject("DataGrid");
		
		if(args.IsChecked){
			for(var r=0;r<grid.GetRowCount(); r++){			
				grid.setRowValue(r ,"CHK", "Y");
			}
		}else{
			for(var r=0;r<grid.GetRowCount(); r++){			
				grid.setRowValue(r ,"CHK", "N");
			}
		}
		grid.Update();
	}
 };
 
 
 