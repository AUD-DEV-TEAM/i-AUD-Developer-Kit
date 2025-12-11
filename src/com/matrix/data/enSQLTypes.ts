/**
* JDBC 쿼리 데이터 유형
* @enum
*/
export enum enSQLTypes{

  /** NULL */
  "NULL" = 0,

  /** CURSOR */
  "CURSOR" = -10,

  /** BIT */
  "BIT" = -7,

  /** TINYINT */
  "TINYINT" = -6,

  /** SMALLINT */
  "SMALLINT" = 5,

  /** INTEGER */
  "INTEGER" = 4,

  /** BIGINT */
  "BIGINT" = -5,

  /** FLOAT */
  "FLOAT" = 6,

  /** REAL */
  "REAL" = 7,

  /** DOUBLE */
  "DOUBLE" = 8,

  /** NUMERIC */
  "NUMERIC" = 2,

  /** DECIMAL */
  "DECIMAL" = 3,

  /** CHAR */
  "CHAR" = 1,

  /** VARCHAR */
  "VARCHAR" = 12,

  /** LONGVARCHAR */
  "LONGVARCHAR" = -1,

  /** DATE */
  "DATE" = 91,

  /** TIME */
  "TIME" = 92,

  /** TIMESTAMP */
  "TIMESTAMP" = 93,

  /** CLOB */
  "CLOB" = 2005,

  /** BOOLEAN */
  "BOOLEAN" = 16,

  /** NCHAR */
  "NCHAR" = -15,

  /** NVARCHAR */
  "NVARCHAR" = -9,

  /** LONGNVARCHAR */
  "LONGNVARCHAR" = -16,

}
