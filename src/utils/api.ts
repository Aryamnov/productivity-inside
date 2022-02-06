interface config {
  url: string,
  headers: {
    [index: string]: string
  }
}

class Api {
  _url: string;
  _headers: { [index: string]: string; };
  constructor(config: config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res: { ok: any; json: () => any; status: any; }) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getEpisodes() {
    return fetch(this._url + "episode", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getEpisode(id: string) {
    return fetch(this._url + "episode/" + id, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getEpisodeUrl(link: string) {
    return fetch(link, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getCharacted(url: string) {
    return fetch(url, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getLocation(id: string) {
    return fetch(this._url + "location/" + id, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api({
  url: "https://rickandmortyapi.com/api/",
  headers: {
    "content-type": "application/json",
  },
});

export default api;
