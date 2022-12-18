## Common Issues with Excel
* [Why Excel starts with no default workbook or start page with my ExcelDna Add-in?](https://github.com/Excel-DNA/ExcelDna/wiki/FAQ/#q-why-excel-starts-with-no-default-workbook-or-start-page-with-my-exceldna-add-in)

---

### Common Issues with Excel

#### Q: Why Excel starts with no default workbook or start page with my ExcelDna Add-in?
**A**: This seems to be a known bug in Excel, and affects other types of Excel add-ins (not just the ExcelDna ones)
  * More details in the links below:
    * [Open to blank workbook/Open to splash backstage broken after Excel 2016 O365 Upgrade](https://groups.google.com/forum/#!topic/exceldna/3fIunrFUbwY)
    * [Strange : Excel not properly started with latest Office 2016 update + ExcelDna AddIn](https://groups.google.com/forum/#!topic/exceldna/eJtRC-MnkrI)
    * [Bug in Excel 2016: Excel starts with no default workbook or start page if an XLL is registered](https://social.msdn.microsoft.com/Forums/office/en-US/2bb21bfb-4940-4a68-9656-743ae0b8b4da/bug-in-excel-2016-excel-starts-with-no-default-workbook-or-start-page-if-an-xll-is-registered?forum=exceldev)

#### Q: Run Excel-DNA XLL project via Visual Studio and when Excel starts it shows a message<br/>"Microsoft Office has identified a potential security concern.<br/>Warning: There is no digital signature available.<br/>File Path: ...": 
**A**: Excel's default security settings will only allow code to be run from certain locations. To override this, add your XLL output file location to the Trusted Locations list.
* In Excel's Options, go to "Trust Center" and then click on the "Trust Center Settings..." button. 
* Go to `Trusted Locations` and then click "Add new location..." button
* Choose the path corresponding to the output location of your project .xll binaries. You could also choose your main project folder and tick the "Subfolders of this location are also trusted" checkbox, assuming the output binaries will be nested somewhere underneath the same project folder.
* Click all the necessary OK buttons to confirm till you get back to the main Excel window.

#### Q: Trying to launch my Excel-DNA XLL via Visual Studio and when Excel *64-bit* starts it shows a confirmation dialog:<br/>"The file format and extension of _ABC-AddIn_.xll don't match. The file could be corrupted, or unsafe. Unless you trust its source, don't open it. Would you like to open it anyway?"
**A**: This message is a bit misleading. If you have Excel 64-bit installed, then you will need to make sure you are starting the 64-bit version of the XLL and not the default 32-bit XLL (all the instructions/examples seem to be written with Excel 32-bit version in mind)
* Quickly double check your Excel version is 64 bit (e.g. via "Account" -> "About Excel")
* Go back to your Visual Studio and open the project's Properties
* go to "Debug"
   * Under the "Start Action" -> "Start external program:" - you should already have the 64-bit version of Excel.exe program selected
   * Now under "Start options" -> "Command line arguments" - instead of the default XLL (e.g. `ABC-AddIn.xll`), you should use the 64-bit equivalent (e.g. `ABC-AddIn64.xll`). Note: "ABC" will usually be the project's name.