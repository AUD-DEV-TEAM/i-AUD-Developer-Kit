# i-AUD Developer Kit

## 1. i-AUD 개발 환경 설정

### 1.1 작업 디렉토리에서 vs-code를 실행 합니다.
```sh
cd D:\aud_report
code .
```
### 1.2 개발 소스 다운로드 - GitHub에서 개발 환경에 필요한 seed project를 다운로드 합니다.
- GIT-URL : https://github.com/AUD-DEV-TEAM/i-AUD-Developer-Kit 
- 터미널에서 아래 명령어를 실행 하여, 프로젝트 빌드에 필요한 외부 라이브러리를 설치합니다.
```sh
npm -install
```
### 1.3 개발 서버에 연결을 위한 정보를 셋팅 합니다.
  - vs-code 작업디렉토리 하위에 `.vscode/settings.json` 파일을 추가하고 아래와 같이 설정 합니다.

```json
{
    "aud.config": {
        "SourcePath": "D:\\aud_report\\src\\reports\\", // 소스 디렉토리 (seed project의 reports 경로)
        "OutputPath": "D:\\aud_report\\out\\reports\\", // 출력 디렉토리 (seed project의 reports 경로를 기준으로 src가 아닌 out 디렉토리로 설정)
        "ServiceURL": "http://aaa.com:8080",  // AUD Platform 서버 주소 
        "UserName": "{your account name}",  // AUD Platform 서버의 계정이름
        "ApiKey": "{your api key}",  // API Key
                                    // <인증키 생성 방법> 
                                    //  1. AUD Platform Admin의 시스템 옵션에서 개인 인증키 활성화 정보를 등록 합니다.
                                    //      USE_PRIVATE_AUTH_KEY=Y
                                    //  2. 인증 키 관리 메뉴에서 "개인용 Access Token 발급"에서 "Access Token 생성"을 통해 발급받습니다.
        "AutoBuild": false,      // 스크립트 저장에서 tsc 빌드를 자동으로 실행할지 여부 (`tsc --w` 명령어를 통해 수정된 파일이 실시간으로 빌드하는 방법을 추천합니다.)
        "MX_GRID_BACKUP": true, //MX-GRID 디자인 정보를 다운로드 할지 여부를 설정합니다.
        "MX_GRID_JSON_PRETTY": true  //i-AUD 보고서 파일 (json 구조)을 자동 formatting할 지 여부를 설정합니다.
    }
}
```

## 2. 보고서 개발 절차

### 2.1. i-AUD Designer에서 새로운 보고서를 저장 합니다.
- i-AUD Designer에서 필요한 컴포넌트를 배치 및 디자인을 합니다.


### 2.2. vs-code에서 생성된 보고서를 다운로드 합니다.
- `AUD:Download Report` 명령어를 실행하여 저장된 보고서를 다운로드 합니다.
- 다운로드된 폴더를 작업하고자 하는 위치로 이동합니다.

### 2.3. TypeScript 개발 준비
- TypeScript로 개발하기 위해서 {폴더명}.script.js 파일의 확장자를 .ts 로 변경합니다.
   (Client Script는 {폴더명}.script.ts 파일을 우선으로 탐색합니다. js로 개발하실 경우 {폴더명}.script.js 파일을 유지하셔도 됩니다.)
- `AUD: Generate starter code`를 실행하여 TypeScript 빌드에 필요한 모듈을 import 합니다.
```ts
import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { CheckBox } from "@AUD_CLIENT/control/CheckBox";
import { Label } from "@AUD_CLIENT/control/Label";
import { iGrid } from "@AUD_CLIENT/control/iGrid";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Image } from "@AUD_CLIENT/control/Image";
import { ColorPicker } from "@AUD_CLIENT/control/ColorPicker";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { RadioButton } from "@AUD_CLIENT/control/RadioButton";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Group } from "@AUD_CLIENT/control/Group";
import { Chart } from "@AUD_CLIENT/control/Chart";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";
import { Control } from "@AUD_CLIENT/control/Control";
import { event } from "jquery";
let Matrix : Matrix; 
```
 
### 2.4. 소스 변경 시 자동으로 TypeScript 빌드를 하도록 자동 감시모드(watch mode)를 실행합니다.

- 터미널에서 아래 명령어를 실행하여 TypeScript watch mode로 설정해 줍니다.
```sh
tsc --w
```

### 2.5. 소스 수정 반영 테스트
- command palette(`Ctrl + Shift + P`로 실행)에서 `AUD: Save Script`를 실행하여 현재 변경된 내용을 저장 합니다.
- `AUD: Run Designer`를 실행하여 chrome를 통해 실행된 프로그램을 테스트 합니다.

## 3. i-AUD Developer Kit - Command Palette

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
        
