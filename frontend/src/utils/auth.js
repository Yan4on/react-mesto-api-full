export const BASE_URL = 'https://api.yan4on.students.nomoredomains.icu';
// export const BASE_URL = 'http://localhost:3000';
const checkRes = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
        .then(checkRes);
};
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
        .then(checkRes)
};

//получаем токен
export const getToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(checkRes);
}

export const logout = () => {
    return fetch(`${BASE_URL}/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(checkRes);
} 