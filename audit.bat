@echo off
setlocal EnableExtensions

cd /d "%~dp0"
title ChillTax - Lighthouse Audit

echo.
echo ========================================
echo   ChillTax - Lighthouse Quality Audit
echo ========================================
echo.

:: ─── Check prerequisites ───────────────────────────────────────────
where pnpm >nul 2>&1
if errorlevel 1 (
  echo [ERROR] pnpm was not found in PATH.
  goto :failed
)

:: ─── Detect Edge (Chromium) ────────────────────────────────────────
call :findEdge
if not defined CHROME_PATH (
  echo [ERROR] Microsoft Edge was not found.
  echo         Lighthouse requires a Chromium browser.
  goto :failed
)
echo [OK] Edge found.

:: ─── STOP DEV SERVER if running ────────────────────────────────────
:: Kill anything on 4321 to prevent Lighthouse from hitting dev mode
call :killPort 4321
echo [OK] Dev server stopped (port 4321 cleared).

:: ─── Build the site ────────────────────────────────────────────────
echo.
echo [1/5] Building production site...
call pnpm run build
if errorlevel 1 goto :failed
echo      Build OK.

:: ─── Kill any existing servers on 8080/8081 ────────────────────────
call :killPort 8080
call :killPort 8081

:: ─── Start static server for production build ──────────────────────
echo.
echo [2/5] Starting servers...

start "" /B cmd /c "npx --yes serve@14 dist -l 8080 -s --no-clipboard >nul 2>&1"
echo      Production build on :8080

:: ─── Start static server for docs reference ────────────────────────
:: NOTE: no -s flag here, otherwise serve strips .html and 404s the reference
start "" /B cmd /c "npx --yes serve@14 docs -l 8081 --no-clipboard >nul 2>&1"
echo      Docs reference on :8081

:: Wait for servers (ping is used as a sleep that does not need console input)
ping -n 5 127.0.0.1 >nul
call :waitPort 8080
call :waitPort 8081

:: ─── Clear old reports ─────────────────────────────────────────────
if exist "lighthouse" rmdir /s /q "lighthouse" >nul 2>&1
mkdir lighthouse
echo [OK] Old reports cleared.

:: ─── Run Lighthouse audits ─────────────────────────────────────────
echo.
echo [3/5] Auditing production build (port 8080)...
echo.
call :audit "http://localhost:8080/" "home-th"
call :audit "http://localhost:8080/en/" "home-en"

echo.
echo [4/5] Auditing docs reference (port 8081)...
echo.
call :audit "http://localhost:8081/ChillTax-Landing.html" "docs-reference"

:: ─── Stop servers ──────────────────────────────────────────────────
echo.
echo [5/5] Stopping servers...
call :killPort 8080
call :killPort 8081

:: ─── Done ──────────────────────────────────────────────────────────
echo.
echo ========================================
echo   Audit complete!
echo   Reports saved to: lighthouse\
echo.
echo   Production:  home-th.report.html, home-en.report.html
echo   Reference:   docs-reference.report.html
echo ========================================
echo.

if exist "lighthouse\home-th.report.html" start "" "lighthouse\home-th.report.html"

pause
exit /b 0

:: ════════════════════════════════════════════════════════════════════
:: SUBROUTINES
:: ════════════════════════════════════════════════════════════════════

:findEdge
set "CHROME_PATH="
set "_edge=Microsoft\Edge\Application\msedge.exe"
if exist "%LocalAppData%\%_edge%" (
  set "CHROME_PATH=%LocalAppData%\%_edge%"
  exit /b 0
)
if exist "%ProgramFiles%\%_edge%" (
  set "CHROME_PATH=%ProgramFiles%\%_edge%"
  exit /b 0
)
for /f "tokens=2*" %%A in ('reg query "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion" /v "ProgramFilesDir (x86)" 2^>nul') do (
  if exist "%%B\%_edge%" (
    set "CHROME_PATH=%%B\%_edge%"
    exit /b 0
  )
)
if exist "C:\Program Files (x86)\%_edge%" (
  set "CHROME_PATH=C:\Program Files (x86)\%_edge%"
  exit /b 0
)
exit /b 0

:audit
echo   Auditing: %~1
call npx --yes lighthouse@13 "%~1" --chrome-flags="--headless --no-sandbox --disable-gpu" --output=html --output=json --output-path="./lighthouse/%~2" --quiet
if not exist "lighthouse\%~2.report.html" (
  echo   [FAIL] No report generated for %~2
) else (
  echo   [OK] lighthouse\%~2.report.html
)
exit /b 0

:killPort
for /f "tokens=5" %%P in ('netstat -aon ^| findstr ":%~1.*LISTENING" 2^>nul') do (
  taskkill /PID %%P /F >nul 2>&1
)
exit /b 0

:waitPort
powershell -NoProfile -Command "for($i=0;$i -lt 10;$i++){try{$null=Invoke-WebRequest -Uri http://localhost:%~1 -UseBasicParsing -TimeoutSec 2;exit 0}catch{Start-Sleep 1}};exit 1" >nul 2>&1
if errorlevel 1 (
  echo   [WARN] Port %~1 may not be ready
)
exit /b 0

:failed
echo.
echo [FAILED] Audit was not completed.
pause
exit /b 1
