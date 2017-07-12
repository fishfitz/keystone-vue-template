module.exports = function(asyncFunc, ...params) {
    return new Promise((resolve, reject) => {
        asyncFunc(...params, result => {
            resolve(result);
        });
    });
};
