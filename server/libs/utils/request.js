const keystone = require('keystone');

function buildPopulate(request, populate) {
    let populatedRequest = request;
    if (typeof populate === 'object') {
        Object.entries(populate).forEach(([path, select]) => {
            populatedRequest = populatedRequest.populate({path, select});
        });
    }
    else if (populate) {
        populatedRequest = populatedRequest.populate(populate);
    }
    return populatedRequest;
}

async function requestOne(model, slug, path, populate) {
    const item = await (buildPopulate(keystone.list(model).model.findOne({
        [path]: slug
    }), populate)).exec();
    if (!item) {
        throw new Error(`No ${model} with the ${path} ${slug} found.`);
    }
    return item;
}

async function requestMultiple(model, slugs, path, populate) {
    return (buildPopulate(keystone.list(model).model.find()
        .where(path).in(slugs), populate)).exec();
}

module.exports = async function(model, slug, {path = 'slug', populate} = {path: 'slug'}) {
    if (Array.isArray(slug)) {
        return await requestMultiple(model, slug, path, populate);
    }
    else {
        return await requestOne(model, slug, path, populate);
    }
};
