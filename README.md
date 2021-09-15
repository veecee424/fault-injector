# fault-injector is a tiny lightweight package which runs destructive test cases on a provided function as many times as possible. It's easy and simple to use.

### Installation
```
npm install fault-injector
```
### Basic usage
```js
var faultInjector = require('fault-injector')

function fxn (a, b) {
    if (typeof a == 'number' && typeof b == 'number')
    return a+b
}

var sumFunction = faultinjections.describe(fxn)
                          .accepts(2, 'num1', 'num2')

console.log(sumFunction.inject())
Output => { Description:
   { { function_description: 'No description',
     number_of_params: 2,
     name_of_params: 'num1 , num2',
     return_value: 'Return value not specified',
     data_types: 'Data types not specified' },
  ChaosReport:
   [ { payload: {num1: [], num2: undefined}, response: undefined },
     { payload: {num1: null, num2: {}, response: undefined },
     { payload: {num1: false, num2: true}, response: undefined },
     { payload: {num1: '!@#$%', num2: ['a', 'b', 'c']}, response: undefined },
     { payload: {num1: Infinity, num2: ''}, response: undefined },
     { payload: {num1: 5, num2: 1}, response: 6 },
     { payload: {num1: 'mixedCaseNoSymbolAndNum', num2: true}, response: undefined },
     { payload: {num1: 6, num2: "1239084"}, response: undefined },
     { payload: {num1: {name: 'vee', age: 12}, num2: NaN}, response: undefined },
     { payload: {num1: 12345, num2: 3}, response: 12348 },
     { payload: {num1: -Infinity, num2: NaN}, response: undefined },
     { payload: {num1: 'test@email.com', num2: 4}, response: undefined },
     { payload: {num1: 9007199254740992n, num2: ''}, response: undefined },
     { payload: {num1: [1,2,3], num2: 0}, response: undefined },
     { payload: {num1: -123456, num2: null}, response: undefined },
     { payload: {num1: {}, num2: -123456}, response: undefined },
     { payload: {num1: 2, num2: 3}, response: 5 },
     { payload: {num1: 'bademail.com', num2: Infinity}, response: undefined },
     { payload: {num1: 'test@email.com', num2: 8}, response: undefined },
     { payload: {num1: false, num2: "-123456784"}, response: undefined } ] }

```As seen above, basic usage involves calling required methods (.describe() and .accepts()) and passing in required arguments to fully spec or give a basic description of the function which the fault injections would be made on. More information below.```
```
### More on usage
```js
function fxn (a, b) {
    if (typeof a == 'number' && typeof b == 'number')
    return a+b
}

var sumFunction = faultinjections.describe(fxn, 'This is a function which accepts two number arguments and returns their sum.')
                                 .accepts(2, 'num1', 'num2')
                                 .types('number', 'number')
                                 .returns('a number')

console.log(sumFunction.inject(5))
Output => { Description:
   { { function_description:
      'this is a function which accepts two number arguments and returns their sum if both argument types are numbers.',
     number_of_params: 2,
     name_of_params: 'num1 , num2',
     return_value: 'a number',
     data_types: 'number , number' },
  ChaosReport:
   [ { payload: {num1: -Infinity, num2: NaN}, response: undefined },
     { payload: {num1: 'test@email.com', num2: 4}, response: undefined },
     { payload: {num1: 9007199254740992n, num2: ''}, response: undefined },
     { payload: {num1: null, num2: {}, response: undefined },
     { payload: {num1: false, num2: true}, response: undefined } ] }

```In this example, the fault injector takes four chainable methods to provide more context on the function which the injections would be made on. Notable is the .inject() method taking a number argument to indicate the number of times injections would be made into the provided function.```
```
### Description of methods 
- **.describe()**: (required) This takes two argument, where the first is the required function to run fault injections on, while the second is an optional string text describing how the function works and what is expected.
- **.accepts()**: (required) This takes as the first argument, the number of parameters the described function takes - the number of subsequent arguments into this method depends on what is specified in the first argument. These arguments are meant to be string names to identify each argument passed into the function. NB It differs from argument types. 
- **.inject()**: (required) When fired, does the actual fault injections into the described function. It can optionally take one number argument specifying the number of times to run the injections. Default is 20 and must not be less than 1 or more than 50.
- **.types()** (optional) The types method accepts string arguments which specifies the types of parameters expected. note that the number of parameters passed in here should equal to the number of parameters as specified in the .accepts() method.
- **.returns()** (optional) This takes one single string argument which describes what the function is expected to return - either data type or a befitting description of what shoiuld be returned from the function.

### Some errors and error messages
```js
function fxn (a, b) {
    if (typeof a == 'number' && typeof b == 'number')
    return a+b
}

var sumFunction = faultinjections.describe('fxn', 'This is a function which accepts two number arguments and returns their sum.')
.accepts(2, 'num1', 'num2')
.types('number', 'number')
.returns('a number')

console.log(sumFunction.inject())
{ code: 'TYPE_ERR',
  message: 'fxn is not a function, please provide a valid function.' }

var sumFunction = faultinjections.describe(fxn, 'This is a function which accepts two number arguments and returns their sum.')
.accepts('2', 'num1', 'num2')
.types('number', 'number')
.returns('a number')

console.log(sumFunction.inject())
{ code: 'TYPE_ERR',
  message:
   'Please provide a valid number of arguments in the .accepts() method.' }

var sumFunction = faultinjections.describe(fxn, 'This is a function which accepts two number arguments and returns their sum.')
.accepts('2', 'num1', 'num2', 'num3')
.types('number', 'number')
.returns('a number')

console.log(sumFunction.inject())
{ code: 'NO_MATCH',
  message:
   'Number of provided parameter names does not match the specified number of parameters in the .accepts() method.' }

var sumFunction = faultinjections.describe(fxn, 'This is a function which accepts two number arguments and returns their sum.')
.accepts('2', 'num1', 'num2')
.types('number', 'number')
.returns('a number')

console.log(sumFunction.inject(''))
{ code: 'TYPE_ERR',
  message: 'Please provide a valid number of times to run injections.' }
```