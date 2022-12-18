Weird trick (from comments here: https://techcommunity.microsoft.com/t5/Excel-Blog/Excel-Dynamic-Array-Improvements/ba-p/332070)

----

One (likely unintended) application of the @ operator is as a worksheet version of the CALL macro function. As an example enter from the VBE immediate window:

[a1]=ExecuteExcel4Macro("register(""msvcrt"",""_strrev"",""cc"")")

To return the contents of cell B1 in reverse order, enter in another cell:

=(@+A1)(B1)

Normally you'd just assign a function name like STRREV, but here function is a formula input instead - for instance for choosing among various hash functions.

----

Actually =(@+A1)(B1) is now crashing for me on latest build :(
Better to use the following alternative which works in all versions:
=IF(1,+A1)(B1)

----
To be more explicit, we can call a DLL function in the normal way from the sheet by first registering the function using:

ExecuteExcel4Macro "register(""msvcrt"",""_strrev"",""cc"",""STRREV"")"

and then call it from the sheet with:

=STRREV("hello")

If we select the 'STRREV' portion of this formula and press F9 we get the register id of the function (-996147200.) and an ' @' symbol:

=(@-996147200)("hello")

We can then try to apply this method to a list of registered functions in the first column, along with arguments in subsequent by filling down a simple formula. 

But if A1 = -996147200 then =(@A1)("hello") doesn't work and other alternatives seem to crash in current versions. On the other hand: =IF(1,+A1)(B1) does work as expected and could be filled down as required. 