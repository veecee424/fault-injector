const faultInjections = [9007199254740992n, NaN, "string injection", 12345, Infinity, -Infinity, -123456, "1239084", 2.3985, "-123456784", true, false, undefined, null, [1,2,3], [], {}, 0, '']

module.exports = faultInjections;