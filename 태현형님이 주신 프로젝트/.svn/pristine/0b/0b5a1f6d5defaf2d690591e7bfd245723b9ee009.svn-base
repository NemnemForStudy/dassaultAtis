rem defined by user env
set BatchProjectPath=D:\DAE_WorkSpace\daewooenc.cbat2
set fileServerPath=\\10.10.10.100\daewooenc
set fileServerDrive=Z:
set DeployZipPath=\07.1 Deploy History

set dirStructure=WEB-INF\classes\com\dwenc\daemon\batch
rem set DeployZipPath=C:\temp


rem ----- DO NOT EDIT BELOW -----

rem 오늘 날짜
for /F "skip=1 delims=" %%F in ('
    wmic PATH Win32_LocalTime GET Day^,Month^,Year /FORMAT:TABLE
') do (
    for /F "tokens=1-3" %%L in ("%%F") do (
        set CurrDay=0%%L
        set CurrMonth=0%%M
        set CurrYear=%%N
    )
)
set CurrDay=%CurrDay:~-2%
set CurrMonth=%CurrMonth:~-2%

rem 폴더명 조합
set rootFolderName=%CurrYear%%CurrMonth%%CurrDay%

rem 오늘 날짜로 배포 폴더 만들기
mkdir %rootFolderName%\%dirStructure%

rem 해당 폴더 이동
%fileServerDrive%

set InputDirPath=%BatchProjectPath%\src\main\java\batch
set OutputDirPath=%BatchProjectPath%\target\classes

set ZipTargetPath=com\dwenc\daemon\batch\ep
set BuildInfoPropertiesFilePath=%ZipTargetPath%\epc\epc01\resources\buildInfo.properties

set BuildDate=%date% %time%

rem input Build date into source code
echo BuildDate=%BuildDate% > "%InputDirPath%\%BuildInfoPropertiesFilePath%"

rem input Build date into class file
echo BuildDate=%BuildDate% > "%OutputDirPath%\%BuildInfoPropertiesFilePath%"

rem zip to deploy


set DeployZipName=ep_%CurrYear%%CurrMonth%%CurrDay%_001.zip

echo zipTargetPath : "%OutputDirPath%\%ZipTargetPath%\"
echo zipPath : "%DeployZipPath%\%DeployZipName%"

bandizip.exe c "%DeployZipPath%\%DeployZipName%" "%OutputDirPath%\%ZipTargetPath%" 

rem pause