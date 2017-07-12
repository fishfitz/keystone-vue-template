import request from 'request-api'; // Aliased by webpack based on the build

export default function(options) {
    return request(options);
}
