WITH BASE AS (
    SELECT CASE
             WHEN C.ADDR_MAIN LIKE '서울%' 
               OR C.ADDR_MAIN LIKE '경기%' 
               OR C.ADDR_MAIN LIKE '인천%' THEN '서울/경기'

             WHEN C.ADDR_MAIN LIKE '부산%' 
               OR C.ADDR_MAIN LIKE '경남%' THEN '부산/경남'

             WHEN C.ADDR_MAIN LIKE '대구%' 
               OR C.ADDR_MAIN LIKE '경북%' THEN '대구/경북'

             WHEN C.ADDR_MAIN LIKE '대전%' 
               OR C.ADDR_MAIN LIKE '충북%' 
               OR C.ADDR_MAIN LIKE '충남%' 
               OR C.ADDR_MAIN LIKE '세종%' THEN '대전/충청'

             ELSE '기타'
           END AS REGION
         , S.NET_AMOUNT
    FROM SM_SALES_PERFORMANCE S
    LEFT JOIN SM_CUSTOMER C
      ON S.CUST_ID = C.CUST_ID
   WHERE TO_CHAR(S.SALES_DATE,'YYYY') = :VS_YEAR
),
REGION_SALES AS (
    SELECT REGION
         , SUM(NET_AMOUNT) AS SALES_AMOUNT
      FROM BASE
     GROUP BY REGION
),
REGION_FIX AS (
    SELECT '서울/경기' AS REGION, 1 AS ORD UNION ALL
    SELECT '부산/경남', 2 UNION ALL
    SELECT '대구/경북', 3 UNION ALL
    SELECT '대전/충청', 4 UNION ALL
    SELECT '기타', 5
)
SELECT F.REGION
     , R.SALES_AMOUNT / NULLIF(SUM(R.SALES_AMOUNT) OVER (), 0) AS SALES_RATIO
  FROM REGION_FIX F
  LEFT JOIN REGION_SALES R
  	ON F.REGION = R.REGION
 ORDER BY F.ORD