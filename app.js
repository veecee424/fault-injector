const express = require('express')
const app = express()

const falseInjections = [9007199254740992n, NaN, "string injection", 12345, Infinity, -Infinity, -123456, "1239084", 2.3985, "-123456784", true, false, undefined, null, [1,2,3], [], {}, 0, '']

const testfunction = (a, b, c) => {
    if (typeof a != 'number') {
        return 'Not a number'
    }
    return `${a}, ${b}, ${c}`
}

const inputPayloadDescription = (...params) => {
    // console.log(params)
    return params
}

// inputPayloadDescription('email', 'password')

const checkType = (fxn, numOfParams) => {
    if (typeof fxn == 'function') {
        return fxn
    } else {
        return false
    }
}

const checkParams = (fxn, numOfParams) => {
    let type = checkType(fxn)
    if (!type) {
        return 'Not a function'
    }

    if (numOfParams && typeof numOfParams == 'number') {
        return numOfParams
    } else {
        return 'No parameter(s) passed'
    }
}

const generateRandomInjections = (numOfParams) => {
    let arr = []
    for (let i = 0; i<numOfParams; i ++) {
        arr.push(falseInjections[Math.floor(Math.random() * falseInjections.length)])
    }
    return arr;
}

const throwInjections = (fxn, numOfParams) => {
    let payloadObj = {}
    let injections;
    try {
        const passedArgs = checkParams(fxn, numOfParams)
        if (typeof passedArgs != 'number') {
            throw new Error(passedArgs)
        }
        injections = generateRandomInjections(passedArgs)
        // for (let i = 0; i < falseInjections.length; i++) {
        //     injections = generateRandomInjections(passedArgs)
        //     response.push(fxn(...injections))
        //     payload.push(injections)
        // }
        // console.log(injections)
        //Format payload
        let payloadDescription = inputPayloadDescription('id', 'email')
        for (let i = 0; i < payloadDescription.length; i++) {
            payloadObj[payloadDescription[i]] = injections[i]
        }
        console.log(payloadObj) 
        return injections
    } catch (e) {
        console.log(e)
    }
}

throwInjections(testfunction, 2)


// const loopAndThrow = (fxn, numOfParams) => {
//     let injections;
//     let payload = []
//     let response = []
//     for (let i = 0; i < falseInjections.length; i++) {
//         injections = throwInjections(testfunction, numOfParams)
//         response.push(i, fxn(...injections))
//         payload.push(i, injections.join(' , '))
//     }
//     console.log(injections)
//     // console.log(response, 'Response-----------')
//     // console.log(payload, '---------------')
// }

// loopAndThrow(testfunction, 3)




// const test = (fxn, ...pars) => {
//     pars = [1,2,3,4,5]
//     console.log(pars)
// }

// test('sth', 1,2,3,4,)

const port = process.env.PORT || 1995;
app.listen(port, ()=> {
    console.log('Listening on ' + port)
})