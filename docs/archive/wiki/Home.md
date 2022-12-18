---
sidebar_position: 1 
---
Welcome to the Excel-DNA wiki!

The wiki in this project will be used to document the internal implementation of the Excel-DNA core library (the native code .xll, ExcelDna.Loader and ExcelDna.Integration). Documentation for those using Excel-DNA to build add-in should go into the https://github.com/Excel-DNA/Excel-DNA.github.io repository.

### What is Excel-DNA?

Excel-DNA is a library to help you make Excel add-ins with .NET. Your add-in can be written in VB.NET, C# or F# (or a combination of these), using the Visual Studio IDE or a just a text editor.

### Aren't there other ways to create Excel add-ins with .NET? Why should I use Excel-DNA?

There are a few different ways of making Excel add-ins with .NET, but Excel-DNA has unique advantages. First, let me explain the different kind of Excel add-ins.

Now let's put together a list of the different ways to make an Excel add-in with .NET:
* VSTO
* COM add-in
* C API
* Other libraries - NetOffice, Add-In Express, FCell.

Finally, where does Excel-DNA fit in? Excel-DNA brings together all three parts we need to make a great Excel add-in with .NET - the native Excel C API, the COM object model and the .NET runtime.

### Shouldn't I just stick to the official Microsoft tools for making Excel add-ins, rather than relying on a third-party tool?

Using only the Microsoft tools, it has been hard to make powerful and full-featured Excel add-ins with .NET, that work in different Excel versions, and are easy to deploy. Some of the problems are:
* Microsoft has no official support for using the native Excel C API in .NET add-ins
* VSTO has no support for making user-defined worksheet functions
* Automation add-ins can provide UDF, but have poor performance, and allow limited customization
* VSTO and regular COM-based add-ins require administrative rights to install

What if I want to make an Excel add-in with Python, C or C++?

Excel-DNA is used for making Excel add-ins with .NET. There are similar libraries that integrate with the native Excel C API, for making add-ins with other languages.

* Python: PyXLL
* C/C++: Xlw, XLL+
* Modern C++: xll8.

### What about VBA? Can Excel-DNA help me use my VBA skills and still move to .NET?

VB.NET is the newest member of the Visual Basic family. While sometimes overshadowed in popularity by C#, VB.NET is as powerful as C# (sometimes more!), can access all the same .NET libraries, and is fully supported for making Excel-DNA add-ins. While VB.NET gives a familiar syntax if you're coming from VBA, there are still a few changes that you need to get used to. But rest assured that VB.NET gives you access to the full power of .NET and Excel-DNA.

Excel-DNA add-ins can also integrate with VBA code by creating your own COM libraries that can be called from VBA. One advantage in putting these libraries inside an Excel-DNA add-in is that they can be deployed without requiring registration with administrator privileges.