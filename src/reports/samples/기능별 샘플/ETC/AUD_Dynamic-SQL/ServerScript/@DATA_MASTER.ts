import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";

let Matrix : Matrix; 
/***********************************
 * 쿼리를 반환해 주는 공통 소스 샘플
 * 다른 화면에서 이소스에 있는 함수를 호출하려면 import 구문과 함께 inclde 구문을 주석으로 추가해야 합니다.
 * import { QueryRepository } from "../ServerScript/@DATA_MASTER";
 * //<%@include file="/DYNAMIC_SQL/DATA_MASTER.jsx"%> 
************************************/

export class QueryRepository{
	private static Request  = Matrix.getRequest(); /* request */
	private static Session  = Matrix.getSession(); /* session */
	private static Utility  = Matrix.getUtility(); /* utility */
	private static QueryHelper = Matrix.getQueryGenerator(); 

	public static CONNECTION_CODE = "MTXRPTY";
	 

	/**
	 * 매출정보 쿼리 반환
	 * @param keyword 
	 * @returns 
	 */
	public static getSalesList(keyword:string):string{
 

		let sqls: Array<string> = [];
		sqls.push("	SELECT   T1.D1 -- 제품명");
		sqls.push("		, T1.D2 -- 지점명");
		sqls.push("		, T1.D3 -- 성별");
		sqls.push("		, T1.D4 -- 월");
		sqls.push("		, T1.D5 -- 년도");
		sqls.push("		, SUM(T1.M1) -- 판매수량");
		sqls.push("		, SUM(T1.M2) -- 판매금액");
		sqls.push("		, COUNT(T1.D2) -- 고객수");
		sqls.push("		, SUM(T1.M1) -- 판매 수량 (전년)");
		sqls.push("	FROM MEX_USER_FILE_DATA T1");
		sqls.push("	WHERE (");
		sqls.push("			1 = 1");
		sqls.push("			AND T1.META_FILE_CODE = 'RPT3048F89487B44C768239763DAC46B288'");
		sqls.push("			)");
		sqls.push("	GROUP BY T1.D1,");
		sqls.push("		T1.D2,");
		sqls.push("		T1.D3,");
		sqls.push("		T1.D4,");
		sqls.push("		T1.D5");
 

		//파라미터 추가
		 QueryRepository.Request.setParam("VS_ORG_CODE", "orgCode");
		//바인딩 된 쿼리 반환
		return QueryRepository.QueryHelper.getParameterBindedSQL(sqls.join("\n"), this.CONNECTION_CODE);
	} 
}

