module.exports = function(user) {
    if (!user || !user._id) {
        throw new Error('You must be signed in.');
    }
};
