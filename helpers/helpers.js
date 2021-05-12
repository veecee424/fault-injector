const faultInjections = require('../fault-injections/faultInjections')

function checkParams (fxn, ...params) {
     if (!fxn) {
            return {
                status: 'Failed',
                message: 'No function specified to run tests on.',
                data: null
            }
        }

        if (fxn && typeof fxn !== 'function') {
            return {
                status: 'Failed',
                message: `${fxn} is not a function - please provide a valid function.`,
                data: null
            }
        }
        
        if (!params.length) {
            return {
                status: 'Failed',
                message: 'No function parameter(s) specified.',
                data: null
            }
        }

        for (let i = 0; i < params.length; i++) {
            if (params[i] && typeof params[i] != 'string') {
                return {
                    status: 'Failed',
                    message: `${params[i]} is not a string - specify all function parameters as strings`,
                    data: null
                }
            }
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
    checkParams, generateRandomInjections
}