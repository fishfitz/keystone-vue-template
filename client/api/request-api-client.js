import axios from 'axios';

export default function({path, params, data, config}) {
    let [method, url] = path.split('_');
    method = method.toLowerCase();
    url = '/api/' + url.replace(/-/g, '/');

    if (params) {
        Object.entries(params).forEach(([name, value]) => {
            url = url.replace('$' + name, value);
        });
    }

    if (method === 'get') {
        return new Promise((resolve, reject) => {
            axios({method, url, config, params: data})
                .then(({data}) => resolve(data))
                .catch(err => reject(err));
        });
    }
    else {
        return new Promise((resolve, reject) => {
            axios({method, url, data, config})
                .then(({data}) => resolve(data))
                .catch(err => reject(err));
        });
    }
}
