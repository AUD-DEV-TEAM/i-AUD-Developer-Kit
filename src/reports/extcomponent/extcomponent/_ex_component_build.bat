@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion

echo ============================================================
echo   External Component Build ^& Deploy
echo ============================================================
echo.

:: ── 경로 설정 ──
set "REPO_ROOT=%~dp0..\..\..\.."
pushd "%REPO_ROOT%"
set "REPO_ROOT=%CD%"
popd

set "SRC_DIR=%~dp0"
:: 끝의 백슬래시 제거
if "%SRC_DIR:~-1%"=="\" set "SRC_DIR=%SRC_DIR:~0,-1%"
set "OUT_DIR=%REPO_ROOT%\out\src\reports\extcomponent\extcomponent"
set "TARGET_DIR=%REPO_ROOT%\src\reports\extcomponent\deploy"

echo [INFO] REPO_ROOT  = %REPO_ROOT%
echo [INFO] SRC_DIR    = %SRC_DIR%
echo [INFO] OUT_DIR    = %OUT_DIR%
echo [INFO] TARGET_DIR = %TARGET_DIR%
echo.

:: ── 1. TypeScript 빌드 ──
echo [STEP 1/5] TypeScript Build...
pushd "%REPO_ROOT%"
call npx tsc --project tsconfig.json
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] TypeScript build failed!
    popd
    goto :error
)
popd
echo   Build OK
echo.

:: ── 2. export {} 제거 (서브폴더 순회) ──
echo [STEP 2/5] Strip "export {}" from built JS...
for /D %%d in ("%OUT_DIR%\*Component") do (
    node "%SRC_DIR%\_strip_export.js" "%%d"
)
echo.

:: ── 3. _catalog.json 생성 (서브폴더에서 .manifest 검색) ──
echo [STEP 3/5] Generate _catalog.json from .manifest files...
node "%SRC_DIR%\_generate_catalog.js" "%SRC_DIR%" "%SRC_DIR%\_catalog.json"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] _catalog.json generation failed!
    goto :error
)
echo.

:: ── 4. 대상 폴더 확인 ──
if not exist "%TARGET_DIR%" (
    echo [INFO] Creating target directory...
    mkdir "%TARGET_DIR%"
)

:: ── 5. 파일 복사 (서브폴더 순회) ──
echo [STEP 4/5] Copy files to target...

set JS_COUNT=0
set CSS_COUNT=0
set MF_COUNT=0
set LIB_COUNT=0

for /D %%d in ("%SRC_DIR%\*Component") do (
    set "COMP_NAME=%%~nxd"

    :: 빌드된 .js 복사 (out/서브폴더 → target)
    if exist "%OUT_DIR%\!COMP_NAME!" (
        for %%f in ("%OUT_DIR%\!COMP_NAME!\*.js") do (
            copy /Y "%%f" "%TARGET_DIR%\" >nul
            set /a JS_COUNT+=1
        )
    )

    :: .css 복사 (src/서브폴더 → target)
    for %%f in ("%%d\*.css") do (
        copy /Y "%%f" "%TARGET_DIR%\" >nul
        set /a CSS_COUNT+=1
    )

    :: .manifest 복사
    for %%f in ("%%d\*.manifest") do (
        copy /Y "%%f" "%TARGET_DIR%\" >nul
        set /a MF_COUNT+=1
    )

)

:: 5-4. lib/ 폴더 복사 (루트 → target)
if exist "%SRC_DIR%\lib" (
    if not exist "%TARGET_DIR%\lib" mkdir "%TARGET_DIR%\lib"
    for %%f in ("%SRC_DIR%\lib\*.*") do (
        copy /Y "%%f" "%TARGET_DIR%\lib\" >nul
        set /a LIB_COUNT+=1
    )
)

echo   JS files copied: %JS_COUNT%
echo   CSS files copied: %CSS_COUNT%
echo   Manifest files copied: %MF_COUNT%
echo   Lib files copied: %LIB_COUNT%

:: _catalog.json 복사
copy /Y "%SRC_DIR%\_catalog.json" "%TARGET_DIR%\" >nul
echo   _catalog.json copied
echo.

echo [STEP 5/5] Done!
echo.
echo ============================================================
echo   Build Complete
echo   Target: %TARGET_DIR%
echo ============================================================

goto :end

:error
echo.
echo ============================================================
echo   BUILD FAILED
echo ============================================================
exit /b 1

:end
endlocal
