const faultInjections = require('../fault-injections/faultInjections')
const checkType = require('../validators/checkType')

const checkParams = (fxn, ...params) => {
    let type = checkType(fxn)

    for (let i = 0; i < params.length; i++) {
        if (typeof params[i] != 'string') {
            throw new Error ('Specify all parameters as strings')
        }
    }

    if (!type) {
        throw new Error ('Not a function - The first argument must be a valid function')
    }
 
    if (params.length) {
        return params.length
    } else {
        throw new Error ('No function parameter(s) specified.')
    }
}

const generateRandomInjections = (...params) => {
    let arr = []
    for (let i = 0; i<params.length; i ++) {
        arr.push(faultInjections[Math.floor(Math.random() * faultInjections.length)])
    }
    return arr;
}


module.exports = {
    checkType, checkParams, generateRandomInjections
}