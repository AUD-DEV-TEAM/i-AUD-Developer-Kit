  SELECT  T1.mex_seq 		AS "Id" 
 		, T1.item_name 		AS "품명" 
 		, T1.item_size 		AS "평형" 
 		, T1.item_spec 		AS "구분" 
 		, T1.product_name 		AS "제조사" 
 		, T1.min_price 		AS "최소판매가" 
 		, T1.max_price 		AS "최대판매가" 
 FROM mex_aircon_sales T1 