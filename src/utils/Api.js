export default class Api {
	constructor(setting) {
		this._url = setting.url;
		this._headers = setting.headers;
	}

	_getResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	async getUserInfo() {
		const res = await fetch(`${this._url}/users/me`, {
			method: 'GET',
			credentials: 'include',
			headers: this._headers,
		});
		return this._getResponse(res);
	}

	async editUserInfo(data) {
		const res = await fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			credentials: 'include',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about,
			}),
		});
		return this._getResponse(res);
	}

	async getInitialCards() {
		const res = await fetch(`${this._url}/cards`, {
			method: 'GET',
			credentials: 'include',
			headers: this._headers,
		});
		return this._getResponse(res);
	}

	async addCard(item) {
		const res = await fetch(`${this._url}/cards`, {
			method: 'POST',
			credentials: 'include',
			headers: this._headers,
			body: JSON.stringify({
				name: item.name,
				link: item.link,
			}),
		});
		return this._getResponse(res);
	}

	async changeAvatar(data) {
		const res = await fetch(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			credentials: 'include',
			headers: this._headers,
			body: JSON.stringify({
				avatar: data.avatar,
			}),
		});
		return this._getResponse(res);
	}

	async deleteCard(cardId) {
		const res = await fetch(`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: this._headers,
		});
		return this._getResponse(res);
	}

	async addLike(cardId) {
		const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
			method: 'PUT',
			credentials: 'include',
			headers: this._headers,
		});
		return this._getResponse(res);
	}

	async deleteLike(cardId) {
		const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
			method: 'DELETE',
			credentials: 'include',
			headers: this._headers,
		});
		return this._getResponse(res);
	}
}

// const api = new Api({
// 	url: 'https://api.foxhound.nomoredomains.club',
// 	headers: {
// 		authorization: '1d5fb42f-083e-4754-bc11-0941caf4871f',
// 		'Content-type': 'application/json',
// 	},
// });

// export default api;
