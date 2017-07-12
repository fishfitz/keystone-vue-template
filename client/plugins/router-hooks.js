export default function(router, store) {
    if (typeof window !== 'undefined') {
        router.beforeEach((to, from, next) => {
            window.document.body.style.cursor = 'wait';
            next();
        });

        router.afterEach(() => {
            window.document.body.style.cursor = '';
        });

        router.beforeResolve((to, from, next) => {
            const reRender = !Object.keys(to.params).length ||
                !Object.keys(from.params).length ||
                Object.keys(to.params).some(i => i !== 'reference' && to.params[i] !== from.params[i]);

            if (!reRender) {
                return next();
            }

            const asyncDataHooks = router.getMatchedComponents(to)
                .map(c => c.asyncData).filter(_ => _);
            if (!asyncDataHooks.length) {
                return next();
            }

            Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
                .then(next)
                .catch(next);
        });
    }
}
