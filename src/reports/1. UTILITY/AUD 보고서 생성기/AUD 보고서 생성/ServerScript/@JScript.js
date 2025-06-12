/**
 * 사용자 정의 컨트롤에 속성을 할당 합니다.
 * @param sender 
 * @param args 
 */
 Matrix.OnUserComponentLoaded = function(sender , args){    
    try{
        var script = args.ScriptObject;
        if(script && typeof script["INIT_DATA"] == "function"){            
            script["INIT_DATA"](Matrix, Matrix.getObject(args.Id));
        }
    }catch(e){}
};
/**
* 컨트롤 입력 필수 항목 점검
**/
Matrix.OnExecuteStart = function(s, e){
	if(e.IsAutoRefresh) {return;}
	var ctlValue;
	var label;
	var controls = Matrix.GetForm(Matrix.ActiveFormName).Controls;
	for(var i=0,i2=controls.Count();i<i2; i++){
		var ctl = controls.GetByIndex(i);
		
		if(ctl.Custom){
			var CUSTOM = JSON.parse(ctl.Custom);
			if(CUSTOM && CUSTOM.INPUT_MUST == "Y"){
				ctlValue = ctl.GetValue();
				label = CUSTOM.CONTROL_LABEL ? CUSTOM.CONTROL_LABEL : ctl.Name;
				if(!ctlValue || (Array.isArray(ctlValue) && !ctlValue.join())){
					e.Cancel = true;
					Matrix.Information("입력 필수 항목["+label+"]을 확인해 주세요" ,"입력 확인", function(){
						ctl.Focus();
					});
					break;
				}
			}	
		}
		if(ctl.Controls){
			for(var c=0,c2=ctl.Controls.Count();c<c2;c++){
				var subCtl = ctl.Controls.GetByIndex(c);
				if(subCtl.Custom){
					var CUSTOM = JSON.parse(subCtl.Custom);
					if(CUSTOM && CUSTOM.INPUT_MUST == "Y"){
						ctlValue = subCtl.GetValue();
						label = CUSTOM.CONTROL_LABEL ? CUSTOM.CONTROL_LABEL : subCtl.Name;
						if(!ctlValue || (Array.isArray(ctlValue) && !ctlValue.join())){
							e.Cancel = true;
							Matrix.Information("입력 필수 항목["+label+"]을 확인해 주세요" ,"입력 확인", function(){
								subCtl.Focus();
							});
							break;
						}
					}	
				}
			}
		}
	}
};