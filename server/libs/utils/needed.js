module.exports = function(params) {
    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined) {
            throw new Error(key + ' must be provided.');
        }
    });
};
