# i-AUD Developer Kit

## 1. Setting Up the Report Development Environment

### 1.1 Open VS Code in the Working Directory
```sh
cd D:\aud_report
code .
```
### 1.2 Download seed project
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

- **AUD: Import Report**
  - Downloads report information from the server to your local PC.

- **AUD: Save Script**
  - Saves the report, including scripts, to the development server.
  - (Only script modifications are updated.)

- **AUD: Run Designer**
  - Opens the report in the i-AUD Designer in a web browser.

- **AUD: Upload Report**
  - Used for version control with GIT or deploying the report to another server.
  - Uploads and saves the current report.

- **AUD: Generate Starter Code**
  - Generates example source code for ServerScript and Client Script.

- **AUD: Convert to JavaScript**
  - Converts the selected code into JavaScript array string format.
  - Useful for converting SQL to JavaScript.

- **AUD: Convert to Text**
  - Converts selected JavaScript array string content back to plain text.

- **AUD: Generate Control Variables**
  - Generates scripts that declare all controls within the report.
        
---
Follow these steps to set up your development environment and start working on reports.
