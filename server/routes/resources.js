const fs = require('fs');

global.api_resources = {};
const loadResource = function({app, name, handler, method, httpPath}) {
    global.api_resources[name.replace('.js', '')] = handler;

    app[method]('/api/' + httpPath, (req, res) => {
        handler({
            ...req.params,
            ...req.query,
            ...req.body,
            ...req.files
        }, req.user, {req, res}).then((data, successCode = 200) => {
            res.status(successCode).send(data);
        }).catch((err, errCode = 400) => {
            console.error(err);
            res.status(errCode).send(err.message);
        });
    });
};

module.exports = function(app) {
    fs.readdirSync('./resources/').forEach(folder => {
        fs.readdirSync('./resources/' + folder).forEach(name => {
            loadResource({
                app,
                name,
                handler: require(`../resources/${folder}/${name}`),
                method: name.split('_')[0]
                    .toLowerCase(),
                httpPath: name.split('_')[1]
                    .replace(/-/g, '/')
                    .replace(/\$/g, ':')
                    .replace(/!/g, '?')
                    .replace(/\.js/, '')
            });
        });
    });
};
