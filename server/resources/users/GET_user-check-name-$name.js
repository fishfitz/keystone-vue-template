const keystone = require('keystone');
const utils = require('keystone-utils');

module.exports = async function({name, shouldError = false}) {
    keystone.truthy({name});

    const user = await keystone.list('User').model.findOne({
        slug: utils.slug(name)
    }).exec();

    if (user) {
        if (shouldError) {
            throw new Error('Username already exist');
        }
        else {
            return { valid: false };
        }
    }

    return { valid: true };
};
