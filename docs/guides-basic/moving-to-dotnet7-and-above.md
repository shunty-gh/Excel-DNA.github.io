---
title: "Moving to .NET 7 and Above"
---
The Excel-DNA solution currently supports .NET 6 and .NET Framework 4.x. The rationale behind the decision of not targeting .NET 7 and above at this stage is due to the restriction that the .NET Core series of runtimes imposes. To put simply, the restriction allows only a single version of the runtime to be loaded in a process (see [GitHub issue](https://github.com/dotnet/runtime/issues/53729)).

In other words, an add-in that is targeting .NET 6 cannot run alongside an add-on that is targeting .NET 7. For example, if a .NET 7 add-in is loaded first, none of the .NET 6 add-ins can run and vice-versa. However, it is important to note that .NET Core (e.g. .NET 6) and .NET Framework 4.x can work side by side.  

For .NET 8+, there exists an improved support for precompiling add-ins to native code using the [.NET NativeAOT feature](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/).
In theory, it could be possible to make a .NET 8 add-in that is compiled using NativeAOT, and load it alongside an add-in targeting .NET 6. However, NativeAOT has various restrictions around which APIs and libraries are supported, and only experimental COM support.

From Excel-DNA's perspective, it would require a substantial effort to support NativeAOT, and so the timing would depend on the support and sponsorship the project receives from its remarkable user-base. As a result, it is highly recommended to stay on .NET 6 for the foreseeable future.

Potential solutions that could be useful are:

1. Use dependencies that multi-target both .NET 6 and .NET 7+.
2. Develop an out-of-process model, using a proxy add-in that is targeting .NET Framework or .NET 6 in the process, and marshal to an external process that hosts the .NET 7 add-in. 