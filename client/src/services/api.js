const authorizationHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user') || "{}");
    if (userData.accessToken) {
        return {'Authorization': `Bearer ${userData.accessToken}`}
    } else {
        return {}
    }
};

const json = (response) => {
    if (response.ok) return response.json()
    return response.json().then(Promise.reject.bind(Promise))
};

class API {
    get(path, headers = {}) {
        return fetch(`/api/${path}`, {
            headers: {...authorizationHeader(), ...headers}
        }).then(json)
    }

    post(path, body, headers = {}) {
        return fetch(`/api/${path}`, {
            method: 'POST',
            headers: {...authorizationHeader(), 'Content-Type': 'application/json', ...headers},
            body: JSON.stringify(body)
        }).then(json)
    }

    patch(path, body, headers = {}) {
        return fetch(`/api/${path}`, {
            method: 'PATCH',
            headers: {...authorizationHeader(), 'Content-Type': 'application/json', ...headers},
            body: JSON.stringify(body)
        }).then(json)
    }
}

export default new API();
