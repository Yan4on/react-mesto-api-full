class Api {
  constructor({ baseUrl, headers, credentials }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
      this._credentials = credentials;
      this._errorServer = document.querySelector(".error-server");
  }

  // Получение ответа от сервера, иначе ошибка
  _getResponseData(res) {
      if (res.ok) { return res.json(); }
      return Promise.reject(new Error(`Ошибка: ${res.status}`)); // если ошибка при запросе, переходим к catch
  }

  // Получение с сервера начальных карточек 
  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
          credentials: this._credentials,
      })
          .then(res => { return this._getResponseData(res); })
  }

  // Сохранение на сервере карточки
  saveCardToServer({ name, link }) {
      return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
          credentials: this._credentials,
          method: 'POST',
          body: JSON.stringify({
              name: name,
              link: link
          })
      })
          .then((res) => { return this._getResponseData(res); })
  }

  // Удаление на сервере карточки
  deleteCardToServer(card) {
      return fetch(`${this._baseUrl}/cards/${card._id}`, {
          headers: this._headers,
          credentials: this._credentials,
          method: 'DELETE'
      })
  }

  // Обновление лайка
  changeLikeCardStatus(card, isLiked) {
      const action = isLiked ? 'DELETE' : 'PUT';

      return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
          headers: this._headers,
          credentials: this._credentials,
          method: action
      })
          .then((res) => { return this._getResponseData(res); })
  }

  // Сохранение на сервере Аватара 
  saveAvatarToServer({ link }) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          headers: this._headers,
          credentials: this._credentials,
          method: 'PATCH',
          body: JSON.stringify({
              avatar: link
          })
      })
          .then((res) => { return this._getResponseData(res); })
  }

  // Получение с сервера информация о пользователе 
  getUserInfoFromServer() {
      return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
          credentials: this._credentials,
      })
          .then(res => { return this._getResponseData(res); })
  }

  // Сохранение на сервере информация о пользователе 
  saveUserInfoToServer({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
          credentials: this._credentials,
          method: 'PATCH',
          body: JSON.stringify({
              name: name,
              about: about
          })
      })
          .then(res => { return this._getResponseData(res); })
  }

  // Вывод ошибки запроса к серверу на страницу
  setErrorServer(err) {
      this._errorServer.textContent = `Ошибка при соединение с сервером: ${err}. Попробуйте повторить позже`;

      this._errorServer.classList.add('error-server_active');
      setTimeout(() => {
          this._errorServer.classList.remove('error-server_active');
      }, 8000)
  }
}

export const api = new Api({
//   baseUrl: 'http://localhost:3005',
  baseUrl: 'https://api.yan4on.students.nomoredomains.icu',
  headers: {
      'Content-Type': 'application/json',
  },
  credentials: 'include'
});