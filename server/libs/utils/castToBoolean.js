module.exports = function(...args) {
    return args.map(a => {
        return !!a && a !== 'false';
    });
};
