@echo off
setlocal EnableExtensions

cd /d "%~dp0"
title ChillTax Manual Deployment

echo.
echo ========================================
echo   ChillTax - Manual GitHub Pages Deploy
echo ========================================
echo.

where pnpm >nul 2>&1
if errorlevel 1 (
  echo [ERROR] pnpm was not found in PATH.
  goto :failed
)

set "GH_CMD="
for /f "delims=" %%G in ('where.exe gh 2^>nul') do if not defined GH_CMD set "GH_CMD=%%G"
if not defined GH_CMD if exist "%ProgramFiles%\GitHub CLI\gh.exe" set "GH_CMD=%ProgramFiles%\GitHub CLI\gh.exe"
if not defined GH_CMD if exist "%LocalAppData%\Programs\GitHub CLI\gh.exe" set "GH_CMD=%LocalAppData%\Programs\GitHub CLI\gh.exe"
if defined GH_CMD goto :gh_ready

echo [SETUP] GitHub CLI is required but was not found.
where winget >nul 2>&1
if errorlevel 1 (
  echo [ERROR] winget is unavailable. Install GitHub CLI from:
  echo https://cli.github.com/
  goto :failed
)

choice /C YN /N /M "Install GitHub CLI with winget now? [Y/N]: "
if errorlevel 2 goto :setup_cancelled

echo.
echo Installing GitHub CLI...
winget install --id GitHub.cli --exact --source winget --accept-source-agreements --accept-package-agreements
if errorlevel 1 goto :failed

set "GH_CMD="
for /f "delims=" %%G in ('where.exe gh 2^>nul') do if not defined GH_CMD set "GH_CMD=%%G"
if not defined GH_CMD if exist "%ProgramFiles%\GitHub CLI\gh.exe" set "GH_CMD=%ProgramFiles%\GitHub CLI\gh.exe"
if not defined GH_CMD if exist "%LocalAppData%\Programs\GitHub CLI\gh.exe" set "GH_CMD=%LocalAppData%\Programs\GitHub CLI\gh.exe"
if not defined GH_CMD (
  echo [ERROR] GitHub CLI was installed but gh.exe could not be located.
  echo Close this window, reopen it, and run deploy.bat again.
  goto :failed
)

:gh_ready
"%GH_CMD%" auth status >nul 2>&1
if errorlevel 1 (
  echo [SETUP] Sign in to GitHub in the browser window that opens.
  "%GH_CMD%" auth login --hostname github.com --git-protocol https --web
  if errorlevel 1 goto :failed
)

for /f "delims=" %%B in ('git branch --show-current') do set "CURRENT_BRANCH=%%B"
if /I not "%CURRENT_BRANCH%"=="master" (
  echo [ERROR] Current branch is "%CURRENT_BRANCH%". Switch to "master" first.
  goto :failed
)

for /f "delims=" %%S in ('git status --porcelain') do (
  echo [ERROR] The working tree has uncommitted changes.
  echo Commit or stash them before deploying.
  goto :failed
)

echo [1/6] Syncing remote status...
git fetch --quiet origin master
if errorlevel 1 goto :failed

for /f %%A in ('git rev-list --count origin/master..HEAD') do set "AHEAD_COUNT=%%A"
for /f %%B in ('git rev-list --count HEAD..origin/master') do set "BEHIND_COUNT=%%B"

if not "%AHEAD_COUNT%"=="0" (
  echo Local master has %AHEAD_COUNT% unpushed commits.
  choice /C YN /N /M "Push these commits to origin/master now? [Y/N]: "
  if errorlevel 2 goto :cancelled
  git push origin master
  if errorlevel 1 goto :failed
)

if not "%BEHIND_COUNT%"=="0" (
  echo [ERROR] Local master is behind origin/master by %BEHIND_COUNT% commits.
  echo Pull the latest changes before deploying.
  goto :failed
)

echo [2/6] Installing locked dependencies...
call pnpm install --frozen-lockfile
if errorlevel 1 goto :failed

echo [3/6] Running Astro diagnostics...
call pnpm run check
if errorlevel 1 goto :failed

echo [4/6] Building the production site locally...
call pnpm run build
if errorlevel 1 goto :failed

for /f "delims=" %%C in ('git rev-parse --short HEAD') do set "COMMIT_SHA=%%C"
echo.
echo Local validation passed for commit %COMMIT_SHA%.
choice /C YN /N /M "Trigger GitHub Pages deployment now? [Y/N]: "
if errorlevel 2 goto :cancelled

echo.
echo [5/6] Ensuring GitHub Pages uses GitHub Actions...
"%GH_CMD%" api repos/Sanhanat-cyk/Sanhanat-cyk.github.io/pages >nul 2>&1
if errorlevel 1 (
  "%GH_CMD%" api --method POST repos/Sanhanat-cyk/Sanhanat-cyk.github.io/pages -f build_type=workflow >nul
  if errorlevel 1 (
    echo [ERROR] GitHub Pages could not be enabled for this repository.
    echo The repository is private and the current GitHub plan does not support private Pages.
    echo Make the repository public or upgrade the GitHub plan, then run this script again.
    goto :failed
  )
) else (
  "%GH_CMD%" api --method PUT repos/Sanhanat-cyk/Sanhanat-cyk.github.io/pages -f build_type=workflow >nul
  if errorlevel 1 (
    echo [ERROR] GitHub Pages could not be configured to use GitHub Actions.
    goto :failed
  )
)

echo [6/6] Triggering the GitHub Actions workflow...
"%GH_CMD%" workflow run deploy.yml --ref master
if errorlevel 1 goto :failed

echo.
echo [SUCCESS] Deployment was queued for commit %COMMIT_SHA%.
echo Track it at: https://github.com/Sanhanat-cyk/Sanhanat-cyk.github.io/actions
echo.
pause
exit /b 0

:cancelled
echo.
echo Deployment cancelled. No GitHub Actions minutes were used.
exit /b 0

:setup_cancelled
echo.
echo GitHub CLI installation cancelled. Deployment was not triggered.
pause
exit /b 0

:failed
echo.
echo [FAILED] Deployment was not triggered.
pause
exit /b 1
