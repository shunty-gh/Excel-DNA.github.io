---
title: "Excel-DNA version 1.1"
date: 2020-06-29 18:53:00 -0000
authors: govert
tags: [release]
---
Excel-DNA version 1.1 is now available on [NuGet](https://www.nuget.org/packages/ExcelDna.AddIn/) and as a direct [download from GitHub](https://github.com/Excel-DNA/ExcelDna/releases). The easiest way to install is with Visual Studio’s NuGet package manager (package ExcelDna.AddIn) – a ‘ReadMe’ file with further instructions will then be displayed. From the Package Manager Console:

```
Install-Package ExcelDna.AddIn
```

Excel-DNA 1.1 is expected to be the final version to support older .NET (<4.5) and Excel (<2007) releases.

Excel-DNA version 1.1 implements workarounds for two recent changes in Excel behaviour:

- RTD servers based on ExcelRtdServer, and streaming functions based on IExcelObservable stopped updating after recent (early 2020) Excel updates.
- When loaded into an elevated Excel process (running As Administrator) the on-demand COM registration (used for ribbon and CTP loading) started failing (mid 2020).

The update also introduces strong-naming of the Excel-DNA assemblies (thanks to @augustoproiete)

Please post any issues you run into to the Google group (https://groups.google.com/forum/#!forum/exceldna)

To make a donation to the project, or to arrange for a corporate support agreement that lets you steer the future of Excel-DNA, please visit the [Excel-DNA Support](/#support) page.

Thank you for your continued support and enthusiasm towards the Excel-DNA project!
