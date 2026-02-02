// Please do not modify or delete the following variables: "CALL_BACK", "Matrix". 
var req = Matrix.getRequest(); /* Request */
var res = Matrix.getResponse(); /* Response */
var session = Matrix.getSession(); /* Session */
var util = Matrix.getUtility(); /* Utility */
var fso = Matrix.getFileSystemObject(); /* File Access */
var con = Matrix.getConnection(); /* DataBase Connection */
// Please do not modify or delete the following variables: "CALL_BACK", "Matrix". 
var req = Matrix.getRequest(); /* Request */
var res = Matrix.getResponse(); /* Response */
var session = Matrix.getSession(); /* Session */
var util = Matrix.getUtility(); /* Utility */
var fso = Matrix.getFileSystemObject(); /* File Access */
var con = Matrix.getConnection(); /* DataBase Connection */
var req = Matrix.getRequest(); // request
//var table = req.getTable("GRID_NAME"); //get grid's work data
var con = Matrix.getConnection(); // dbms connection
var gen = Matrix.getQueryGenerator(); // query generator
var sql = "";
var stmt;
try {
    //connection
    con.Connect("AUD_SAMPLE_DB"); // set target dbms connection code
    con.BeginTransaction(); // begin transaction	 
    // INSERT
    sql = " INSERT INTO SM_CUSTOMER ( 															"
        + "\n     CUST_ID 																		"
        + "\n   , CUST_NAME																		"
        + "\n   , BIZ_REG_NO  																	"
        + "\n   , CUST_TYPE 																	"
        + "\n   , CUST_GRADE  																	"
        + "\n   , CREDIT_LIMIT  																"
        + "\n   , PHONE 																		"
        + "\n   , EMAIL 																		"
        + "\n   , ADDR_MAIN 																	"
        + "\n   , CREATED_AT  																	"
        + "\n   , CREATED_BY  																	"
        + "\n ) 																				"
        + "\n VALUES (  																		"
        + "\n     (SELECT 'CUST'  																"
        + "\n           || RIGHT('000' || 														"
        + "\n                   CAST(COALESCE(MAX(SUBSTRING(CUST_ID, 5)),'0') AS INTEGER) + 1 	"
        + "\n                 , 3) AS CUST_ID 													"
        + "\n       FROM SM_CUSTOMER) 															"
        + "\n   , ?  																			"
        + "\n   , ? 																			"
        + "\n   , ?  																			"
        + "\n   , ? 																			"
        + "\n   , ? 																			"
        + "\n   , ?  																			"
        + "\n   , ?  																			"
        + "\n   , ?  																			"
        + "\n   , NOW()																			"
        + "\n   , ? 																			"
        + "\n );  																				";
    stmt = con.PreparedStatement(sql);
    stmt.setString(1, req.getParam('VS_INP_NAME')); // CUST_NAME
    stmt.setString(2, req.getParam('VS_INP_REG_NO')); // BIZ_REG_NO
    stmt.setString(3, req.getParam('VS_INP_TYPE')); // CUST_TYPE
    stmt.setString(4, req.getParam('VS_INP_GRADE')); // CUST_GRADE
    stmt.setInt(5, req.getParam('VN_INP_LIMIT')); // CREDIT_LIMIT
    stmt.setString(6, req.getParam('VS_INP_PHONE')); // PHONE
    stmt.setString(7, req.getParam('VS_INP_EMAIL')); // EMAIL
    stmt.setString(8, req.getParam('VS_INP_MAIN')); // ADDR_MAIN
    stmt.setString(9, req.getUserCode()); // CREATED_BY
    Matrix.WriteLog(sql);
    stmt.executeUpdate();
    stmt.close();
    stmt = null;
    // COMMIT
    con.CommitTransaction();
    con.DisConnect();
    con = null;
}
catch (e) {
    Matrix.WriteLog("ERROR" + e.message);
    if (con != null) {
        try {
            con.RollBackTransaction();
            con.DisConnect();
            con = null;
        }
        catch (e) {
        }
    }
    Matrix.ThrowException("Server Exception:" + e.message);
}
