// const express = require('express')
// const app = express()
const {validateParams, validatefxn} = require('././helpers/helpers')
const throwinjection = require('./helpers/injector')

let faultinjections = {
    description: {}
}

faultinjections.describe = function (func, desc) {
    try {

        this.func = func
        this.desc = desc
        
        let validationError = validatefxn(func, desc)

        if (!validationError) {
            return this
        }

        return validationError
    } catch (error) {
        return {
            status: 'Failed',
            message: 'Something went wrong.',
            data: null
        }
    }
}

faultinjections.accepts = function (num, ...input) {
    this.params = input;
    this.num = num;
    if (typeof num != 'number') {
        return {
            status: 'Error',
            message: 'Specify the number of arguments the function accepts as a number.',
            data: null
        }
    }
    
    if (!this.func) {
        return {
            status: 'Error',
            message: 'Describe the function before calling this method',
            data: null
        }
    }

    if (num != input.length) {
        return {
            status: 'Error',
            message: 'Number of arguments specified does not match the number of parameters passed.',
            data: null
        }
    }
    
    let validationError = validateParams(num, ...input)
    if (!validationError) {
        return this
    }
    return validationError
}

faultinjections.returns = function (input) {
    if (typeof input != 'string') {
        return {
            status: 'Error',
            message: 'Description of what the function returns should be a string',
            data: null
        }
    }

    if (!this.func || !this.params) {
        return {
            status: 'Error',
            message: 'Describe the function and accepted parameters before calling this method',
            data: null
        }  
    }

    this.expected = input;
    return this;
}

faultinjections.inject = function (count) {
    let numOfTimes = count || 20;
    let response = []
    if (!this.func || !this.params) {
        return {
            status: 'Error',
            message: 'Describe the function and accepted parameters before calling this method',
            data: null
        }  
    } 
    
    if(count > 50 || count < 1) {
        return {
            status: 'Error',
            message: 'Fault injections cannot be done less than once or more than 50 times',
            data: null
        }
    }

    if(typeof count !== 'number') {
        return {
            status: 'Error',
            message: 'Please provide a valid number.',
            data: null
        }
    }
     
    for (let i = 0; i < numOfTimes; i++) {
        response.push(throwinjection(this.func, this.params))
    }

    this.description.function_description = this.desc || 'No description'
    this.description.number_of_params = this.num;
    this.description.name_of_params = this.params.join(' , ')
    this.description.return_value = this.expected || 'Unspecified';
    // this.description.data_types = this.types.join(' , ') || 'Not specified'

    return {
        Description: this.description,
        ChaosReport: response
    }
}

const fxnion = (a, b) => {if (typeof a == 'string')return 'true'}

// console.log(faultinjections.throwinjection(fxnion, "email"))
// console.log(faultinjections.describe(fxnion)
//                                     .accepts(2, 'email', 'password')
//                                     .returns('A number')
//                                     .inject('5'))

// const port = process.env.PORT || 1995;
// app.listen(port, ()=> {
//     console.log('Listening on ' + port)
// })
module.exports = faultinjections;