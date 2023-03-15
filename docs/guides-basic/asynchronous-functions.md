---
title: "Asynchronous Functions"
---
Excel-DNA has a core implementation to support asynchronous functions. Two primary ways this could be implemented is through:

1. Task-based async functions (preferred) 
2. RTD-based async functions

It is worth noting that RTD-based functions use the same underlying mechanism as Task-based functions. However, it is easier to use Task-based functions as the asynchronous concept is abstracted.

## Task-based Async Functions

Task-based functions are the preferred way of async implementation. 

Both [AsyncTaskUtil.cs](https://github.com/Excel-DNA/Registration/blob/master/Source/ExcelDna.Registration/Utils/AsyncTaskUtil.cs) and [Disposables.cs](https://github.com/Excel-DNA/Registration/blob/master/Source/ExcelDna.Registration/Utils/Disposables.cs) from [Excel-DNA Registration](https://github.com/Excel-DNA/Registration) library must be included in the project's solution. Once included, the following line must be added at the top of source code file: 

```csharp
using ExcelDna.Registration.Utils;
```

**NOTE:** The [Excel-DNA Registration](https://github.com/Excel-DNA/Registration) helper is an extension library that is used to simplify (and modify) the function registration process at runtime. The helper includes conversions to assist in registering task-based async functions. For this example, the helper extensions library is not referenced but the required utility code is imported directly into the project. 

### Usage

* The following example, accepts a target URL (string) and returns a string (object) of characters that was downloaded from the given target URL. The asynchronous UDF should call `AsyncTaskUtil.RunTask` as follows:

```csharp
//The main function that is exposed to Excel.
public static object DownloadStringFromURL(string url)
{
    var functionName = nameof(DownloadStringFromURL);
    var parameters = new object[] { url }; 
    HttpClient myHttpClient = new HttpClient();
    
    return AsyncTaskUtil.RunTask(functionName, parameters, async () =>
    {
        //The actual asyncronous block of code to execute.
        return await myHttpClient.GetStringAsync(url);
    })
}
```

### Remarks

The parameters of `AsyncTaskUtil.RunTask` are:

* `string functionName` - the name of the async function. Used in combination with the `parameters` value to identify this async function by the .NET framework for its internal threading operations. 

  **NOTE:** Ensure to enclose the function name within the `nameof()` expression.

* `object parameters` - the set of parameters the function is being called with. Although it can be a single object (e.g. a string) it is preferred to enclose the parameter/s in an object\[\] array. 

  **NOTE:** Ensure to include all the parameters to the UDF as it is used in combination with the `functionName` value to identify this async function by the .NET framework for its internal threading operations. 

* ` Func<Task<T>> ` - a delegate function (can be anonymous) that will be executed asynchronously.



### Additional Example

* The following example, accepts a list of target IPs/hostnames (object[]) and the number of times to ping each target (int). The function returns an array of boolean values for each target indicating `true` if the target is reachable for all ping attempts otherwise `false`. 

```csharp
//The main function that is exposed to Excel.
public static object TaskedPingTargets(object[] targets, int pingCount)
{
    var functionName = nameof(TaskedPingTargets);
    var parameters = new object[] { targets, pingCount };
    
    //The task to run is an anonymous async function. 
    //It calls an async task per target and waits for all tasks to complete.
    //Once all tasks are complete, it returns an array of boolean values stating
    //each target reachability status.
    return AsyncTaskUtil.RunTask(functionName, parameters, async () =>
    {
        //create an empty list ot tasks.
        List<Task<PingReply[]>> tasks = new List<Task<PingReply[]>>();
		
        //add a PingTargetAsync task per target to the task list and execute it.
        foreach (string target in targets)
        {
            tasks.Add(PingTargetAsync(target, pingCount));
        }

        //wait for all results to arrive from the tasks.
        PingReply[][] results = await Task.WhenAll<PingReply[]>(tasks);
        object[] toReturn = new object[targets.Length];

        //format output to return.
        for (int i = 0; i<targets.Length; i++)
        {
            toReturn[i] = true;
            for (int j = 0; j<pingCount; j++)
            {
                if (results[i][j].Status != IPStatus.Success)
                {
                    toReturn[i] = false;
                    break;
                }
            }
        }
        return toReturn;
    });
}
//The actual asyncronous payload to execute. This function is not exposed to Excel. 
//NOTE: unlike the previous example, this task returns PingReply[] not double[].
private static async Task<PingReply[]> PingTargetAsync(string target, int pingCount)
{
    Ping ping = new Ping();
    PingReply[] replies = new PingReply[pingCount];

    for (int i = 0; i < pingCount; i++)
    {
        replies[i] = await ping.SendPingAsync(target);
    }

    return replies;
}
```



## RTD-based Async Functions

The RTD-based functions can also be used for async functionality. However, they are a less preferred method of async implementation.



### Usage

- The following example function accepts a string value in milliseconds (which is parsed to an int, later on), and sleeps for that duration. The asynchronous UDF should call `AsyncUtil.Run` as follows:

```csharp
//The main function that is exposed to Excel.
public static object SleepAsync(string ms)
{
    var functionName = nameof(SleepAsync);
    var parameters = new object[] { ms };
    
    //The task to run is an anonymous function. All it does is sleep for a certain amount of milliseconds.
    return ExcelAsyncUtil.Run(nameof(functionName), parameters, () =>
    {
        Debug.Print("{1:HH:mm:ss.fff} Sleeping for {0} ms", ms, DateTime.Now);
        Thread.Sleep(int.Parse(ms));

        Debug.Print("{1:HH:mm:ss.fff} Done sleeping {0} ms", ms, DateTime.Now);
        return "Woke Up at " + DateTime.Now.ToString("1:HH:mm:ss.fff");
    });
}
```

### Remarks

The parameters of `ExcelAsyncUtil.Run` are:

- `string functionName` - the name of the async function. Used in combination with the `parameters` value to identify this async function by the .NET framework for its internal threading operations.

  **NOTE:** Ensure to enclose the function name within the `nameof()` expression.

- `object parameters` - the set of parameters the function is being called with. Can be a single object (e.g. a string) or an object\[\] array of parameters. It should include all the parameters to the UDF as it is used in combination with the `functionName` value to identify this async function by the .NET framework for its internal threading operations.

  **NOTE:** Ensure to include all the parameters to the UDF as it is used in combination with the `functionName` value to identify this async function by the .NET framework for its internal threading operations.  

- ` ExcelFunc function` - a delegate function (can be anonymous) that will be executed asynchronously.



### Additional Example

* The following example function accepts a target IP/hostname (string) to asynchronously send a ping to.

```csharp
//Sends an ICMP packet to the target and returns the results asynchronously.
public static object PingAsync(string target)
        {
            return ExcelAsyncUtil.Run(nameof(PingAsync), new object[] { target }, () => Ping(target));
        }

//This function's payload will be executed by Excel's asynchronous engine.
private static object Ping(string target)
{
    return new Ping().Send(target).Status.ToString();
}
```
