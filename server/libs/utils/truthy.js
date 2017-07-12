module.exports = function(params) {
    Object.entries(params).forEach(([key, value]) => {
        if (!value) {
            throw new Error(key + ' should not be falsy.');
        }
    });
};
