Table of contents
=======
1. About
2. Features
3. Installation
4. Basic usage

About
=======
Fault-injector is a tiny lightweight package which runs destructive test cases on a provided function as many times as possible. It's easy and simple to use.

Features
=======
* Run destructive test cases on a provided function given some parameters
* Specify the number of times you want the destructive tests to be run for different test cases and instances (in view)

Installation
=======
```
npm install fault-injector
```
Basic usage
======
```
const faultInjector = require('fault-injector')

const fxn = function (a, b) {if (typeof a == 'string')return 'true'}

faultInjector.throwinjections(fxn, "email", "id") // { payload: { email: true, id: {} }, response: undefined }

faultInjector.throwinjections(fxn, "username", "password") // { payload: { username: NaN, password: 9007199254740992n }, response: undefined }

faultInjector.throwinjections('fxn', "email", "id") // { status: 'Failed', message: 'Not a function - The first argument must be a valid function', data: null }

faultInjector.throwinjections(fxn, 5, "id") // { status: 'Failed', message: 'Specify all parameters as strings', data: null }

faultInjector.throwinjections(fxn) // { status: 'Failed', message: 'No function parameter(s) specified.', data: null }

faultInjector.throwinjections() // { status: 'Failed',message: 'Please provide a valid function to run tests on', data: null }

```
