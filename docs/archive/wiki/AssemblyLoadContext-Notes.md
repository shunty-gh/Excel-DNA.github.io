https://docs.microsoft.com/en-us/dotnet/core/dependency-loading/loading-managed

Problem methods:
* Assembly.Load*
* Type.GetType(String,...)
* Assembly.GetType
* Activator.GetInstance(String,...)

Monitor with `AppDomain.AssemblyLoad` or diagnostics: https://docs.microsoft.com/en-us/dotnet/core/dependency-loading/collect-details

Support deps.json ?