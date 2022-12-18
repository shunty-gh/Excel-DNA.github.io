# ExcelFunctionAttribute

* `Name`
* `Description`
* `Category`
* `HelpTopic`
* `IsVolatile` (`!` suffix)
* `IsHidden`
* `IsExceptionSafe`
* `IsMacroType` (`#` suffix)
* `IsThreadSafe` (`$` suffix)
* `IsClusterSafe` (`&` suffix)
* `ExplicitRegistration`
* `SuppressOverwriteError`

### IsMacroType

The `IsMacroType=true` attribute changes the parameters Excel-DNA uses when registering the function, which is done with a call to `xlfRegister`, as documented in the [Excel API Reference for `xlfRegister`](https://msdn.microsoft.com/en-us/library/office/bb687900.aspx). In particular, Excel-DNA adds a "#" to the end of the `pxTypeText` parameter if `IsMacroType=true`.

The documentation says:

> Placing a # character after the last parameter code in `pxTypeText` gives the function the same calling permissions as functions on a macro sheet. These are as follows:
> * The function can retrieve the values of cells that have not yet been calculated in this recalculation cycle.
> * The function can call any of the XLM information (Class 2) functions, for example, `xlfGetCell`.
>
> If the number sign (#) is not present:
> * evaluating an uncalculated cell results in an `xlretUncalced` error, and the current function is called again once the cell has been calculated;
> * calling any XLM information function other than `xlfCaller` results in an `xlretInvXlfn` error.

Some disadvantages of marking a function as `IsMacroType=true`:

* they cannot be multi-threaded - Excel-DNA will not add the "$" suffix when registering, even if they are marked as `IsThreadSafe=true`.

* if they contain at least one parameter of type object that is marked `[ExcelArgument(AllowReference=true)]` then the function is automatically considered as volatile by Excel (even if the function is explicitly marked as `IsVolatile=false`.)

Further, my understanding is that such functions are treated differently in the dependency processing during Excel calculations. So you might expect some changes on the order in which sheets calculate. I have no reference or reproduction for this, though.

My recommendation is to only set `IsMacroType=true` in exceptional cases, when you know it is certainly required and you are prepared to investigate any issues that might arise.

### IsThreadSafe

Setting `IsThreadSafe=true` indicates that a function can safely participate in [Multithreaded recalculation](https://msdn.microsoft.com/en-us/library/office/bb687899.aspx). This just adds a `$` to the end of the registration string used in the internal call made to `xlfRegister`.

### IsClusterSafe

Setting `IsClusterSafe=true` indicates that a function is a [Cluster Safe Function](https://msdn.microsoft.com/en-us/library/office/ff475871.aspx). This just adds an `&` to the end of the registration string used in the internal call made to `xlfRegister`.

### IsExceptionSafe

Setting `IsExceptionSafe=true` indicates that Excel should crash whenever an unhandled exception is thrown.
It allows some performance optimization by Excel-DNA, but is a feature best ignored. 

# `ExcelArgumentAttribute`

* `Name`
* `Description`
* `AllowReference` (R / U datatype in `xlfRegister`) - Arguments of type object may also receive `ExcelReference`.

# `ExcelCommandAttribute`

* `Name`
* `Description` (_Unused_)
* `HelpTopic` (_Unused_)
* `ShortCut`
* `MenuName`
* `MenuText`
* `IsExceptionSafe`
* `ExplicitRegistration`
* `SuppressOverwriteError`
