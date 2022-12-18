### Some links

* [Preview of Dynamic Arrays in Excel](https://techcommunity.microsoft.com/t5/excel-blog/preview-of-dynamic-arrays-in-excel)

* [Dynamic arrays and spilled array behavior](https://support.office.com/en-us/article/dynamic-arrays-and-spilled-array-behavior-205c6b06-03ba-4151-89a1-87a7eb36e531)

* [Dynamic array formulas in non-dynamic aware Excel](https://support.office.com/en-us/article/dynamic-array-formulas-in-non-dynamic-aware-excel-696e164e-306b-4282-ae9d-aa88f5502fa2)

* [Implicit intersection operator: @](https://support.office.com/en-us/article/implicit-intersection-operator-ce3be07b-0101-4450-a24e-c1c999be2b34)

* [ Formula vs Formula2](https://docs.microsoft.com/en-us/office/vba/excel/concepts/cells-and-ranges/range-formula-vs-formula2)

* Bill Jelen links: 
   * [Intro in Strategic Finance magazine](https://sfmagazine.com/post-entry/november-2018-excel-dynamic-array-functions/)
   * [An e-book for sale](https://www.mrexcel.com/products/excel-dynamic-arrays-straight-to-the-point-2nd-edition/)
   * [Youtube video](https://youtu.be/ViSEZLPmRvw)

### Testing for whether the running Excel instance supports dynamic arrays

```csharp
        static bool? _supportsDynamicArrays;  
        [ExcelFunction(IsHidden=true)]
        public static bool SupportsDynamicArrays()
        {
            if (!_supportsDynamicArrays.HasValue)
            {
                try
                {
                    var result = XlCall.Excel(614, new object[] { 1 }, new object[] { true });
                    _supportsDynamicArrays = true;
                }
                catch
                {
                    _supportsDynamicArrays = false;
                }
            }
            return _supportsDynamicArrays.Value;
        }
```