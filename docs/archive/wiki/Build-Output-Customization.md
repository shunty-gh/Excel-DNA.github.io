When the `ExcelDna.AddIn` NuGet package is installed into a project, some additional MSBuild targets are defined. These are used to copy the required `.xll` native add-in into the output directory, and create single-file packed versions of the add-in.

Installing the package will add a file called `Properties\ExcelDna.Build.props` into the project. This file can be used for basic customization of the additional build steps. `ExcelDna.Build.props` allows the following build properties to be configured:

```xml
  <!--
    Configuration properties for building .dna files
  -->
  <PropertyGroup>
    <!--
      Enable/Disable automatic generation of platform-specific versions of .dna files
    -->
    <ExcelDnaCreate32BitAddIn Condition="'$(ExcelDnaCreate32BitAddIn)' == ''">true</ExcelDnaCreate32BitAddIn>
    <ExcelDnaCreate64BitAddIn Condition="'$(ExcelDnaCreate64BitAddIn)' == ''">true</ExcelDnaCreate64BitAddIn>

    <!--
      Define the suffix used for each platform-specific file e.g. MyAddIn64.dna
    -->
    <ExcelDna32BitAddInSuffix Condition="'$(ExcelDna32BitAddInSuffix)' == ''"></ExcelDna32BitAddInSuffix>
    <ExcelDna64BitAddInSuffix Condition="'$(ExcelDna64BitAddInSuffix)' == ''">64</ExcelDna64BitAddInSuffix>
  </PropertyGroup>

  <!--
    Configuration properties for packing .dna files
  -->
  <PropertyGroup>
    <!--
      Enable/Disable packing of .dna files
    -->
    <RunExcelDnaPack Condition="'$(RunExcelDnaPack)' == ''">true</RunExcelDnaPack>

    <!--
      Suffix used for packed .xll files e.g. MyAddIn-packed.xll
    -->
    <ExcelDnaPackXllSuffix Condition="'$(ExcelDnaPackXllSuffix)' == ''">-packed</ExcelDnaPackXllSuffix>
  </PropertyGroup>
```


