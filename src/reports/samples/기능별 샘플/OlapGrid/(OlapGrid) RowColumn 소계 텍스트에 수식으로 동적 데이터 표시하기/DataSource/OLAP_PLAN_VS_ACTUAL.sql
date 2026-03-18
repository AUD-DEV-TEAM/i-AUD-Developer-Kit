SELECT P.PLAN_YEAR
     , P.PLAN_MONTH
     , D.DEPT_NAME
     , E.EMP_NAME
     , CC.CODE_NAME                                              AS PROD_CATEGORY
     , PR.PROD_NAME
     , COALESCE(P.TARGET_QTY, 0)                                AS TARGET_QTY
     , COALESCE(P.TARGET_AMT, 0)                                AS TARGET_AMT
     , COALESCE(S.ACTUAL_QTY, 0)                                AS ACTUAL_QTY
     , COALESCE(S.ACTUAL_AMT, 0)                                AS ACTUAL_AMT
  FROM SM_SALES_PLAN P
  LEFT JOIN (
       SELECT TO_CHAR(SP.SALES_DATE, 'YYYY') AS S_YEAR
            , TO_CHAR(SP.SALES_DATE, 'MM')   AS S_MONTH
            , SP.EMP_ID
            , SP.PROD_ID
            , SUM(SP.QTY)                    AS ACTUAL_QTY
            , SUM(SP.NET_AMOUNT)             AS ACTUAL_AMT
         FROM SM_SALES_PERFORMANCE SP
        WHERE SP.SALES_STATUS = 'COMPLETED'
        GROUP BY TO_CHAR(SP.SALES_DATE, 'YYYY')
               , TO_CHAR(SP.SALES_DATE, 'MM')
               , SP.EMP_ID
               , SP.PROD_ID
  ) S
    ON P.PLAN_YEAR  = S.S_YEAR
   AND P.PLAN_MONTH = S.S_MONTH
   AND P.EMP_ID     = S.EMP_ID
   AND P.PROD_ID    = S.PROD_ID
  LEFT JOIN SM_EMPLOYEE E
    ON P.EMP_ID = E.EMP_ID
  LEFT JOIN SM_DEPARTMENT D
    ON E.DEPT_ID = D.DEPT_ID
  LEFT JOIN SM_PRODUCT PR
    ON P.PROD_ID = PR.PROD_ID
  LEFT JOIN SM_COMMON_CODE CC
    ON CC.GROUP_CD = 'PROD_CATEGORY'
   AND CC.CODE     = PR.CATEGORY
 WHERE P.PLAN_STATUS = 'CONFIRMED'
 ORDER BY P.PLAN_YEAR, P.PLAN_MONTH, D.DEPT_NAME, E.EMP_NAME
