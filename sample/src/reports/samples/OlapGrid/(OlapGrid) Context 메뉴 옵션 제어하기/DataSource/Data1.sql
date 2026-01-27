SELECT 
    "T1"."D1" AS  "시도별" 
    ,"T1"."D2" AS  "발주년" 
    ,"T1"."D3" AS  "발주월" 
    ,"T1"."D4" AS  "발주자별" 
    ,"T1"."M1" AS  "데이터" 
FROM "MEX_USER_FILE_DATA" "T1" 
WHERE "T1"."META_FILE_CODE" = 'RPT44F134BFC0A84EF9BEB80D2CC25AE694'