const keystone = require('keystone');

module.exports = async function() {
    const config = await keystone.config();
    return keystone.format(config, {
        name: undefined,
        _id: undefined,
        isActive: undefined
    });
};
