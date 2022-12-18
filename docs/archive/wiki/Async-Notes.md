Excel-DNA supports two types of async function:
* RTD-based async functions, that work in all version from Excel 2003+ (this is when you use ExcelAsyncUtil.*)
* Native Excel async functions, that work only in Excel 2010+ (this is when your function takes an ExcelAsyncHandle as parameter and has return type "void")

The behaviour of these types of functions is quite different:
* RTD-based async functions allow you to continue interacting with Excel while the function executes.
* Native async functions just allow Excel to continue with different parts of the sheet calculation while your function is busy. You can't interact with Excel while it is calculating.

The RTD-based async functions are the ones you have been using with ExcelAsyncUtil.Run.
To implement this, Excel-DNA defines an RTD server internally (see https://msdn.microsoft.com/en-us/library/aa140060(v=office.10).aspx for more about Excel's RTD feature).
The RTD server allows Excel-DNA to notify Excel that a function should be recalculated - typically after the async task is complete.

So the flow for an async function looks like this:
* You put an async function in a formula.
* Excel recalculates, calling your async function which internally calls ExcelAsyncUtil.Run in Excel-DNA.
* ExcelAsyncUtil.Run creates an RTD topic (using the function name and parameter info you pass as the first the arguments to ExcelAsyncUtil.Run)
* ExcelAsyncUtil.Run starts your async work (using the delegate passed as the third argument) and associates that with the RTD topic.
* ExcelAsyncUtil.Run returns #N/A to your UDF while the calculation continues.
* Your UDF returns the #N/A back to the Excel sheet.
* Now your work completes, and Excel-DNA signals to Excel that the RTD topic has been updated.
* Excel marks the cell which had that RTD topic in as dirty.
* Excel starts to recalculate, causing that cell to recalculated, causing your UDF to be called.
* The UDF calls ExcelAsyncUtil.Run with the same topic information as before.
* ExcelAsyncUtil.Run find the topic and completed value that it stored from your function. It then returns the value directly (instead of #N/A as before).
* Your UDF function received the result value, and returns that to the sheet.
* Because ExcelAsyncUtil.Run did not call into Excel's RTD function again, the RTD topics gets cleaned up internally by Excel.