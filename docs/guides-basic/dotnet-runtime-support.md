---
title: ".NET runtime support"
---

Excel-DNA continues to support .NET Framework 4.x. For the core add-in libraries the minimum version is v4.5.2, but I recommend targeting v4.7.2 (net472) or v4.8 (net48) for the best compatiiblity with libraries and Windows releases.
```
<TargetFramework>net472</TargetFramework>
```

Targeting .NET core runtimes, .NET 6 (v6.0.2+) to .NET 8 are supported. This requires the ".NET Desktop Runtime" to be installed, with the platform (x64 or x86) matching the Excel installation (64-bit or 32-bit respectively).
```
<TargetFramework>net8.0-windows</TargetFramework>
```

Only a single .NET core runtime can be loaded into an Excel process (this one .NET core runtime can be loaded together with the .NET Framework 4.x runtime). For an add-in developer, this means the choice of runtime can impact, and be impacted, by other add-ins targeting .NET core versions.
  
For .NET core we support the **RollForward** property, allowing the add-in developer to specify how the add-in loads the runtime or behaves if a .NET core runtime is already loaded into the process. The following [RollForward settings](https://learn.microsoft.com/en-us/dotnet/core/project-sdk/msbuild-props#rollforward) (with .NET core target versions) give useful options.

* The default value (if the RollForward property is not specified) is `Minor`, (which is equivalent to `LatestPatch` since the .NET core runtime no longer publishes 'minor' version updates).
```
<TargetFramework>net6.0-windows</TargetFramework>
<RollForward>Minor</RollForward>
```
This means the add-in will only run under .NET 6.
  * If no .NET runtime is loaded yet, the add-in will attempt to load .NET 6.
  * If .NET 6 is not installed, the add-in will fail to load.
  * If a newer version of the runtime is already loaded into the Excel process, this add-in will fail to load. 
 
* To allow forward-compatibility, the add-in can be built target .NET 6.0 and set `RollForward' to `Major`.
```
<TargetFramework>net6.0-windows</TargetFramework>
<RollForward>Major</RollForward>
```
This means the add-in will load into .NET 6 and newer version of .NET, but will prefer to load .NET 6 if available. Thus
  * If no .NET runtime is loaded yet, .NET 6 will be loaded if it is installed. 
  * If .NET 6 is not installed but a newer version of .NET is installed (e.g. .NET 8), the add-in will load the next available higher major version.
  * If a newer version of the runtime (e.g. .NET 8) is already loaded into the Excel process, the add-in will load and use that version.
 
* To allow for compatibility with a preference for the newest version, the add-in can be built target .NET 6.0 and set `RollForward' to `LatestMajor`.
```
<TargetFramework>net6.0-windows</TargetFramework>
<RollForward>LatestMajor</RollForward>
```
This means the add-in will load into .NET 6 and newer version of .NET, but will prefer to load the newest version of .NET available. Thus
  * If no .NET runtime is loaded yet, the newest installed version of .NET will be loaded (at least .NET 6).
  * If any version of the runtime from .NET 6 or newer is already loaded into the Excel process, the add-in will load and use that version.
  
  
