# Excel-DNA Logging Configuration Guide

This guide provides a comprehensive overview of configuring the logging system in Excel-DNA, suitable for both .NET Framework 4.x and .NET 6+ environments.

## Configuration Differences: .NET Framework vs .NET 6+

- For add-ins targeting **.NET Framework 4.x**, traditional `.config` file logging configuration is supported in addition to the methods described below.
- For add-ins targeting **.NET 6+**, `.config` file support is no longer available. Configuration must be done through environment variables or the Windows Registry as outlined in this guide.

The following information applies to both environments, with the additional `.config` file option available for .NET Framework 4.x.

## Understanding SourceLevels and TraceEventTypes

### SourceLevels Enumeration

\`SourceLevels\` set the global threshold for capturing log messages. The levels include:

1. **Off**: Disables logging.
2. **Critical**: Captures only critical failures.
3. **Error**: Captures error events and more severe.
4. **Warning**: Captures warnings and more severe events.
5. **Information**: Captures informational messages and more severe.
6. **Verbose**: Captures all messages, including detailed and verbose.
7. **All**: Logs all types of events.

### TraceEventTypes Enumeration

\`TraceEventTypes\` specify the type of event being logged, used for configuring individual \`TraceListeners\`. They include:

1. **Critical**: For critical events.
2. **Error**: For error events.
3. **Warning**: For warnings.
4. **Information**: For informational messages.
5. **Verbose**: For detailed and verbose messages.
6. **Start, Stop, Suspend, Resume, Transfer**: Specialized types for advanced scenarios.

## Configuration Settings

### Environment Variable Configuration

Configure persistent logging settings with these environment variables:

- **Global Source Level**: \`EXCELDNA_DIAGNOSTICS_SOURCE_LEVEL\`
- **Log Display Level**: \`EXCELDNA_DIAGNOSTICS_LOGDISPLAY_LEVEL\`
- **Debugger Level**: \`EXCELDNA_DIAGNOSTICS_DEBUGGER_LEVEL\`
- **File Level**: \`EXCELDNA_DIAGNOSTICS_FILE_LEVEL\`
- **File Name**: \`EXCELDNA_DIAGNOSTICS_FILE_NAME\`

### Registry Configuration

Alternatively, use the Windows Registry at:

- \`HKEY_CURRENT_USER\Software\ExcelDna\Diagnostics\`
- \`HKEY_LOCAL_MACHINE\Software\ExcelDna\Diagnostics\`

## Example Configurations

### Environment Variable Script

\`\`\`batch
@echo off
REM Set Excel-DNA Logging Environment Variables Persistently

setx EXCELDNA_DIAGNOSTICS_SOURCE_LEVEL "Warning"
setx EXCELDNA_DIAGNOSTICS_LOGDISPLAY_LEVEL "Warning"
setx EXCELDNA_DIAGNOSTICS_DEBUGGER_LEVEL "Error"
setx EXCELDNA_DIAGNOSTICS_FILE_LEVEL "Verbose"
setx EXCELDNA_DIAGNOSTICS_FILE_NAME "ExcelDnaLog.txt"

echo Excel-DNA Logging Environment Variables are set.
pause
\`\`\`

### Registry Script

\`\`\`reg
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\ExcelDna\Diagnostics]
"SourceLevel"="Warning"
"LogDisplayLevel"="Warning"
"DebuggerLevel"="Error"
"FileLevel"="Verbose"
"FileName"="ExcelDnaLog.txt"
\`\`\`

## Conclusion

Effective logging configuration in Excel-DNA is crucial for debugging and monitoring, especially when transitioning to .NET 6+ environments.
