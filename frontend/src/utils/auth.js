// export const BASE_URL = 'https://api.yan4on.students.nomoredomains.icu';
export const BASE_URL = 'http://localhost:3000';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        // credentials: 'include',
    })
        .then(res => {
            if (res.ok) { return res.json(); }
            return Promise.reject(new Error(`Ошибка: ${res.status}`)); // если ошибка при запросе, переходим к catch
        });
};
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        // credentials: 'include',
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
};

export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        // credentials: 'include',
    })
        .then(res => {
            if (res.ok) { return res.json(); }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        });
}

export const logout = () => {
    return fetch(`${BASE_URL}/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        // credentials: 'include',
    })
        .then(res => {
            if (res.ok) { return res.json(); }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        });
} 