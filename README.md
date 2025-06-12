# i-AUD Developer Kit

## 1. Setting Up the Report Development Environment

### 1.1 Open VS Code in the Working Directory
```sh
cd D:\aud_report
code .
```
### 1.2 GitHub
  https://github.com/AUD-DEV-TEAM/i-AUD-Developer-Kit
  
### 1.3 Configure Local Development Server
Create a `.vscode/settings.json` file and add the following content:

```json
{
    "aud.config": {
        "SourcePath": "D:\\aud_report\\src\\reports\\", // Root path for report source files
        "OutputPath": "D:\\aud_report\\out\\reports\\", // Output directory
        "ServiceURL": "http://aaa.com:8080",  // Server address
        "UserName": "{your account name}",  // Account name
        "ApiKey": "{your api key}",  // API Key
        "AutoBuild": false,     // Automatically build all sources when saving (Recommended: use `tsc --w` feature.)
        "MX_GRID_BACKUP": true, // Whether to download MX-GRID information
        "MX_GRID_JSON_PRETTY": true  // Whether to automatically format the MX-GRID JSON model
    }
}
```
> **Note**: Obtain your `ApiKey` from **Admin > System Management > Application Management**.

## 2. Report Development Process

### 2.1 Launch i-AUD Designer and Save a New Report
- Enter `@HELLO_AUD@AUD Sample` in the report name field.
- This report will be saved with the code `HELLO_AUD` and the name `AUD Sample`.
  
### 2.2 Create a Folder for the Report
Create a folder to store the `AUD Sample` report.
**Example:**
``` 
D:\aud_report\src\reports\HELLO_AUD
```

### 2.3 Create the Report Configuration File (`.aud.json`)
This file must contain the `ReportCode` value that matches the actual report code.
**Example:**
```json
//D:\aud_report\src\reports\HELLO_AUD\.aud.json
{
    "ReportCode": "HELLO_AUD" 
}
```

### 2.4 Import the Report
Press `Ctrl + Shift + P` to open the command palette, then run `AUD: Import Report`.
This will fetch detailed report information from the server, update the configuration file, and automatically generate additional development folders.
**Example:**
 - `./HELLO_AUD.mtsd`: i-AUD report file
 - `./ServerScript/*.ts`: Server script files
 - `./DataSource/*.sql, *.ts`: Data source SQL files
 - `./MX_GRID/*.json2`: MX-GRID design files
 - `./MX_GRID/*.xlsx`: Original MX-GRID Excel files
 - `./MX_GRID/*.ds`: MX-GRID data source files

```json
//D:\aud_report\src\reports\HELLO_AUD\.aud.json
{
    "ReportCode": "HELLO_AUD",  
    "ReportName": "AUD Sample",
    "Writer": "aud_developer",
    "WriteDate": "2025-02-20 19:38:03",
    "Editor": "aud_developer",
    "EditDate": "2025-02-20 19:38:03",
    "DocumentVersion": "3.0.0.0"
}
```

### 2.5 Enable TypeScript Compilation
Run the following command in the terminal to enable automatic TypeScript compilation:
```sh
tsc --w
```

## 3. Using VS Code Commands
Press `Ctrl + Shift + P` to open the command palette, type `AUD`, and use the following commands:


- **AUD: Download Report**
  - 서버에서 특정 이름을 가진 프로그램을 다운로드 합니다.
  - reports 폴더에 다운로드 되며, 원하시는 경로로 이동하실 수 있습니다.

- **AUD: Download Folder**
  - 서버에서 특정 폴더(폴더 코드 기중) 하위의 모든 보고서를 압축해서 다운로드 합니다.

- **AUD: Import Report**
  - 현재 편집기에서 활성화된 프로그램을 서버의 최신 정보를 기준으로 업데이트 합니다.
  - 주로 i-AUD 디자이너로 저장한 보고서의 정보를 갱신하기 위해 사용합니다.

- **AUD: Save Script**
  - 현재 작성한 프로그램을 서버에 배포합니다.
  - 배포 대상은 Client Script, Server Script, DataSource 이며, 서버의 프로그램을 배포 후 i-AUD 디자이너에서 수정된 내용은 자동으로 동기화 됩니다.

- **AUD: Run Designer**
  - 현재 편집기에서 활성화된 프로그램을 브라우저로 실행합니다.

- **AUD: Upload Report**
  - 현재 편집기에서 활성화된 프로그램을 서버에 배포합니다. (디자인 정보를 포함한 서버의 프로그램 자체를 변경합니다.)
  - GIT을 통해 버전 관리를 하는 경우 버전 별로 배포해서 테스트가 가능합니다.  

- **AUD: Generate Starter Code**
  - 서버 스크립트 또는 클라이언트 스크립트를 TypeScript로 작성하기 위한 기본 구조를 생성해 줍니다.
  - 각 스크립트에서 사용할 수 있는 소스 파일에 대한 참조를 자동 추가하고, 필수 변수등을 자동 선언해 줍니다.

- **AUD: Execute Query**
  - 데이터 소스 편집 화면에서 선택한 영역을 SQL을 실행하여 해당 결과를 console에 출력합니다.
      
- **AUD: Generate Control Variables**
  - Generates scripts that declare all controls within the report.

- **AUD: Convert to JavaScript**
  - 선택한 코드를 JavaScript 배열 문자열 형식으로 변환합니다.
  - SQL을 JavaScript로 변환할 때 유용합니다.

- **AUD: Convert to Text**
  - 선택한 JavaScript 배열 문자열 내용을 일반 텍스트로 다시 변환합니다.
        
---
Follow these steps to set up your development environment and start working on reports.
