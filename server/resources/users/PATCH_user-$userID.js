const fs = require('fs');
const keystone = require('keystone');
const checkMail = require('./GET_user-check-email-$email');
const checkUserName = require('./GET_user-check-name-$name');

module.exports = async function({userID, name, password, passwordConfirm, email, description, avatar}, user) {
    keystone.isAuth(user);

    if (user.slug !== userID && !user.canAccessKeystone) {
        throw new Error('You don\'t have the right for that.');
    }

    const requestedUser = await keystone.request('User', userID);

    if (email !== undefined) {
        checkMail({email, shouldError: true});
        requestedUser.email = email;
    }

    if (name !== undefined) {
        checkUserName({name, shouldError: true});
        requestedUser.name = name;
    }

    if (password !== undefined) {
        keystone.truthy({password});

        if (password !== passwordConfirm) {
            throw new Error('Password do not match.');
        }
        requestedUser.password = password;
    }

    if (description !== undefined) {
        requestedUser.description.md = description;
    }

    if (avatar !== undefined) {
        if (requestedUser.avatar) {
            fs.unlink('upload/avatars/' + requestedUser.avatar.filename, () => {});
        }
        await keystone.cbToPromise(requestedUser._.avatar.upload, avatar);
    }

    const updatedUser = await requestedUser.save();

    return keystone.format(updatedUser);
};
