const checkType = (fxn) => {
    if (fxn && typeof fxn == 'function') {
        return true
    } 
    if (!fxn) {
        throw new Error('Please provide a valid function to run tests on')
    }
}

module.exports = checkType