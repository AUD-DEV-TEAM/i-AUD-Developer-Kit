SELECT 
    "T1"."D1" AS "제품명" -- 제품명 
    ,"T1"."D2" AS "지점명" -- 지점명 
    ,"T1"."D3" AS "성별" -- 성별 
    ,"T1"."D4" AS "매출월" -- 월 
    ,"T1"."D5" AS "매출년" -- 년도 
    ,"T1"."M1" AS "판매수량" -- 판매수량 
    ,"T1"."M2" AS "판매단가" -- 판매단가 
FROM "MEX_USER_FILE_DATA" "T1" 
WHERE "T1"."META_FILE_CODE" = 'RPT3048F89487B44C768239763DAC46B288'