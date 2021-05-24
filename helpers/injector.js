const {generateRandomInjections} = require('./helpers')

function throwinjection (fxn, params) {
    let payloadObj = {}
    let responseObj = {}
    let injections;
    try {
        // Generate random injections/arguments
        injections = generateRandomInjections(...params)

        // Loop through params and injections/arguments and use them to create a payload format
        for (let i = 0; i < params.length; i++) {
            payloadObj[params[i]] = injections[i]
        }
        // Format response payload
        responseObj = fxn(...injections)
        return {
            payload: payloadObj,
            response: responseObj
        }
    } catch (e) {
        return {
            status: 'Failed',
            message: e.message,
            data: null
        }
    }
}

module.exports = throwinjection;