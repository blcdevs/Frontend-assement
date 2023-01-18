const BASE_URL = 'http://ip172-18-0-90-cf3of9791rrg00ai3290-3232.direct.labs.play-with-docker.com';
export function getCurrencies () {
    return fetch(`${BASE_URL}/currencies`, {
        method: 'GET'
    });
}

export function getSymbols () {
    return fetch(`${BASE_URL}/symbols`, {
        method: 'GET'
    });
}

export function getExchanges () {
    return fetch(`${BASE_URL}/exchanges`, {
        method: 'GET'
    });
}

export function saveExchange (payload) {
    return fetch(`${BASE_URL}/exchanges`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
