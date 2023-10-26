
const isAvailable = param => {

    return param !== null && param !== undefined

}

const dumpError = (err) => {

    if (typeof err === 'object') {

        let returnStr = "";

        if (err.message) {

            returnStr += '\n<br/>Message: ' + err.message;

        }

        if (err.stack) {

            returnStr += '\n<br/>Stacktrace:';

            returnStr += '\n<br/>====================\n<br/>';

            returnStr += err.stack;

        }

        console.log(returnStr);

        return returnStr;

    } else {

        console.log('dumpError :: argument is not an object');

    }
}

const retnum = (str) => {

    let num = str.replace(/[^0-9]/g, '')

    return parseInt(num,10)

}

module.exports = { isAvailable, dumpError, retnum }
