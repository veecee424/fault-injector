// const express = require('express')
// const app = express()
const {checkParams, generateRandomInjections} = require('././helpers/helpers')

let faultinjections = {}
faultinjections.throwinjections = (fxn, ...params) => {
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
            status: 'Failed',
            message: e.message,
            data: null
        }
    }
}


// const port = process.env.PORT || 1995;
// app.listen(port, ()=> {
//     console.log('Listening on ' + port)
// })
module.exports = faultinjections;