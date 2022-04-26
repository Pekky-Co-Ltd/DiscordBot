const colors = require("colors")
module.exports = {
    /**
     * 
     * @param { string } msg 
     */
    debug: (msg) => {
        if (process.env.NODE_ENV !== 'development') return;
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`DEBUG`.green}]`.gray + ` ${msg}`.white)
    },
    /**
     * 
     * @param { string } msg 
     */
    info: (msg) => {
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`INFO`.blue}]`.gray + ` ${msg}`.white)
    },
    /**
     * 
     * @param { string } msg 
     */
    warning: (msg) => {
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`WARN`.yellow}]`.gray + ` ${msg}`.white)
    },
    /**
     * 
     * @param { string } msg 
     */
    danger: (msg) => {
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`DANGER`.red}]`.gray + ` ${msg}`.white)
    },
    /**
     * 
     * @param { string } msg 
     */
    success: (msg) => {
        console.log(`[${`${createDateTime()}`.blue}]`.gray + ` [${`SUCCESS`.green}]`.gray + ` ${msg}`.white)
    }
}

function createDateTime(ts) {
    if (!ts) ts = Date.now();
    return new Date(ts).toLocaleString("th-TH");
}