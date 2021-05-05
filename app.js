const express = require('express')
const app = express()

const falseInjections = [9007199254740992n, NaN, "string injection", 12345, Infinity, -Infinity, -123456, "1239084", 2.3985, "-123456784", true, false, undefined, null, [1,2,3], [], {}, 0, '']

const testfunction = (a, b, c) => {
    if (typeof a != 'string') {
        return {
            status: 'Error',
            message: 'first param must be a string',
        }
    }
    return {
        message: 'Successful injection'
    }
}

const checkType = (fxn) => {
    if (typeof fxn == 'function') {
        return true
    } 
}

const checkParams = (fxn, ...params) => {
    let type = checkType(fxn)

    for (let i = 0; i < params.length; i++) {
        if (typeof params[i] != 'string') {
            throw new Error ('Specify all parameters as strings')
        }
    }

    if (!type) {
        throw new Error ('Not a function - The first argument must be a function')
    }
 
    if (params.length) {
        return params.length
    } else {
        throw new Error ('No parameter(s) specified - how I wan take run false injections?')
    }
}

const generateRandomInjections = (...params) => {
    let arr = []
    for (let i = 0; i<params.length; i ++) {
        arr.push(falseInjections[Math.floor(Math.random() * falseInjections.length)])
    }
    return arr;
}

const throwInjections = (fxn, ...params) => {
    let payloadObj = {}
    let responseObj = {}
    let injections;
    try {
        const passedArgs = checkParams(fxn, ...params)
        if (typeof passedArgs != 'number') {
            throw new Error(passedArgs)
        }
        injections = generateRandomInjections(...params)
       
        //Format payload & response
        for (let i = 0; i < params.length; i++) {
            payloadObj[params[i]] = injections[i]
        }
        responseObj = fxn(...injections)
        return {
            payload: payloadObj,
            response: responseObj
        }
    } catch (e) {
        return {
            status: 'Error',
            message: e.message,
        }
    }
}

console.log(throwInjections(testfunction, "email", "phone"))


const port = process.env.PORT || 1995;
app.listen(port, ()=> {
    console.log('Listening on ' + port)
})