SELECT   T1.YYYY 
	, T1.MM -- 월
	, T1.SEX -- 성별
	, T1.PRODUCT -- 제품명
	, T1.BRANCH -- 지점명
	, SUM(T1.SALE_QTY) -- 판매수량
	, SUM(T1.SALE_PRICE) -- 판매단가
FROM MEX_COFFEE T1 -- 커피_매출정보
GROUP BY T1.YYYY,
	T1.MM,
	T1.SEX,
	T1.PRODUCT,
	T1.BRANCH
