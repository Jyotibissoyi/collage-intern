const validValue = function (value) {
    if (typeof value === 'undefined' || value === null) {
        return false
    }
    if (typeof value === 'string' && value.trim().length === 0) {
        return false
    } else {
        return true
    }
}

function checkName(value) {
    const name = /^[a-zA-Z( \)]{2,50}$/
    return name.test(value)
}

function checkEmail(email) {
    const RegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,5})*$/
    return RegexEmail.test(email)
}

function mobileNum(value) {
    const name = /^[0-9]{10}$/
    return name.test(value)
}

function checkUrl(url) {
    const regexLink = /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
    return regexLink.test(url)
}

function strLower(x) {
    return x == x.toLowerCase() ? true : false
}


module.exports = { checkName, checkEmail, checkUrl, mobileNum, validValue, strLower }