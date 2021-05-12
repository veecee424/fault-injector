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
* Specify the number of times you want the destructive tests to be run for different test cases and instances

Installation
=======
```
npm install fault-injector
```
Basic usage
======
```
const faultInjector = require('fault-injector')

const fxn = (a, b) => {
    if (typeof a == 'string')return 'true'
}

faultInjector.parameters(fxn, "email", "id").throwinjection() 
// where a = email and b = id
// Output => { 
    payload: { email: true, id: {} }, 
    response: undefined 
}

faultInjector.parameters(fxn, "username", "password").throwinjection()
// Runs destructive test just once
// where a = username, b = password
// Output => { 
    payload: { username: NaN, password: 9007199254740992n }, 
    response: undefined 
}

faultInjector.parameters(fxn, "email", "id").runmultiple(5) 
// Runs destructive test multiple (5) times
// where a = email, b = id
// Output => [ 
    { 
        payload: { email: NaN, id: 'string injection' },
        response: undefined 
    },
    { 
        payload: { email: 'string injection', id: NaN },
        response: 'true' 
    },
    { 
        payload: { email: [Array], id: {} }, 
        response: undefined 
    },
    { 
        payload: { email: undefined, id: '-123456784' },
        response: undefined 
    },
    { 
        payload: { email: -123456, id: '1239084' },
        response: undefined 
    } 
]

faultInjector.parameters(fxn, "email", "id").runmultiple()
// Throws an error if a number argument isn't passed to the runmultiple method
// Output => { 
    status: 'Failed',
    message: 'Specify how many times you want this test to run.',
    data: null 
}

faultInjector.parameters(fxn, "email", "id").runmultiple(1)
// Throws an error if number argument is less than 2
// Output => { 
    status: 'Failed',
    message: 'Cannot be run less than twice or more than 5 times.',
    data: null 
}

faultInjector.parameters(fxn, "email", "id").runmultiple(6)
// Throws an error if number argument is greater than 6
// Output => { 
    status: 'Failed',
    message: 'Cannot be run less than twice or more than 5 times.',
    data: null 
}

faultInjector.parameters('fxn', "email", "id") 
// Throws an error if first argument type is not a function
// Output => { 
    status: 'Failed', 
    message: 'fxn is not a function - please provide a valid function.', 
    data: null 
}

faultInjector.parameters(fxn, 5, "id") 
// Throws an error because all function parameters must be passed as strings
// Output =>  { 
    status: 'Failed', 
    message: '5 is not a string - specify all function parameters as strings', 
    data: null 
}

faultInjector.parameters(fxn) 
// Throws an error when function (to run destructive tests on) parameters isn't passed
// Output => { 
    status: 'Failed', 
    message: 'No function parameter(s) specified.', 
    data: null 
}

faultInjector.parameters() 
// Error when a function isn't passed as the first argument to the .parameter() method
// Output => { 
    status: 'Failed',
    message: 'No function specified to run tests on.', 
    data: null 
}

```
