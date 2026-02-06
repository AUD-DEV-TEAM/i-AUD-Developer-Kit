
/**
 * 이 샘플은 SQL을 프로그램을 통해 제어하는 샘플입니다.
 * AUD Platform에서는 Dynamic SQL을 지원하므로 쿼리 실행 시점에 SQL을
 * 프로그램으로 제어할 수 있습니다.
 * */

import { Matrix } from "@AUD_SERVER/matrix/script/Matrix"; 
import { ScriptRecordSet } from "@AUD_SERVER/matrix/script/ScriptRecordSet"; 
import { ScriptPreparedStatement } from "@AUD_SERVER/matrix/script/ScriptPreparedStatement"; 
import { ScriptDataRow } from "@AUD_SERVER/matrix/script/ScriptDataRow"; 
import { ScriptTextFileWriter } from "@AUD_SERVER/matrix/script/io/ScriptTextFileWriter"; 
import { ScriptRequestPacket } from "@AUD_SERVER/matrix/script/ScriptRequestPacket"; 
import { ScriptResponsePacket } from "@AUD_SERVER/matrix/script/ScriptResponsePacket"; 
import { ScriptUtility } from "@AUD_SERVER/matrix/script/ScriptUtility"; 
import { ScriptFileSystemObject } from "@AUD_SERVER/matrix/script/ScriptFileSystemObject";  
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection"; 
import { ScriptSelection } from "@AUD_CLIENT/control/olap/ScriptSelection"; 
import { ScriptSession } from "@AUD_SERVER/matrix/script/ScriptSession"; 
import { ScriptQueryGenerator } from "@AUD_SERVER/matrix/script/ScriptQueryGenerator"; 
import { QueryRepository } from "../ServerScript/@DATA_MASTER";
let Matrix : Matrix; 

//특정 보고서의 서버 스크립트 Include 하기
//<%@include file="/DYNAMIC_SQL/DATA_MASTER.jsx"%>  

let req = Matrix.getRequest();


//서버 스크립트 소스에서 판매 정보 SQL을 반환 합니다.
let sql : string = QueryRepository.getSalesList("DEFAULT");

//현재 데이터 소스의 SQL을 설정합니다.
Matrix.setResultDynamicSQL(sql);
 
