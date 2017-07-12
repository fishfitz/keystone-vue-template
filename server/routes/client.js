const keystone = require('keystone');
const path = require('path');
const fs = require('fs');
const vueSSR = require('vue-server-renderer');
const routes = ['/', '/user/:userID'];

function createRenderer() {
    return vueSSR.createBundleRenderer(require('../client/bundle.json'), {
        template: fs.readFileSync('./client/template.html', 'utf-8'),
        basedir: './client',
        runInNewContext: false
    });
}

const cachedRenderer = createRenderer();
const getRenderer = process.env.NODE_ENV === 'development' ? () => {
    delete require.cache[path.join(__dirname, '../client/bundle.json')];
    return createRenderer();
} : () => cachedRenderer;

function stopListen(stream) {
    stream.removeAllListeners('data')
        .removeAllListeners('error')
        .removeAllListeners('end');
}

module.exports = function(app) {
    app.get(routes, (req, res) => {
        const renderer = getRenderer();
        let stream;
        try {
            stream = renderer.renderToStream({
                url: req.originalUrl,
                activeUser: req.user ? keystone.format(req.user, {
                    posts: req.user.posts.length,
                    favorites: req.user.favorites.length
                }) : false
            });

            stream.on('error', err => {
                console.log(err);
                stopListen(stream);
                res.end(String(err));
            });

            stream.on('data', data => res.write(data));

            stream.on('end', () => {
                stopListen(stream);
                res.end();
            });
        }
        catch (err) {
            console.log(err);
            stopListen(stream);
            res.end(String(err));
        }
    });
};
