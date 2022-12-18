---
title: "Excel-DNA version 1.0"
date: 2019-03-17 21:08:00 -0000
authors: govert
tags: [release]
---
Excel-DNA version 1.0 is now available on [NuGet](https://www.nuget.org/packages/ExcelDna.AddIn/) and as a direct [download from GitHub](https://github.com/Excel-DNA/ExcelDna/releases). The easiest way to install is with Visual Studio’s NuGet package manager (package ExcelDna.AddIn) – a ‘ReadMe’ file with further instructions will then be displayed. From the Package Manager Console:

```
Install-Package ExcelDna.AddIn
```

The Excel-DNA 1.0.x series (this version with minor fixes) will be the final version to support older .NET (<4.0) and Excel (<2007) releases.

Version 1.0 is essentially the same as the long-overdue version 0.35. The update includes a number of bug fixes as well as improvements to the build-time Visual Studio integration:

- Improve build tasks – more reliable clean-up and debugger detection
- Improve RTD and async QueueAsMacro reliability
- Improve install process of ExcelDna.AddIn NuGet package (now requires NuGet 2.5) (thanks to @caioproiete)
- Change how ExcelDnaUtil.Application works in Protected View – try harder but don’t cache
- Call UnhandledExceptionHandler for macros (ExcelCommands) too
- Add XML schema for .dna file (thanks to @caioproiete)
- Add option to pack .pdb files (thanks to @lanfeust69)
- Fix exception handling from native async functions (thanks to @ittegrat)

Please post any issues you run into to the Google group (https://groups.google.com/forum/#!forum/exceldna)

------

To make a donation to the project, or to arrange for a corporate support agreement that lets you influence the future of Excel-DNA, please visit the [Excel-DNA Support](https://excel-dna.net/support/) page.

Thank you for your continued support and enthusiasm towards the Excel-DNA project!
