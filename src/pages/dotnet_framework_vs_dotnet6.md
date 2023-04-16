

# .NET Framework vs .NET 6

.NET Framework and .NET 6 are two different versions of Microsoft's .NET technology stack.

.NET Framework is a software framework that was first released in 2002. It has been widely used for developing Windows desktop applications, web applications, and services. However, it is now considered a legacy technology and is being phased out by Microsoft.

.NET 6 is the latest version of the .NET technology stack and was released in 2021. It is an open-source, cross-platform framework that can be used for developing applications for Windows, Linux, and macOS. .NET 6 is designed to be faster, more flexible, and more feature-rich than its predecessor, and it includes many new features and improvements.

## Key differences between .NET Framework and .NET 6

* **Platform support:** While .NET Framework is primarily designed for Windows, .NET 6 can be used to develop applications for multiple platforms, including Windows, Linux, and macOS.
* **Performance:** .NET 6 is designed to be faster than .NET Framework, with improved performance in areas such as startup time and memory usage.
* **Features:** .NET 6 includes many new features that are not available in .NET Framework, such as support for C# 10 and F# 6, new libraries, and improved support for cloud-native applications.
* **Support lifecycle:** Microsoft has announced that it will end support for .NET Framework on October 2023, whereas .NET 6 is a long-term support (LTS) release with support until November 2026.

Overall, .NET 6 is considered to be the future of the .NET technology stack, and developers are encouraged to transition to it from .NET Framework.

## XML-style Project File vs SDK-style Project File

In the past, .NET projects were defined using an XML-style project file format, which contained a lot of boilerplate code and was hard to read and maintain. In recent versions of .NET, a new SDK-style project format has been introduced, which is simpler and easier to work with.

**Example XML-style**

```xml
<Project ToolsVersion="15.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp3.1</TargetFramework>
    <RuntimeIdentifiers>win-x64;linux-x64;osx-x64</RuntimeIdentifiers>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="3.1.4" />
    <PackageReference Include="Microsoft.Extensions.Logging.Console" Version="3.1.4" />
  </ItemGroup>
  <ItemGroup>
    <Compile Include="Program.cs" />
    <Compile Include="MyClass.cs" />
  </ItemGroup>
</Project>
```

**Example SDK-style**

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
    <RuntimeIdentifiers>win-x64;linux-x64;osx-x64</RuntimeIdentifiers>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="6.0.0" />
    <PackageReference Include="Microsoft.Extensions.Logging.Console" Version="6.0.0" />
  </ItemGroup>
  <ItemGroup>
    <Compile Include="Program.cs" />
    <Compile Include="MyClass.cs" />
  </ItemGroup>
</Project>

```

From the examples above it can be noticed that the new SDK-style project file format is simpler and more concise. The <Project\> tag includes an Sdk attribute, which specifies the SDK to use. The <PropertyGroup\> and <ItemGroup\> tags are used to group related settings and items, respectively.

As mentioned earlier, one of the main benefits of the SDK-style project file format is that it eliminates a lot of the boilerplate code that was required in the XML-style format. For example, in the XML-style format, it was needed to specify the tools version, the namespace for MSBuild, and the project type. In the SDK-style format, these are all handled automatically by the SDK.

An additional benefit of the SDK-style format is that it is easier to customize and extend. For example, it is possible to create custom tasks and targets by adding them to the project file.

For further information regarding the style differences and how could an Excel-DNA project be converted from the XML-style to the SDK-style see the [Updating Project to SDK-Style](../..//docs/guides-basic/updating-project-file-to-sdk-style) guide.