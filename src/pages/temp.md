---
sidebar_label: 'Test123!'
sidebar_position: 2
---
# Demo Page

This is my **first Docusaurus document**!

## Hello World!

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="csharp" label="C#">

```csharp
public void PrintGreeting(string name) {
    Console.WriteLine("Hello " + name + " from C#!");
}

PrintGreeting("Excel-DNA");
```

</TabItem>
<TabItem value="vbnet" label="VB.Net">

```vbnet
Sub PrintGreeting(ByVal name as String)
    Console.WriteLine("Hello " & name & " from VB.Net!")
End Sub

PrintGreeting("Excel-DNA")
```

</TabItem>
<TabItem value="fsharp" label="F#">

```fsharp
let printGreeting name =
    printfn $"Hello {name} from F#!"
    
printGreeting "Excel-DNA"
```

</TabItem>
</Tabs>

## Some header