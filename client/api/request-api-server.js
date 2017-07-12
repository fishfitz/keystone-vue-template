export default function({path, params, data}) {
    return global.api_resources[path](Object.assign({}, params, data));
}
