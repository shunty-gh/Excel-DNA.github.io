Microsoft KB articles on general Excel troubleshooting
* Excel: How to Troubleshoot Crashing and Not Responding Issues with Excel - https://support.microsoft.com/en-us/kb/2758592
* Excel: How to troubleshoot crashing and not responding issues in an Excel Files - https://support.microsoft.com/en-us/kb/2735548


***


Microsoft is quite explicit about not expecting any access to the COM object model from either the function wizard, or an .xll worksheet function (async or not): (used to be at https://support.microsoft.com/en-us/kb/301443 but now sadly no longer available...).

	"A function that is defined in an XLL can be called under three circumstances:

	1. During the recalculation of a workbook
	2. As the result of Excel's Function Wizard being called on to help with the XLL function
	3. As the result of a VBA macro calling Excel's Application.Run Automation method

	Under the first two circumstances, Excel's Object Model does not expect, and is not prepared for, incoming Automation calls. Consequently, unexpected results or crashes may occur.

	In order to ensure that they function properly, no Automation calls should be made from an XLL. Instead, all commands to Excel from the XLL should be sent using the Excel4() C API." 