// const express = require('express')
// const app = express()
const {checkParams, generateRandomInjections} = require('././helpers/helpers')

let faultinjections = {
    params: null,
    func: null,

    parameters: function (func, ...input) {
        try {
            this.params = input
            this.func = func
            let validationError = checkParams(func, ...input)
            if (!validationError) {
                return {
                    params: this.params,
                    func: this.func,
                    runmultiple: this.runmultiple,
                    throwinjection: this.throwinjection
                }
            }
            return validationError
        } catch (error) {
            return {
                status: 'Failed',
                message: 'Something went wrong.',
                data: null
            }
        }
    },

    runmultiple: function (numOfTimes) {
        let response = []

        if (numOfTimes < 2 || numOfTimes > 5) {
            return {
                status: 'Failed',
                message: 'Cannot be run less than twice or more than 5 times.',
                data: null
            }
        }

        if (!numOfTimes) {
            return {
                status: 'Failed',
                message: 'Specify how many times you want this test to run.',
                data: null
            }
        }

        for (let i = 0; i < numOfTimes; i++) {
            response.push(this.throwinjection(this.func, this.params))
        }
        
        return response
    },

    throwinjection: function (fxn, ...params) {
        fxn = this.func
        params = this.params
        let payloadObj = {}
        let responseObj = {}
        let injections;
        try {
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
            // console.log(e)
            return {
                status: 'Failed',
                message: e.message,
                data: null
            }
        }
    }
}

// const fxnion = (a, b) => {if (typeof a == 'string')return 'true'}

// console.log(faultinjections.throwinjection(fxnion, "email"))
// console.log(faultinjections.parameters(fxnion, "email", "id").runmultiple(5))

// const port = process.env.PORT || 1995;
// app.listen(port, ()=> {
//     console.log('Listening on ' + port)
// })
module.exports = faultinjections;