const keystone = require('keystone');

module.exports = async function({email, shouldError = false}) {
    keystone.truthy({email});

    const user = await keystone.list('User').model.findOne({
        email: email.toLowerCase()
    }).exec();

    if (user) {
        if (shouldError) {
            throw new Error('Email already exist');
        }
        else {
            return { valid: false };
        }
    }

    return { valid: true };
};
