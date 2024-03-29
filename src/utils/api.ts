interface Iconfig {
  url: string,
  headers: {
    [index: string]: string
  }
}

class Api {
  _url: string;

  _headers: { [index: string]: string; };

  constructor(config: Iconfig) {
    this._url = config.url;
    this._headers = config.headers;
  }

  // eslint-disable-next-line class-methods-use-this
  _checkResponse(res: { ok: any; json: () => any; status: any; }) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка ${res.status}`));
  }

  getEpisodes() { // получить эпизоды
    return fetch(`${this._url}episode`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getEpisode(id: string) { // получить конкретный эпизод
    return fetch(`${this._url}episode/${id}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getAllEpisode(items: string) { // получить эпизоды по массиву id
    return fetch(`${this._url}episode/${items}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getEpisodeUrl(link: string) { // получить эпизод по адресу
    return fetch(link, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getCharacted(url: string) { // получить персонажа по адресу
    return fetch(url, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getAllCharacted(items: string) { // получить персонажей по массиву id
    return fetch(`${this._url}character/${items}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getLocation(id: string) { // получить локацию по её id
    return fetch(`${this._url}location/${id}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api({
  url: 'https://rickandmortyapi.com/api/',
  headers: {
    'content-type': 'application/json',
  },
});

export default api;
