---
title: "Asynchronous Functions"
---
Excel-DNA has a core implementation to support asynchronous functions. 

## Usage

- The asynchronous UDF should call `AsyncUtil.Run` as follows:

```csharp
public static object SleepAsync(string ms)
{
    return ExcelAsyncUtil.Run(nameof(SleepAsync), new object[] { ms }, () =>
    {
        Debug.Print("{1:HH:mm:ss.fff} Sleeping for {0} ms", ms, DateTime.Now);
        Thread.Sleep(int.Parse(ms));

        Debug.Print("{1:HH:mm:ss.fff} Done sleeping {0} ms", ms, DateTime.Now);
        return "Woke Up at " + DateTime.Now.ToString("1:HH:mm:ss.fff");
    });
}
```



The parameters of ExcelAsyncUtil.Run are:

- `string functionName` - the name of the async function. Used in combination with the `parameters` value to identify this async function by the .NET framework for its internal threading operations.
- `object parameters` - the set of parameters the function is being called with. Can be a single object (e.g. a string) or an object\[\] array of parameters. It should include all the parameters to the UDF as it is used in combination with the `functionName` value to identify this async function by the .NET framework for its internal threading operations. 
- ` ExcelFunc function` - a delegate function that will be executed asynchronously.

## Additional Example

_ Note: This code does not scale very well, since the web calls block a thread-pool thread. Using .NET 4 Tasks or .NET 4.5 async support could lead to a much better implementation. _

```csharp
//Sends an ICMP packet to the target and returns the results asynchronously
public static object PingAsync(string target)
        {
            return ExcelAsyncUtil.Run(nameof(PingAsync), new object[] { target }, () => Ping(target));
        }

//This function's payload will be executed by Excel's asynchronous engine
private static object Ping(string target)
{
    return new Ping().Send(target).Status.ToString();
}
```
