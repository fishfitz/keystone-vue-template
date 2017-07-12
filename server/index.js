const keystone = require('keystone');
const fs = require('fs');
keystone.serverConfig = require('../config');

process.chdir(__dirname);

keystone.init({
    name: keystone.serverConfig.NAME,
    static: ['public', 'upload'],
    'auto update': true,
    session: true,
    'session store': 'mongo',
    auth: true,
    'user model': 'User',
    'signin redirect': '/',
    'signout redirect': '/',
    'cookie secret': keystone.serverConfig.COOKIE_SECRET,
    mongo: keystone.serverConfig.MONGO,
    port: keystone.serverConfig.PORT,
    host: keystone.serverConfig.HOST,
    env: process.env.NODE_ENV
});

fs.readdirSync('./models').forEach(m => {
    require('./models/' + m);
});

fs.readdirSync('./libs/utils').forEach(u => {
    keystone[u.replace('.js', '')] = require('./libs/utils/' + u);
});

keystone.set('routes', require('./routes'));

keystone.start();
