module.exports = function(asyncFunc, ...params) {
    return new Promise((resolve, reject) => {
        asyncFunc(...params, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
};
