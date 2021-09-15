const faultInjections = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    9007199254740992n, 
    'bademail.com',
    NaN, 
    "string injection", 
    12345, 
    Infinity, 
    -Infinity, 
    -123456, 
    "1239084", 
    2.3985, 
    "-123456784", 
    true, 
    false, 
    undefined, 
    null, 
    [1,2,3], 
    [], 
    {}, 
    0, 
    JSON.stringify({age: 24, gender: "male"}),
    '',
    {name: 'vee', age: 12},
    ['a', 'b', 'c'],
    'test@email.com',
    '!@#$%',
    'alphalowercasepassword',
    'ALPHAUPPERCASEPASSWORD',
    'alphanumlowercase123',
    'ALPHANUMUPPERCASE123',
    'mixedCase+Symbol&num123',
    'mixedCaseNoSymbolAndNum'
]

module.exports = faultInjections;