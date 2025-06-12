--DROP TABLE AUD_USER_CONTROL;
CREATE TABLE AUD_USER_CONTROL(
    CONTROL_CODE                VARCHAR(50)         NOT NULL, -- 컨트롤 코드
    CONTROL_TYPE                VARCHAR(256)            NULL, -- 컨트롤 타입
    CONTROL_NAME                VARCHAR(256)            NULL, -- 컨트롤 이름
    CONTROL_DESC                VARCHAR(512)            NULL, -- 컨트롤 설명
    CONTROL_BODY                TEXT                    NULL, -- 컨트롤 생성 JSON    
    CONTROL_WIDTH               INTEGER                 NULL, -- 컨트롤 기본 너비
    CONTROL_HEIGHT              INTEGER                 NULL, -- 컨트롤 기본 높이

    VAR_NAMES               VARCHAR(4000)            NULL, -- 변수명 목록 (;로 구분 입력)
    
    
    DELETE_YN                CHAR(1)              NOT NULL, -- 삭제 여부 (Y: 삭제, N: 미삭제)

    CREATE_USER             VARCHAR(50),
    CREATE_DATE             TIMESTAMP,
    MODIFY_USER             VARCHAR(50),
    MODIFY_DATE             TIMESTAMP,
    CONSTRAINT XPK_AUD_USER_CONTROL_001 PRIMARY KEY (CONTROL_CODE)
);


-----------------------------------
-- 문서 정보
-----------------------------------
CREATE TABLE AUD_DOC_REPORT(
    REPORT_CODE                 VARCHAR(50)  NOT NULL,  -- 보고서 코드
    REPORT_NAME                 VARCHAR(256) NOT NULL,  -- 보고서 명
    FOLDER_CODE                 VARCHAR(50)  NOT NULL,  -- 폴더 코드
    REPORT_DESC                 VARCHAR(512)     NULL,
    CREATE_USER                 VARCHAR(50),
    CREATE_DATE                 TIMESTAMP,
    MODIFY_USER                 VARCHAR(50),
    MODIFY_DATE                 TIMESTAMP,
    CONSTRAINT XPK_AUD_DOC_REPORT_001 PRIMARY KEY (REPORT_CODE)
);
-----------------------------------
-- 폼 정보
-----------------------------------
CREATE TABLE AUD_DOC_FORM(
    REPORT_CODE                 VARCHAR(50)  NOT NULL,  -- 보고서 코드
    FORM_SEQ                    INTEGER      NOT NULL,  -- FORM 순서

    FORM_NAME                   VARCHAR(256) NOT NULL,  -- FORM NAME
    VISIBLE                          CHAR(1) NOT NULL, -- 입력 필수 값 (Y:표시, N:숨김)    
    LAYOUT_MODEL            TEXT, -- 배치 모델

    CREATE_USER             VARCHAR(50),
    CREATE_DATE             TIMESTAMP,
    MODIFY_USER             VARCHAR(50),
    MODIFY_DATE             TIMESTAMP,
    CONSTRAINT XPK_AUD_DOC_FORM_001 PRIMARY KEY (REPORT_CODE, FORM_SEQ)
);
--DROP TABLE AUD_DOC_CONTROL;
CREATE TABLE AUD_DOC_CONTROL(
    REPORT_CODE                 VARCHAR(50)  NOT NULL,  -- 보고서 코드    
    FORM_SEQ                                  INTEGER,  -- FORM 순서

    CONTROL_NAME                VARCHAR(256) NOT NULL,  -- 컨트롤 이름 (변수명)
    
    CONTROL_CODE                VARCHAR(50)  NOT NULL, -- 컨트롤 코드(AUD_USER_CONTROL.CONTROL_CODE)
    
    CONTROL_LABEL               VARCHAR(256)     NULL, -- 컨트롤 라벨명(옵션)   
    
    CONTROL_LEFT                    INTEGER      NULL, -- 컨트롤 위치(LEFT)
    CONTROL_TOP                     INTEGER      NULL, -- 컨트롤 위치(TOP)   
    CONTROL_WIDTH               INTEGER                 NULL, -- 컨트롤 기본 너비
    CONTROL_HEIGHT              INTEGER                 NULL, -- 컨트롤 기본 높이
    
    VAR_NAMES               VARCHAR(4000)            NULL, -- 변수명 목록 (;로 구분 입력)
    
  
    INPUT_MUST                       CHAR(1)     NULL, -- 입력 필수 값 (Y:필수, N:필수 아님)
    TAB_INDEX                                 INTEGER, -- TAB-INDEX
    CONTROL_SEQ                               INTEGER, -- 컨트롤 배치 순서 

    ATTRIBUTE_0                 VARCHAR(256)     NULL, -- 옵션 0
    ATTRIBUTE_1                 VARCHAR(256)     NULL, -- 옵션 1
    ATTRIBUTE_2                 VARCHAR(256)     NULL, -- 옵션 2
    ATTRIBUTE_3                 VARCHAR(256)     NULL, -- 옵션 3
    ATTRIBUTE_4                 VARCHAR(256)     NULL, -- 옵션 4
    ATTRIBUTE_5                 VARCHAR(256)     NULL, -- 옵션 5
    ATTRIBUTE_6                 VARCHAR(256)     NULL, -- 옵션 6
    ATTRIBUTE_7                 VARCHAR(256)     NULL, -- 옵션 7
    ATTRIBUTE_8                 VARCHAR(256)     NULL, -- 옵션 8
    ATTRIBUTE_9                 VARCHAR(256)     NULL, -- 옵션 9   
    
    CREATE_USER             VARCHAR(50),
    CREATE_DATE             TIMESTAMP,
    MODIFY_USER             VARCHAR(50),
    MODIFY_DATE             TIMESTAMP,
    CONSTRAINT XPK_AUD_DOC_CONTROL_001 PRIMARY KEY (REPORT_CODE, CONTROL_NAME)
);
---------------------------------
-- 컬럼 Master
---------------------------------
CREATE TABLE AUD_COLUMN_MASTER(
    COLUMN_CODE     VARCHAR(50)  NOT NULL,  -- 컬럼 코드 (UUID)
    COLUMN_NAME     VARCHAR(256) NOT NULL, -- 컬럼명
    COLUMN_DESC     VARCHAR(256)     NULL, -- 컬럼 설명
    COLUMN_LABEL    VARCHAR(256) NOT NULL, -- 컬럼 라벨
    DATA_TYPE       VARCHAR(50)  NOT NULL, -- (Numeric, String, DateTime8, DateTimeNow,  UserCode, CLOB, UUID)
    COLUMN_TYPE     VARCHAR(50)  NOT NULL, -- (Text, CheckBox,NumberBox,ComboBox,DateTime,MaskEdit,Image,MultiLineText)
    FORMAT_TEXT     VARCHAR(256)     NULL, -- 포멧
    TEXT_ALIGN      VARCHAR(256)     NULL, -- (Left,Center,Right)
    COLUMN_WIDTH                  INTEGER, -- 컬럼 너비
    WIDTH_TYPE      VARCHAR(50)      NULL, -- (Pixel, Star)
    COLUMN_UNIT                   INTEGER, -- 컬럼 UNIT
    HEADER_STYLE    VARCHAR(256)     NULL, -- 헤더 스타일
    BODY_STYLE      VARCHAR(256)     NULL, -- 본문 스타일
    FILTER_ABLE     VARCHAR(256)     NULL, -- 필터 가능 여부
    SORT_ABLE       VARCHAR(256)     NULL, -- 정렬 가능 여부
    
    CREATE_USER             VARCHAR(50),
    CREATE_DATE             TIMESTAMP,
    MODIFY_USER             VARCHAR(50),
    MODIFY_DATE             TIMESTAMP,
    CONSTRAINT XPK_AUD_COLUMN_MASTER_001 PRIMARY KEY (COLUMN_CODE) 
);

