SELECT   "T1"."D1" as "제품명"
           , "T1"."D2" as "지점명"
           , "T1"."D5" as "년도"
           , "T1"."D4" as "월"
           , "T1"."M1" as "판매수량"
           , "T1"."M2" as "판매단가"
FROM MEX_USER_FILE_DATA "T1"
WHERE   "T1"."META_FILE_CODE" = 'RPT3048F89487B44C768239763DAC46B288' 
