@echo off
setlocal enabledelayedexpansion

REM bat file dir
set "batch_folder=%~dp0"

REM date
for /f "tokens=1-3 delims=/ " %%a in ('echo %date%') do (
    set "year=%%c"
    set "month=%%a"
    set "day=%%b"
)


REM yyyymmdd
if %month% LSS 10 set month=%month%
if %day% LSS 10 set day=0%day%

REM set folder name
set "folder_name=%year%%month%%day%"

REM directory
cd ..

REM create folder
mkdir %folder_name%

REM 
cd %folder_name%

REM create file
echo > "00. dimension.mql"
echo > "01. attribute.mql"
echo > "02. type.mql"
echo > "03. role.mql"
echo > "04. policy.mql"
echo > "05. relationship.mql"
echo > "06. command.mql"
echo > "07. menu.mql"
echo > "08. channel.mql"
echo > "09. portal.mql"
echo > "10. table.mql"
echo > "11. form.mql"
echo > "12. page.mql"
echo > "13. searchindex.mql"
echo > "14. trigger.mql"
echo > "15. bus.mql"
echo > "16. generator.mql"
echo > "17. tcl.mql"
echo > "18. interface.mql"
echo > "19. expression.mql"
echo > "20. rule.mql"
echo > "99. reloadMQL.mql"

endlocal