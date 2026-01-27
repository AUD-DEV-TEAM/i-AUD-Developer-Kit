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
/*****************************
 * MX-GRID 시트 이동 시 스크롤 유지하기
 *****************************/
let SCROLL_INFO : {[key:string]:{"X":number,"Y":number}} = {};

const MXGrid : iGrid =   Matrix.getObject("MXGrid") as iGrid;
const btnV1 : Button =   Matrix.getObject("btnV1") as Button;
const btnV2 : Button =   Matrix.getObject("btnV2") as Button;
const btnV3 : Button =   Matrix.getObject("btnV3") as Button;

// MX-Grid 헤더 표시 하기
MXGrid.Viewer().setDisplayHeadings(true);
/**
 * 스크롤 위치를 기억한다.
 */
const SaveScroll = function(){
    SCROLL_INFO[MXGrid.ActiveSheet] = {"X": MXGrid.ScrollLeft, "Y": MXGrid.ScrollTop};
}
/**
 * 버튼 클릭 시 시트 이동
 *  - 시트 이동전에 현재 스크롤의 위치를 기억한다.
 * @param sender 
 * @param args 
 */
btnV1.OnClick = function(sender, args){
    SaveScroll();
    MXGrid.ChangeSheet("V1");
};
btnV2.OnClick = function(sender, args){
    SaveScroll();
    MXGrid.ChangeSheet("V2");
};
btnV3.OnClick = function(sender, args){
    SaveScroll();
    MXGrid.ChangeSheet("V3");
};

/**
 * 시트가 이동되면 스크롤 정보를 확인 해서 복원한다.
 */
MXGrid.OnSheetChanged = function(sender, args){
    let scrollInfo = SCROLL_INFO[args.SheetName];
    if(scrollInfo){
        MXGrid.ScrollMove(scrollInfo.X, scrollInfo.Y);
    }
};
MXGrid.OnDataBindEnd = function(sender, args){
    //데이터 조회 시 초기화
    SCROLL_INFO = {};
};
