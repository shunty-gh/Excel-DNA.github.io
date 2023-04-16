---
sidebar_position: 1
title: "Getting Started"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The easiest way to make an Excel-DNA addin is to create to follow these simple steps:

### Create a Project in Visual Studio

1. Select **Create a new project** and then select **Class Library** in either Visual Basic, C# or F#.
2. Enter a name for the project.
3. Under Framework, select the **.NET 6.0 (Long-term support)** option.

### Write the Addin Code

1. Depending on the language of choice, in the .csproj, .vbproj, or .fsproj file, change the value between the *TargetFramework* tags to **net6.0-windows**.

2. Add the following under </PropertyGroup\>:

   ```xml
   <ItemGroup>
       <PackageReference Include="ExcelDna.Addin" Version="*-*"/>
   </ItemGroup>
   ```
   
   Depending on the language of choice (C#, Visual Basic.NET or F#), add the following code to the class file (.cs, .vb or .fs):

    <Tabs>
    <TabItem value="csharp" label="C#">
   
    ```csharp
    using ExcelDna.Integration;
   
    public static class MyFunctions
    {
      [ExcelFunction(Description = "My first .NET function")]
      public static string SayHello(string name)
      {
        return "Hello " + name;
      }
    }
    ```
    </TabItem>
   <TabItem value="vbnet" label="VB.Net">

    ```vbnet
    Imports ExcelDna.Integration
   
    Public Module MyFunctions
        <ExcelFunction(Description:="My first .NET function")>
        Public Function SayHello(ByVal name As String) As String
            Return "Hello " & name
        End Function
    End Module
    ```
    </TabItem>
    <TabItem value="fsharp" label="F#">

    ```fsharp
    module MyFunctions = 
        open Excel.Integration
   
        [<ExcelFunction(Description = "My first .NET function")>]
        let SayHello name = "Hello " + name
    ```

    </TabItem>
    </Tabs>

### Compile and Run

1. To compile the solution, ensure to explicitly select **Build Solution**, under the **Build** menu item at the top menu bar. Alternatively, press the Ctrl+Shift+B key combination.

2. To run the code after compilation, select **Start Debugging**, under the **Debug** menu item at the top menu bar. Alternatively, press F5.

3. When the solution is running, Excel will open and a security notice will pop-up. Select the **Enable this add-in for this session only.** option.

4. In Excel, open a new workbook and use the newly created function:

   ```
   =SayHello("World!")
   ```

### Debug

It is possible to debug the solution through Visual Studio. To do so, follow these simple steps while the solution is running:

1. In Visual Studio, navigate to the line of code that is required debugging.
2. Create a breakpoint by selecting **Toggle Breakpoint**, under the **Debug** menu item at the top menu bar. Alternatively, press F9. The line of code would be highlighted in red.
3. In Excel, use the function that is needed to be debugged. The execution of the function will be caught by Visual Studio at the breakpoint. The line of code would be highlighted in yellow.
4. In Visual Studio, inspect the code and change it as required. Once done, select **Continue**, under the **Debug** menu item at the top bar. Alternatively, press F5.
5. Finally, see the new results reflect in Excel upon completion of execution of the debugged function.

### Distribution

In order to use the newly created add-in, users would require the .NET 6 runtime to be installed. Additionally, the correct architecture (32bit or 64bit) of the installation should be taken into consideration.

### Transitioning to .NET 6

In recent years, Microsoft has moved from the older .NET Framework to the newer, cross-platform .NET 6. The transition brings new features, better performance, and a simpler project format. For more details, see [.NET Framework vs. .NET 6](../../../dotnet_framework_vs_dotnet6) and the walkthrough guide [Updating Project File to SDK-style](./guides-basic/updating-project-file-to-sdk-style).

