Excel-DNA supports registering the .xll as a regular COM library, which can then be accessed from VBA (either late-bound via `CreateObject` or referenced in a project via Tools->References. This allows COM-visible classes in the add-in to be instantiated and accessed from VBA, with two advantages over regular COM libraries:

* The COM types are registered in the registry under the user hive if there is no access to the machine hive - this means that users with limited permissions in the registry can still use the COM objects.

* The COM objects are created in the same AppDomain as the rest of the Excel-DNA add-in. Among other things, this means that static references are shared between the UDF functions and the COM objects. So a cache or settings that are used by the UDF functions can be shared by objects instantiated and called from VBA.

More details in the particular .dna settings to add and step-by-step instructions for trying this out, can be found here:

* http://mikejuniperhill.blogspot.co.za/2014/03/interfacing-c-and-vba-with-exceldna-no.html
* http://mikejuniperhill.blogspot.co.za/2014/03/interfacing-c-and-vba-with-exceldna_16.html