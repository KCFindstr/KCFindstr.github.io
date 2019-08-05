@echo off & setlocal enabledelayedexpansion
set a=1

for /f "tokens=*" %%a in ('dir /b') do (
	if /i "%%~xa" neq ".cmd" (
		ren "%%a" "!a!%%~xa"
		set /a a+=1
	)
)
echo DONE
pause