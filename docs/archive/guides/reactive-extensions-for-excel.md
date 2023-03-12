---
title: "Reactive Extensions for Excel"
---

Excel-DNA has support for integrating the [Reactive Extensions](https://github.com/dotnet/reactive) library (Rx) with Excel via RTD.

- To map the .NET Rx types to the Excel-DNA RTD-based mechanism, it is possible to use the following code:

```csharp
using System;

namespace ExcelDna.Integration.RxExcel
{
    public static class RxExcel
    {
        public static IExcelObservable ToExcelObservable<T>(this IObservable<T> observable)
        {
            return new ExcelObservable<T>(observable);
        }

        public static object Observe<T>(string functionName, object parameters, Func<IObservable<T>> observableSource)
        {
            return ExcelAsyncUtil.Observe(functionName, parameters, () => observableSource().ToExcelObservable());
        }
    }

    public class ExcelObservable<T> : IExcelObservable
    {
        readonly IObservable<T> _observable;

        public ExcelObservable(IObservable<T> observable)
        {
            _observable = observable;
        }

        public IDisposable Subscribe(IExcelObserver observer)
        {
            return _observable.Subscribe(value => observer.OnNext(value), observer.OnError, observer.OnCompleted);
        }
    }
}
```


(VB.NET version here:  [Reactive Extensions for Excel - VB.NET](reactive-extensions-for-excel-vbnet)).

- UDFs that hook up Observables then look like this:

```csharp
// Publishes a single value after the interval elapses.
public static object rxTimerWaitInterval(int intervalSeconds)
{
    return RxExcel.Observe("rxTimerWaitInterval", intervalSeconds, () =>
        Observable.Timer(TimeSpan.FromSeconds(intervalSeconds)));
}
```

The main entry point is then the RxExcel.Observe function, which takes the function name, an object or array of objects representing the ‘parameters’, and then a delegate that will return the IObservable.
The combination of function name and parameters is used to identify the topic. You could have different cells (callers) with their own Observables even though they are calling the same function with the same parameters by adding the caller - XlCall.Excel(XlCall.xlfCaller) - to the array of parameters.

## Additional Examples

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using ExcelDna.Integration;
using ExcelDna.Integration.RxExcel;

namespace AsyncFunctions
{
    public class RxTest
    {
        // Just returns a single value and completes the sequence.
        public static object rxReturn(object value)
        {
            return RxExcel.Observe("rxReturn", value, () =>
              Observable.Return(value));
        }

        // We don't currently distinguish between Empty and Never.
        // Empty is a sequence that immediately completes without pushing a value.
        // So we return #N/A (the pre-Value 'Not Available' return state),
        // and then never have anything else to return when the sequence completes.
        // CONSIDER: Should we rather transition to an empty string if we comlete without seeing a value?
        public static object rxEmpty()
        {
            return RxExcel.Observe("rxEmpty", null, () =>
                Observable.Empty<string>());
        }

        // Never just doesn't return anything, so our functions stays in the #N/A pre-value return state.
        // This seems fine.
        public static object rxNever()
        {
            return RxExcel.Observe("rxNever", null, () =>
                Observable.Never<string>());
        }

        // By default, all exceptions are just returned as #VALUE, consistent with the rest of Excel-DNA.
        // If an UnhandledExceptionHandler is registered via Integration.RegisterUnhandledExceptionHandler,
        // then the result of that handler will be returned by this function.
        public static object rxThrow()
        {
            return RxExcel.Observe("rxThrow", null, () =>
                Observable.Throw<string>(new Exception()));
        }

        // Note that the System.Timers.Timer used here will raise it's Elapsed events from a ThreadPool thread.
        // This is fine - the RxExcel RTD server does all the cross-thread marshaling.
        public static object rxCreateTimer(int intervalSeconds)
        {
            return RxExcel.Observe("rxCreateTimer", intervalSeconds, () =>
                Observable.Create<string>(observer =>
                {
                    var timer = new System.Timers.Timer();
                    timer.Interval = intervalSeconds * 1000;
                    timer.Elapsed += (s, e) => observer.OnNext("Tick at" + DateTime.Now.ToString("HH:mm:ss.fff"));
                    timer.Start();
                    return timer;
                }));
        }

        // Excel will not update for every value in the sequence - just as often as the ThrottleInreval allows.
        // Observable.Interval might generate many values we ignore.
        public static object rxInterval(int intervalSeconds)
        {
            return RxExcel.Observe("rxInterval", intervalSeconds, () =>
                Observable.Interval(TimeSpan.FromSeconds(intervalSeconds)));
        }

        // Publishes a single value after the interval elapses.
        public static object rxTimerWaitInterval(int intervalSeconds)
        {
            return RxExcel.Observe("rxTimerWaitInterval", intervalSeconds, () =>
                Observable.Timer(TimeSpan.FromSeconds(intervalSeconds)));
        }

        // Publishes a single value at the given time.
        public static object rxTimerWaitUntil(DateTime timeUntil)
        {
            return RxExcel.Observe("rxTimerWaitUntil", timeUntil, () =>
                Observable.Timer(timeUntil));
        }

        // A custom sequence returning squares every 5 seconds, up to 20 * 20.
        // Not Observing 'Per Caller' ensures we share a sequnce if using the function in different cells
        public static object rxCreateValues()
        {
            return RxExcel.Observe("rxCreateValuesShared", null, () =>
                Observable.Generate(
                    1,
                    i => i <= 20,
                    i => i + 1,
                    i => i * i,
                    i => TimeSpan.FromSeconds(5)));
        }

        // A custom sequence returning squares every intervalSeconds seconds, up to 10 * 10.
        // Observe 'Per Caller' by sending the caller is one of the 'parameters' into RxExcel.Observe.
        // This ensures we get different sequences if using the function in different cells
        public static object rxCreateValuesPerCaller(int intervalSeconds)
        {
            object caller = XlCall.Excel(XlCall.xlfCaller);

            return RxExcel.Observe("rxCreateValues", new[] {intervalSeconds, caller}, () =>
                Observable.Generate(
                    1,
                    i => i <= 10,
                    i => i + 1,
                    i => i * i,
                    i => TimeSpan.FromSeconds(5)));
        }

        // Some experiments returning arrays ... not really useful yet.
        public static object rxCreateArrays()
        {
            return RxExcel.Observe("rxCreateArrays", null, () =>
                Observable.Generate(
                    new List<object> {1,2,3},
                    lst => true,
                    lst => { lst.Add((int)lst[lst.Count-1] + 1); return lst;},
                    lst => Transpose(lst.ToArray()),
                    lst => TimeSpan.FromSeconds(2)));
        }

        static object[,] Transpose(object[] array)
        {
            object[,] result = new object[array.Length, 1];
            for (int i = 0; i < array.Length; i++)
            {
                result[i,0] = array[i];
            }

            return result;
        }
    }
}
```
