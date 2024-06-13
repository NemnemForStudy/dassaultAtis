rem cd..
rem set MX_JAVA_DEBUG_PORT=11113
%ENOVIA_SERVER_PATH%\mql -c "set context user admin_platform pass Qwer1234;execute program decDailyLoginStatus -method mxMain"
