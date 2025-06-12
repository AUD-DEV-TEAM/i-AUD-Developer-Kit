/***********************************************
 * 보고서 초기화 처리 (Param 시트의 정보를 계산 해서 컨트롤의 값으로 넣는다.) 
***********************************************/
<%@include file="/MH_AUD_COMMON/INIT_PARAM.jsx"%>
 var REPORT_CODE = Matrix.getRequest().getReportCode();
 var MXGRID_CODE = "REPC8F888A307AD4B63A1173C53563DFFA50"; 
 var INIT_LIST   = [{"Name":"datepicker1","InitCell":"Param!$C$5","LinkedCell":"Param!$E$5","Value":""},{"Name":"C_VS_SOTY_CD_1","InitCell":"Param!$C$40","LinkedCell":"Param!$K$40","Value":""},{"Name":"Label","InitCell":"'null","Value":""},{"Name":"Label2","InitCell":"'null","Value":""},{"Name":"Label11","InitCell":"'null","Value":""},{"Name":"datepicker2","InitCell":"Param!$C$39","LinkedCell":"Param!$E$39","Value":""},{"Name":"C_VS_SOTY_CD","InitCell":"Param!$C$20","LinkedCell":"Param!$E$20","Value":""},{"Name":"Label4","InitCell":"'null","Value":""},{"Name":"Label9","InitCell":"'null","Value":""},{"Name":"img_GMGO","InitCell":"'null","Value":""},{"Name":"Label13","InitCell":"'null","Value":""}]; 
 READ_INIT_VALUES(REPORT_CODE, MXGRID_CODE, INIT_LIST); 
 var RESULT = {"INIT_LIST":INIT_LIST  
              , "COMMONJS": READ_COMMON_JSCRIPT() 
              };
 Matrix.getResponse().WriteResponseText(JSON.stringify(RESULT)); 