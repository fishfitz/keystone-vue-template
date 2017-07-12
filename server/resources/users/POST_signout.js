const keystone = require('keystone');

module.exports = async function(_, user, {req, res}) {
    await keystone.cbToPromise(keystone.callHook.bind(keystone), user, 'pre:signout');
    res.clearCookie('keystone.uid');
    req.user = null;
    await keystone.cbToPromise(req.session.regenerate.bind(req.session));
    await keystone.cbToPromise(keystone.callHook.bind(keystone), user, 'post:signout');
    return {};
};
