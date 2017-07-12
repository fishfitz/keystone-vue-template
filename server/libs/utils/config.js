const keystone = require('keystone');

module.exports = async function(adminAction = false) {
    const config = await keystone.list('Config').model.findOne({
        isActive: true
    }).exec();

    if (!config && !adminAction) {
        throw new Error('No active config find! Contact an administrator.');
    }

    return config;
};
