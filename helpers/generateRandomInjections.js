const faultInjections = require('../fault-injections/args')

const generateRandomInjections = (...params) => {
    let arr = []
    for (let item of params) {
        arr.push(faultInjections[Math.floor(Math.random() * faultInjections.length)])
    }
    return arr;
}

module.exports = generateRandomInjections;