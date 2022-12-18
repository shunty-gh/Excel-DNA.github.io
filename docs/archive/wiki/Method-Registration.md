## Introduction

Excel-DNA examines libraries specified in the .dna configuration file by Reflection, and registers appropriate methods with Excel using the `xlfRegister` C API call. The page describes the default registration processing, trouble-shooting and options for customization in the add-in.

## Registration

### Default registration

By default, Excel-DNA will attempt to register all 'public static' functions that have compatible signatures, for all the assemblies listed as <ExternalLibrary....\> in your .dna file.

There are two optional attributes that you can put into the .dna file that control the registration:

#### ExplicitExports

* If you only want to register the functions explicitly marked with either an ExcelFunction or ExcelCommand attribute, you can add an ExplicitExports='true' tag in the .dna file:
```
    <ExternalLibrary Path="MyFunctions.dll" Pack="true" ExplicitExports="true" />
```

* This attribute is valid in `Project` and `ExternalLibrary` tags in the .dna file.

### ExplicitRegistration option

If your add-in is going to do the registration explicitly (e.g. if you are using the Registration extension library) then you can add the `ExplicitRegistration='true'` tag in the .dna file.
In this case Excel-DNA will not register any function automatically, and your add-in can do the registration by calling `ExcelIntegration.RegisterDelegates(...)`.

The `ExplicitRegistration` option allows specific methods or libraries to opt out of the default registration processing. Such methods and libraries have to 'explicitly register' by calling one of the `ExcelIntegration.RegisterXXX` methods. 

* Valid on `ExcelFunctionAttribute` and `ExcelCommandAttribute`.

* Valid in `Project` and `ExternalLibrary` tags in the .dna file.

* When `ExcelIntegration.RegisterMethods` or `ExcelIntegration.RegisterDelegates` is called, the flag is removed from any attributes passed in before further processing.

### Dynamic registration with `ExcelIntegration.RegisterDelegates`

There is an Excel-DNA extension library that does custom method pre-processing and registration - see the [ExcelDna.Registration](https://github.com/Excel-DNA/Registration) project.

## Registration Logging

...

