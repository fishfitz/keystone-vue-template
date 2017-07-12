const keystone = require('keystone');

exports = module.exports = async function(done) {
    try {
        await (new (keystone.list('User')).model({
            name: keystone.serverConfig.ADMIN_NAME,
            email: keystone.serverConfig.ADMIN_EMAIL,
            password: keystone.serverConfig.ADMIN_PASSWORD,
            canAccessKeystone: true
        })).save();

        await (new (keystone.list('Config')).model({
            name: 'Default',
            isActive: true
        })).save();

        done();
    }
    catch (e) {
        console.error(e);
    }
};
