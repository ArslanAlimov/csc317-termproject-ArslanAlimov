// color code text 

const colors = require('colors');


colors.setTheme({
    error: ['black', 'bgRed'],
    success: ['black', 'bgGreen'],
    request: ['black', 'bgWhite']

})

// assign functions as properties of this object
const printers = {
    errorPrint: (message) => {
            console.log(colors.error(message));
    },

    successPrint: (message) => {
        console.log(colors.success(message));
    },

    requestPrint: (message) => {
        console.log(colors.request(message));
    },
}

module.exports = printers;