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
import { FormDialog } from "@AUD_CLIENT/common/FormDialog";
import { ICell } from "@AUD_CLIENT/control/igrids/ICell";
import { IRow } from "@AUD_CLIENT/control/igrids/IRow";
 
let Matrix : Matrix; 
/*****************************
 * MX_GRID에 출력된 데이터에서 특정 검색어에 대한 탐색을 실행 합니다.
 * 
 *****************************/

let MXGrid : iGrid =   Matrix.getObject("MXGrid") as iGrid;

class MX_GRID_SEARCH_FORM {
    private FIND_WHAT : TextBox;
    private BTN_FIND : Button;
    private BTN_CLOSE : Button;
    private MX_GRID  : iGrid;
    private mDialog : FormDialog|null = null;
    constructor(mxGrid : string){   
              
        const _this = this;
        this.MX_GRID = Matrix.getObject(mxGrid) as iGrid;
        this.FIND_WHAT =   Matrix.getObject("FIND_WHAT") as TextBox;
        this.BTN_FIND  =   Matrix.getObject("BTN_FIND") as Button;
        this.BTN_CLOSE =   Matrix.getObject("BTN_CLOSE") as Button;    
        
        this.MX_GRID.Viewer().setDisplayHeadings(true);
        parent.document.addEventListener("keydown", function(event:KeyboardEvent){
            if(event.ctrlKey && (event.key == "f" || event.key == "F")){
                _this.Show();
                event.preventDefault();
            }
        });
        
        this.BTN_CLOSE.OnClick = function(sender,args){
            if(_this.mDialog){
                _this.mDialog.Close();
                _this.mDialog = null;
            }
        };
        this.BTN_FIND.OnClick = function(sender,args){
            _this.Find();
        };
        this.FIND_WHAT.OnTextKeydown = function(sender, args){
            
            if(args.Event.isEnter()){
                _this.Find();
            }
         }
        
    } 
    public Show(mxGrid?:string):void{
        const _this = this;
        if(this.mDialog != null){
            this.mDialog.Close();
            this.mDialog = null;
        }
        if(mxGrid){
            //mx_grid 변경
            this.MX_GRID = Matrix.getObject(mxGrid) as iGrid;
        }
        this.FIND_WHAT.Text = "";
        //검색 창 팝업 실행하기
        this.mDialog = Matrix.ShowWindow("FRM_SEARCH", 0,0, 400, 150, false, false, "찾기",false, null, 0, null, false);
        //화면 가운데로 이동
        this.mDialog.MoveToCenter();
        this.mDialog.OnClosed = function(sender, args){
            _this.mDialog = null;
        };
        this.FIND_WHAT.Focus();
    }  
    public FindNext():boolean{
        
        if(!this.MX_GRID){return  false;}
        let keyword = this.FIND_WHAT.Text? this.FIND_WHAT.Text.trim().toLowerCase() : "";
        if(!keyword){return false;}
        
        
        let ws =  this.MX_GRID.Viewer().getActiveWorkSheet();
        if(!ws){ return false;}
        let selection = this.MX_GRID.getSelection();
        let BEGIN_POS = {"R":0, "C":0};
        let selectRect = selection.getSelectionRectangle();
        
        if(selectRect){
            BEGIN_POS = {"R":selectRect.Y1-1, "C": selectRect.X1};            
        }
        let row : IRow;
        let cell : ICell;
        let text : string;
        let value : string;
        
        if(BEGIN_POS.R >= ws.Rows.length){
            return false;
        }
        selection.Clear();
        for(let r=BEGIN_POS.R,r2=ws.Rows.length; r<r2; r++){
            if(ws.Rows[r].Visible === false) continue;

            row = ws.Rows[r];
            if(BEGIN_POS.C >= row.Cells.length){
                BEGIN_POS.C = 0;
                continue;
            }
            for(let c=BEGIN_POS.C,c2=row.Cells.length;c<c2; c++){
                cell = row.Cells[c];
                if(ws.Columns[cell.C-1].Visible === false){continue;}
                text  = cell.Text ? cell.Text.toLowerCase() : "";
                value = cell.Value ? (cell.Value + "").toLowerCase() : "";
                if(text.indexOf(keyword)>=0 || value.indexOf(keyword)>0){
                    selection.Select(row.R, cell.C);     
                    this.MX_GRID.Update();
                    this.MX_GRID.ScrollMove(
                        Math.max(0, ws.Columns[cell.C-1].Left - (this.MX_GRID.Width / 2))
                        , Math.max(0, row.Top - (this.MX_GRID.Height / 2))
                        , 100); 
                    return true;
                }
            }            
            BEGIN_POS.C = 0;
        }
        return false;
        
    }

    private mWait : boolean = false;
    public Find():void{ 
        const _this = this;
        if(_this.mWait){return;}
        _this.mWait = true;
        if(this.FindNext()){        
            //다음 찾기
            window.setTimeout(function(){
                _this.FIND_WHAT.Focus();
                _this.mWait = false;
            }, 300);            
        }else{
            _this.mWait = false;
            Matrix.iMessage("["+this.FIND_WHAT.Text+"]을/를 찾을 수가 없습니다.")
        }
    }
    
}


let TEXT_SEARCHER = new MX_GRID_SEARCH_FORM("MXGrid");
