module.exports = function(...args) {
    return args.map(a => {
        if (typeof a === 'string') {
            const parsedArray = JSON.parse(a);
            if (!Array.isArray(parsedArray)) {
                throw new Error('One argument is not a valid array.');
            }
            return parsedArray;
        }
        else if (Array.isArray(a)) {
            return a;
        }
        else {
            throw new Error('One argument is not a valid array.');
        }
    });
};
