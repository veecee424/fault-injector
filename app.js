const {validateParams} = require('././helpers/helpers')
const throwinjection = require('./helpers/injector')

let faultinjections = {
    description: {}
}

faultinjections.describe = function (func, desc) {
    this.func = func
    this.desc = desc
    return this
}

faultinjections.accepts = function (num, ...input) {
    this.params = input;
    this.num = num;
    delete this.describe;
    return this
}

faultinjections.returns = function (return_val) {
    this.return_value = return_val;
    delete this.describe;
    delete this.accepts;
    return this;
}

faultinjections.types = function (...type) {
    this.type = type
    delete this.describe;
    delete this.accepts;
    return this
}

faultinjections.inject = function (count) {
    let numOfTimes = count || 20;
    let response = []
   
    const validationError = validateParams(this.func, this.params, this.desc, this.num, this.return_value, count, this.type)
    if (validationError) {
        return validationError;
    }
     
    for (let i = 0; i < numOfTimes; i++) {
        response.push(throwinjection(this.func, this.params))
    }

    this.description.function_description = this.desc || 'No description';
    this.description.number_of_params = this.num;
    this.description.name_of_params = this.params.map((x)=> {return x.toLowerCase()}).join(' , ')
    this.description.return_value = this.return_value || 'Return value not specified';
    this.description.data_types = 'Data types not specified'

    // Format data info to lowercase
    if (this.type) {
        this.description.data_types = this.type.map((x)=> {return x.toLowerCase()}).join(' , ');
    }

    if (this.desc) {
        this.description.function_description = this.desc.toLowerCase()
    }

    if (this.return_value) {
        this.description.return_value = this.return_value.toLowerCase()
    }

    return {
        Description: this.description,
        ChaosReport: response
    }
}

module.exports = faultinjections;