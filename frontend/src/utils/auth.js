export const BASE_URL = 'https://api.mesto.andreym.nomoredomains.sbs'

const checkResponce = (res) => {
    if (res.ok){
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`)
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({password, email})
    }).then(checkResponce)
}

export const autorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({password, email})
    }).then(checkResponce)
}

export const getToken = () => {
    return fetch(`${BASE_URL}/users/me`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }
    }).then(checkResponce)
}