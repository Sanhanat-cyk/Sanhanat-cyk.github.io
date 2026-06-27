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

where gh >nul 2>&1
if errorlevel 1 (
  echo [ERROR] GitHub CLI was not found in PATH.
  echo Install it from https://cli.github.com/ and run: gh auth login
  goto :failed
)

gh auth status >nul 2>&1
if errorlevel 1 (
  echo [ERROR] GitHub CLI is not authenticated.
  echo Run: gh auth login
  goto :failed
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

echo [1/5] Syncing remote status...
git fetch --quiet origin master
if errorlevel 1 goto :failed

for /f %%A in ('git rev-list --count origin/master..HEAD') do set "AHEAD_COUNT=%%A"
for /f %%B in ('git rev-list --count HEAD..origin/master') do set "BEHIND_COUNT=%%B"

if not "%AHEAD_COUNT%"=="0" (
  echo [ERROR] Local master has %AHEAD_COUNT% unpushed commit(s).
  echo Run: git push origin master
  goto :failed
)

if not "%BEHIND_COUNT%"=="0" (
  echo [ERROR] Local master is behind origin/master by %BEHIND_COUNT% commit(s).
  echo Pull the latest changes before deploying.
  goto :failed
)

echo [2/5] Installing locked dependencies...
call pnpm install --frozen-lockfile
if errorlevel 1 goto :failed

echo [3/5] Running Astro diagnostics...
call pnpm run check
if errorlevel 1 goto :failed

echo [4/5] Building the production site locally...
call pnpm run build
if errorlevel 1 goto :failed

for /f "delims=" %%C in ('git rev-parse --short HEAD') do set "COMMIT_SHA=%%C"
echo.
echo Local validation passed for commit %COMMIT_SHA%.
choice /C YN /N /M "Trigger GitHub Pages deployment now? [Y/N]: "
if errorlevel 2 goto :cancelled

echo.
echo [5/5] Triggering the GitHub Actions workflow...
gh workflow run deploy.yml --ref master
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

:failed
echo.
echo [FAILED] Deployment was not triggered.
pause
exit /b 1
