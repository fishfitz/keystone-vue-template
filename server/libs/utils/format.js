function format(item, overwrite = {}) {
    if (item.toObject) {
        item = item.toObject();
    }

    Object.entries(item).forEach(([key, value]) => {
        if (value.filename) {
            item[key] = `/${key}s/${value.filename}`;
        }
        else if (Array.isArray(value) && value.length && value[0]._id) {
            item[key] = value.map(format);
        }
        else if (value._id) {
            item[key] = format(value);
        }
    });

    return {
        ...item,
        __v: undefined,
        password: undefined,
        email: undefined,
        ...overwrite
    };
}

module.exports = function(item, overwrite) {
    if (Array.isArray(item)) {
        return item.map(i => format(i, overwrite));
    }
    return format(item, overwrite);
};
