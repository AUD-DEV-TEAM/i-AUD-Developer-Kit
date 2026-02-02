SELECT
     SUM(
        CASE
            WHEN EXTRACT(YEAR FROM CREATED_AT) = :VS_YEAR
            THEN 1
            ELSE 0
        END
     ) AS NEW_CUST

    , SUM(
        CASE
            WHEN EXTRACT(YEAR FROM CREATED_AT) = :VS_YEAR
            THEN 1
            ELSE 0
        END
     )
    -
     SUM(
        CASE
            WHEN EXTRACT(YEAR FROM CREATED_AT) = (:VS_YEAR - 1)
            THEN 1
            ELSE 0
        END
     ) AS DIFF
  FROM SM_CUSTOMER