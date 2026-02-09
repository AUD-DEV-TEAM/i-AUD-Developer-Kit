
/**
 * 이 샘플은 SQL을 프로그램을 통해 제어하는 샘플입니다.
 * AUD Platform에서는 Dynamic SQL을 지원하므로 쿼리 실행 시점에 SQL을
 * 프로그램으로 제어할 수 있습니다.
 * */

import { Matrix } from "@AUD_SERVER/matrix/script/Matrix"; 
import { QueryRepository } from "../ServerScript/@DATA_MASTER";
let Matrix : Matrix; 

//특정 보고서의 서버 스크립트 Include 하기
//<%@include file="/DYNAMIC_SQL/DATA_MASTER.jsx"%>  

let req = Matrix.getRequest();

//서버 스크립트 소스에서 판매 정보 SQL을 반환 합니다.
let sql : string = QueryRepository.getSalesList("DEFAULT");

//현재 데이터 소스의 SQL을 설정합니다.
Matrix.setResultDynamicSQL(sql);
 
