function isNull(value) {
    return typeof value === 'undefined';
}

function extractExtensions(name) {
    const regex = /\.[a-zA-Z0-9]+/g;
    let cond = null; 
    let result = null;
    do {
        result = cond;
        cond = regex.exec(name);
    } while (cond !== null);
    return result !== null ? result[0].substring(1) : null;
}

module.exports = {
    isNull,
    extractExtensions,
};
