const faultInjections = require('../fault-injections/faultInjections')

function validateParams (func, params, desc, num, return_val, count, type) {

    if (type && type.length !== num) {
        return {
            code: 'NO_MATCH',
            message: 'Number of provided datatypes does not match the specified number of parameters the function can take.'
        }
    }

    if (type) {
        for (let i = 0; i < type.length; i++) {
            if (type.length && typeof type[i] != 'string') {
                return {
                    code: 'TYPE_ERR',
                    message: `${params[i]} is not a string - specify all data types as strings.`,
                }
            }
        }
    }
    
    if(typeof count === 'number' && count < 1 || count > 50) {
        return {
            code: 'LIMIT_ERR',
            message: 'Fault injections cannot be done less than once or more than 50 times.'
        }
    }
    
    if(count && typeof count !== 'number' || count === '') {
        return {
            code: 'TYPE_ERR',
            message: `Please provide a valid number of times to run injections.`
        }
    }

    if (num && typeof num !== 'number') {
        return {
            code: 'TYPE_ERR',
            message: `Please provide a valid number of arguments in the .accepts() method.`
        }
    }

    if (return_val && typeof return_val != 'string') {
        return {
            code: 'TYPE_ERR',
            message: 'Description of what the function returns should be a string'
        }
    }

    if(!num) {
        return {
            code: 'NOT_EXIST',
            message: 'Number of arguments is required in the .accepts method eg .accepts(2)'
        }
    }

    if (num !== params.length) {
        return {
            code: 'NO_MATCH',
            message: 'Number of provided parameter names does not match the specified number of parameters in the .accepts() method.'
        }
    }

    if (desc && typeof desc !== 'string') {
        return {
            code: 'TYPE_ERR', 
            message: `Function description must be a string.`
        }
    }
    
    if (!func) {
        return {
            code: 'NOT_EXIST', 
            message: 'Describe the function to run chaos injections on in the .describe() method.'
        }
    }

    if (func && typeof func !== 'function') {
        return {
            code: 'TYPE_ERR', 
            message: `${func} is not a function, please provide a valid function.`
        }
    }
    
    
    if (!params.length) {
        return {
            code: 'NOT_EXIST',
            message: 'No function parameter(s) specified in the .accepts() method.',
        }
    }

    for (let i = 0; i < params.length; i++) {
        if (params.length && typeof params[i] != 'string') {
            return {
                code: 'TYPE_ERR',
                message: `${params[i]} is not a string - specify all function parameter names as strings.`,
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
    validateParams, generateRandomInjections
}