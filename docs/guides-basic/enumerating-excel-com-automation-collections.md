---
title: "Enumerating Excel COM Automation Collections"
---
When referencing COM Automation collections late-bound, the enumeration via `For Each` does not automatically work. An explicitly cast or set to a variable of type `IEnumerable` will work, though:

```vb
Dim app As Object = ExcelDnaUtil.Application

Dim sh As Object
Dim flg As Boolean

For Each sh In CType(app.Worksheets, IEnumerable)
    ' Do stuff with sh here
Next
```

This should not be needed if an interop library is referenced.
