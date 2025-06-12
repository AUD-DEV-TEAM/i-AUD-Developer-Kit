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
import { Control } from "@AUD_CLIENT/control/Control";
let Matrix: Matrix;


let GRD_MAIN: DataGrid = Matrix.getObject("GRD_MAIN") as DataGrid;
let VS_CONTROL_KW: TextBox = Matrix.getObject("VS_CONTROL_KW") as TextBox;
let VS_USE_YN: ComboBox = Matrix.getObject("VS_USE_YN") as ComboBox;
let btnAdd: Button = Matrix.getObject("btnAdd") as Button;
let btnSave: Button = Matrix.getObject("btnSave") as Button;
let btnFilter: Button = Matrix.getObject("btnFilter") as Button;
let btnDelete: Button = Matrix.getObject("btnDelete") as Button;
let CONTROL_BODY : RichTextBox = Matrix.getObject("CONTROL_BODY") as RichTextBox;
let btnValidate : Button = Matrix.getObject("btnValidate") as Button;

/** 
 * 데이터 저장 하기
 * @returns 
 */
const SaveData = function(){
    if(!GRD_MAIN.Validate()){
        Matrix.Information("입력 필수 항목을 선택해 주세요", "AUD");
        return;
    }
    Matrix.RunScript("GRD_MAIN", "SAVE_CONTROLS", function (p) {
        if (p.Success == false) {
            Matrix.Alert(p.Message);
            return;
        }else{            
            Matrix.Information("정상적으로 처리되었습니다.", "AUD");
            Matrix.doRefresh("GRD_MAIN");
        }
    });
};

/**
 * 데이터 조회 
 */
const QueryData = function(){
    if(GRD_MAIN.IsModified()){
        Matrix.Confirm("수정된 내용이 있습니다.\n저장하시겠습니까?", "저장 확인", function(ok){
            if(ok){
                SaveData();
            }else{
                Matrix.doRefresh("GRD_MAIN");            
            }
        },0);
        return;
    }
    Matrix.doRefresh("GRD_MAIN");
}; 

btnFilter.OnClick = function (sender, args) {
    QueryData();
}
// enter로 검색
VS_CONTROL_KW.OnTextKeypress = function (sender, args) {
    if (args.Event.isEnter()) {
        QueryData();
    }
}

btnAdd.OnClick = function (sender, args) {
    let nRow = GRD_MAIN.AppendRow();
};
btnDelete.OnClick = function (sender, args) {
    
    let rows = GRD_MAIN.GetSelectedRows();
    if (rows.length < 1) {
        Matrix.Information("삭제하실 목록을 선택해 주세요", "AUD");
        return;
    }
    Matrix.Confirm("선택하신 목록을 삭제하시겠습니까?", "삭제확인", function(ok){
        if(ok){
            for(let r=rows.length-1; r>=0;r--){
                GRD_MAIN.RemoveRow(rows[r], true);
            }
        }
    },0);    
};

GRD_MAIN.OnCreateNewRow = function (sender, args) {
    let nRow = args.Record;
    nRow.SetValue("CONTROL_CODE", "*");
    nRow.SetValue("CONTROL_WIDTH", 150);
    nRow.SetValue("CONTROL_HEIGHT", 23);
    nRow.SetValue("DELETE_YN", "N");
}


btnSave.OnClick = function (sender, args) {
    SaveData();  
}

/**
 * JSON 모델 정합성 검사
 *  
 * @param sender 
 * @param args 
 * @returns 
 */
btnValidate.OnClick = function(sender, args){
    try{
        let currentRow = GRD_MAIN.GetCurrentRow();
        if(!currentRow){
            Matrix.Information("컨트롤 목록을 추가 하시거나 선택해 주세요", "AUD");
            return;
        }
        if(!CONTROL_BODY.Text){
            Matrix.Information("컨트롤 정보가 없습니다.\n디자이너에서 복사한 데이터를 넣어 주세요", "AUD", function(){
                CONTROL_BODY.Focus();
            });
            return;
        }
        let model = JSON.parse(CONTROL_BODY.Text);
        let ctlModel : any;
        if(model.Elements && Array.isArray(model.Elements)){
            ctlModel = model.Elements[0];
        }else{
            ctlModel = model;
        }
        let text = JSON.stringify(ctlModel, null, "  ");    

       
        currentRow.SetValue("CONTROL_WIDTH", ctlModel.Position.Width);
        currentRow.SetValue("CONTROL_HEIGHT", ctlModel.Position.Height);            
        currentRow.SetValue("CONTROL_TYPE", ctlModel.Type);
        if(!currentRow.GetValue("CONTROL_NAME")){
            currentRow.SetValue("CONTROL_NAME", ctlModel.Name);
        }        
        currentRow.SetValue("CONTROL_BODY", text);        
        CONTROL_BODY.Text = text;
        GRD_MAIN.ReDraw();
    }catch(e){
        alert("control 모델 파싱 오류 " + e.Message);
    } 
}