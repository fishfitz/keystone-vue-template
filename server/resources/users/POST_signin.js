const keystone = require('keystone');
const utils = require('keystone-utils');

module.exports = async function({name, password}, _, {req, res}) {
    keystone.truthy({name, password});
    const nameRegex = new RegExp('^' + utils.escapeRegExp(name) + '$', 'i');
    const user = await keystone.request('User', nameRegex, {path: 'name'});
    await keystone.cbToPromise(keystone.callHook.bind(keystone), user, 'pre:signin');
    const passwordCorrect = await keystone.cbToPromise(user._.password.compare, password);
    if (!passwordCorrect) {
        throw new Error('Wrong password.');
    }
    await keystone.cbToPromiseNoErr(keystone.session.signinWithUser, user, req, res);
    await keystone.cbToPromise(keystone.callHook.bind(keystone), user, 'post:signin');
    return keystone.format(user);
};
