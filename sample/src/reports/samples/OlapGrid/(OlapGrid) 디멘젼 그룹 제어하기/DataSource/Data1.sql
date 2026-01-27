SELECT "T1"."D1" AS "수불일자"
       , "T1"."D2" AS "품목코드"
       , "T1"."D3" AS "품명"
       , "T1"."D4" AS "규격"
       , "T1"."D5" AS "창고구분"
       , "T1"."D6" AS "창고코드"
       , "T1"."D7" AS "창고이름"
       , "T1"."D8" AS "수불구분"
       , "T1"."M1" AS "수불단가"
       , "T1"."M2" AS "수불수량"
       , "T1"."M3" AS "수불금액"
FROM MEX_USER_FILE_DATA "T1"
WHERE (
      1 = 1
      AND "T1"."META_FILE_CODE" = 'RPTAC6A247392B94F928900F811D1AE1F5C'
      )