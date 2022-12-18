Sample project with form and range selection: https://github.com/Ron-Ldn/DotNetRefEdit

This is a collection of links related to RefEdit range selection functionality:
* http://blogs.msdn.com/b/gabhan_berry/archive/2008/06/12/net-refedit-control.aspx
 (the source downloads are no longer available)
* http://www.codeproject.com/Articles/32805/RefEdit-Emulation-for-NET
* http://www.codeproject.com/Articles/34425/VS-NET-Excel-Addin-Refedit-Control

Indicating the RefEdit is unreliable:
* http://peltiertech.com/using-refedit-controls-in-excel-dialogs/
* https://support.microsoft.com/en-us/kb/291110

Also, the C API provides a dialog creation interface (SHOW.DIALOG) that allows you to add controls to a dialog, including adding a reference selector control. This snippet is a start: https://groups.google.com/forum/#!searchin/exceldna/show.dialog/exceldna/U6glMmn98KU/laRRDoSXo-4J Then the C API help file describes all the options.