Since version 0.33, Excel-DNA uses the standard .NET `System.Diagnostics.Trace` mechanisms for diagnostic logging.
The `LogDisplay` window from earlier versions are now integrated as a custom `TraceListener`.

MSDN has a general introduction to [Tracing and Instrumenting Applications](https://msdn.microsoft.com/en-us/library/zs6s4h68%28v=vs.110%29.aspx). Further links to the `TraceSource` and `TraceListener` classes, and their configuration, can be found there.

The main focus of the diagnostic logging is for two aspects of the Excel-DNA execution:
* Loading add-in details and code from the .dna file.
* Method registration.

## Sample project

The Excel-DNA Samples repository contains a [Logging](https://github.com/Excel-DNA/Samples/tree/master/Logging) sample project that contains the various configurations below, and includes some problematic functions that will trigger logging warnings and errors during registration.

## Configuration
The Excel-DNA diagnostic logging is configured by adding a .config configuration file to the Excel-DNA add-in. If the main add-in is called _myaddin.xll_ then the configuration file should be called _myaddin.xll.config_. This configuration file is set as the ConfigurationFile in the AppDomainSetup for the AppDomain hosting the add-in, and works with the standard `System.Configuration` interfaces.

The ExcelDnaPack packing tool will pack an .xll.config file with correct name into the -packed.xll file, so that a packed .xll can be redistributed as a single-file add-in, including the configuration information. When a packed .xll is loaded, a check is first made to see if a .xll.config file is present, and if present it is used as the configuration file. Otherwise the .xll is checked for a packed .config file, and if found, it is extracted to a temp file and set as the configuration file for the AppDomain hosting the add-in.

#### Consequences of the configuration packing implementation:
* If a .xll.config file is present, it will be used instead of the packed configuration. (This is unlike the .dna file, where the packed .dna file is always used, even if a file with the appropriate name exists.)
* If a path is taken relative to the .config file path, if may use a temporary directory path in the case where a packed configuration is used. One example of this case is the `TextWriterTraceListener` example below, where a relative path is interpreted relative to the .config file, and so won't work as expected with a packed configuration.

## TraceSource

Excel-DNA defines the `ExcelDna.Integration` TraceSource. By default, this TraceSource is configured with as SourceLevel.Warning, so will only source events that are at level Warning, Error or Critical.

To override the default SourceLevel, the configuration would look like this:
```xml
<configuration>
<system.diagnostics>
    <sources>
      <!-- Here we set the least severe SourceLevel that will be logged by the Excel-DNA TraceSource - 
           options are: 'Off', 'Critical', 'Error', 'Warning', 'Information', 'Verbose' and 'All' -
           the default (if no switchValue setting here) is 'Warning'. 
       -->
      <source name="ExcelDna.Integration" switchValue="Information">
        <listeners>
          <!-- ... -->
        </listeners>
      </source>
    </sources>
</system.diagnostics>
</configuration>
```

Setting the SourceLevel for the TraceSource is the easiest way to completely switch off logging. The level must be set to a higher value if additional events should be output to any of the TraceListeners.

## LogDisplayTraceListener

Excel-DNA has a simple dialog used to display error messages during loading, defined in the `ExcelDna.Integration.LogDisplay` class. The LogDisplay is also available to the add-in for error or information message display. Visibility of the LogDisplay form can be controlled with the `LogDisplay.Show()` and `LogDisplay.Hide()` methods.

The LogDisplayTraceListener directs trace events to this LogDisplay form. If the LogDisplayTraceListener encounters an event at the "Error" level, it will automatically show the LogDisplay form. Otherwise the events are just written to the LogDisplay buffer, and the add-in must provide a mechanism to display the form (e.g. with a ribbon button).

By default, a LogDisplayTraceListener is added to the Listeners collection of the "ExcelDna.Integration" TraceSource. This TraceListener is called "LogDisplay" and is configured to write events to the Excel-DNA LogDisplay form.

The configuration file can be used to change the logging level of messages written to the LogDisplay, so that more or fewer events are sent to the LogDisplay. (The configuration cannot be used to completely remove the LogDisplayTraceListener, but it can be switched off.)

This configuration example sets the TraceSource level to "Verbose", removes the DefaultTraceListener (which logs to the attached debugger), and configures the LogDisplayTraceListener to add all messages to the LogDisplay form.

```xml
<configuration>
  <system.diagnostics>
    <sources>
      <source name="ExcelDna.Integration" switchValue="Verbose">
        <listeners>
          <remove name="Default" />
          <add name="LogDisplay" type="ExcelDna.Logging.LogDisplayTraceListener,ExcelDna.Integration">
            <!-- EventTypeFilter takes a SourceLevel as the initializeData: 
                    Off, Critical, Error, Warning (default), Information, Verbose, All -->
            <filter type="System.Diagnostics.EventTypeFilter" initializeData="All"/>
          </add>
        </listeners>
      </source>
    </sources>
  </system.diagnostics>
</configuration>
```

## Configuration Examples

### Default configuration

If there is no .xll.config configuration file for the add-in, or there are no entries related to the `ExcelDna.Integration` TraceSource in the .config file, the following configuration is made:

* The "ExcelDna.Integration" TraceSource is created
* The SourceLevel switch is set to `SourceLevel.Warning`
* The `LogDisplayTraceListener` is added to the source's Listeners collection. Events at Warning level or higher will we written to the LogDisplay. Events at Error level will also cause the LogDisplay window to appear (if it is not currently displayed). 
* The "Default" listener of type [DefaultTraceListener](https://msdn.microsoft.com/en-us/library/system.diagnostics.defaulttracelistener) (that is automatically added to any TraceSource) is not removed. It writes all messages to the debug output.

An explicit configuration file that would have exactly the same configuration as the default (without a configuration file) looks like this:

```xml
<configuration>
  <system.diagnostics>
    <sources>
      <source name="ExcelDna.Integration" switchValue="Warning">
        <listeners>
          <add name="LogDisplay" type="ExcelDna.Logging.LogDisplayTraceListener,ExcelDna.Integration">
            <filter type="System.Diagnostics.EventTypeFilter" initializeData="All"/>
          </add>
        </listeners>
      </source>
    </sources>
  </system.diagnostics>
</configuration>
```

### Disabling all logging

This configuration disables all logging, by switching the logging level of the "ExcelDna.Integration" TraceSource to Off:

```xml
<configuration>
 <system.diagnostics>
    <sources>
      <source name="ExcelDna.Integration" switchValue="Off">
      </source>
    </sources>
  </system.diagnostics>
</configuration>
```
### Enable Verbose logging

Similarly, the logging level can be increased to log all events:

```xml
<configuration>
<system.diagnostics>
    <sources>
      <source name="ExcelDna.Integration" switchValue="All">
      </source>
    </sources>
  </system.diagnostics>
</configuration>
```

### Adding a trace file

This configuration creates a trace listener that writes all events to a file.
In addition, it removes the "Default" trace listener and sets the "LogDisplay" level to Off so that no messages are written to the LogDisplay form.

```xml
<configuration>
  <system.diagnostics>
    <trace autoflush="false" indentsize="4"/>
    <sources>
      <source name="ExcelDna.Integration" switchValue="All">
        <listeners>
          <remove name="Default"/>
          <add name="LogDisplay" type="ExcelDna.Logging.LogDisplayTraceListener,ExcelDna.Integration">
            <filter type="System.Diagnostics.EventTypeFilter" initializeData="Off"/>
          </add>
          <add name="File" 
               type="System.Diagnostics.TextWriterTraceListener" 
               initializeData="ExcelDnaAddIn.log" />
        </listeners>
      </source>
    </sources>
  </system.diagnostics>
</configuration>
```

The initializeData attribute of the TextWriteTraceListener can take an absolute path, or a path that is interpreted relative to the location of the .xll.config file. For configuration file packed into the .xll with the ExcelDnaPack utility, this would be some temporary directory, so relative paths should not be used with care in configurations for packed add-ins.

### Redirecting to NLog

The [NLog](http://nlog-project.org) logging framework contains a trace listener class that allows trace events to be directed to an NLog logging target. An example of the configuration for such redirection would be:

```xml
<configuration>
<configSections>
    <section name="nlog" type="NLog.Config.ConfigSectionHandler, NLog"/>
  </configSections>
  <system.diagnostics>
    <sources>
      <source name="ExcelDna.Integration" switchValue="Verbose">
        <listeners>
          <remove name="Default" />
          <add name="LogDisplay" type="ExcelDna.Logging.LogDisplayTraceListener,ExcelDna.Integration">
            <filter type="System.Diagnostics.EventTypeFilter" initializeData="Off"/>
          </add>
          <add name="NLogListener" type="NLog.NLogTraceListener,NLog" >
            <filter type="System.Diagnostics.EventTypeFilter" initializeData="All"/>
          </add>
        </listeners>
      </source>
    </sources>
  </system.diagnostics>
  <nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <targets>
      <target name="debugger" xsi:type="Debugger" layout="NLOG: ${longdate}|${level:uppercase=true}|${logger}[${event-properties:EventID}]|${message}"/>
    </targets>
    <rules>
      <logger name="*" minlevel="Warn" writeTo="debugger" />
    </rules>
  </nlog>
</configuration>
```

### Redirecting to log4net

To use the [log4net](https://logging.apache.org/log4net/) library as a trace listener requires a helper class to redirects the event messages.
An implementation of such a redirecting trace listener is the [`Log4NetTraceListener`](https://github.com/Excel-DNA/Samples/blob/master/Logging/Log4NetTraceListener.cs) in the Excel-DNA logging sample.

A configuration for using the `Log4NetTraceListener` would be:

```xml
<configuration>
 <configSections>
    <section name="log4net" type="log4net.Config.Log4NetConfigurationSectionHandler, log4net" />
  </configSections>
  <system.diagnostics>
    <sources>
      <source name="ExcelDna.Integration" switchValue="Verbose">
        <listeners>
          <remove name="Default" />
          <add name="LogDisplay" type="ExcelDna.Logging.LogDisplayTraceListener,ExcelDna.Integration">
            <filter type="System.Diagnostics.EventTypeFilter" initializeData="Off"/>
          </add>
          <add name="Log4NetListener" type="Cavity.Diagnostics.Log4NetTraceListener,Logging" >
            <filter type="System.Diagnostics.EventTypeFilter" initializeData="All"/>
          </add>
        </listeners>
      </source>
    </sources>
  </system.diagnostics>
  <log4net>
    <appender name="DebugAppender" type="log4net.Appender.DebugAppender" >
      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="LOG4NET: %date [%thread] %-5level %logger [%ndc] - %message%newline" />
      </layout>
    </appender>
    <root>
      <level value="INFO" />
      <appender-ref ref="DebugAppender" />
    </root>
  </log4net>
</configuration>
```

## Adding logging from inside the add-in

```c#
public void AutoOpen()
{
    // Log warnings and errors to the Excel-DNA LogDisplay
    Trace.Listeners.Add(new LogDisplayTraceListener());
}

...
Trace.TraceInformation("Trace information!");
Trace.TraceWarning("Trace warning!");
Trace.TraceError("Trace error!");
...
```

## .NET 6 Note
This issue suggests there might have to be additional configuration for the logging to work under .NET 6: https://github.com/dotnet/runtime/issues/23937

More here: https://learn.microsoft.com/en-us/dotnet/architecture/modernize-desktop/migrate-modern-applications#migrating-configuration-files

```
<configSections>
    <section name="system.diagnostics"
             type="System.Diagnostics.SystemDiagnosticsSection,
                   System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089"/>
</configSections>
```