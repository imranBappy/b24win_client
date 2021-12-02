const regEx = /^\+?(88)?0?1[3456789][0-9]{8}\b/g
const validateNumber = number => regEx.test(number)
module.exports = validateNumber ;