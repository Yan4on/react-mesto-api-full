// Видимо был баг, на гитхаб не улетала переименованное название компонента, только заметил
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._errorServer = document.querySelector(".error-server");
  }

  // Получение ответа от сервера, иначе ошибка
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`)); // если ошибка при запросе, переходим к catch
  }

  // Получение с сервера начальных карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      (res) => {
        return this._getResponseData(res);
      }
    );
  }

  // Сохранение на сервере карточки
  saveCardToServer({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Удаление на сервере карточки
  deleteCardToServer(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  // Обновление лайка
  changeLikeCardStatus(card, isLiked) {
    const action = isLiked ? 'DELETE' : 'PUT';

    return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
        headers: this._headers,
        method: action
    })
        .then((res) => { return this._getResponseData(res); })
}

  // Сохранение на сервере Аватара
  saveAvatarToServer({ link }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // Получение с сервера информация о пользователе
  getUserInfoFromServer() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      (res) => {
        return this._getResponseData(res);
      }
    );
  }

  // Сохранение на сервере информация о пользователе
  saveUserInfoToServer({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
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
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    authorization: "691998da-b477-4262-8750-23151b55d1d5",
    "Content-Type": "application/json",
  },
});
