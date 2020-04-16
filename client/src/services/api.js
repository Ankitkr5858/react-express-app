// import config from 'config';

const authorizationHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user') || "{}");
    return {'Authorization': `Bearer ${userData.accessToken}`}
};

const json = (response) => {
    if (response.ok) return response.json()
    return response.json().then(Promise.reject.bind(Promise))
};

class API {
    constructor(uri) {
        this.uri = uri
    }

    get(path, headers = {}) {
        return fetch(`${this.uri}/${path}`, {
            headers: {...authorizationHeader(), ...headers}
        }).then(json)
    }

    post(path, body, headers = {}) {
        return fetch(`${this.uri}/${path}`, {
            method: 'POST',
            headers: {...authorizationHeader(), 'Content-Type': 'application/json', ...headers},
            body: JSON.stringify(body)
        }).then(json)
    }

    patch(path, body, headers = {}) {
        return fetch(`${this.uri}/${path}`, {
            method: 'PATCH',
            headers: {...authorizationHeader(), 'Content-Type': 'application/json', ...headers},
            body: JSON.stringify(body)
        }).then(json)
    }
}

//export default new API(config.get('apiHost'));
export default new API('http://localhost:3000');
