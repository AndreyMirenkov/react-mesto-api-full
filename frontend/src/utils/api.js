class Api {
    constructor({baseUrl, headers}) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }
  
    _checkResponce(res){
        if (res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`)
    }

    getProfile(){
        return fetch(`${this._baseUrl}/users/me`,{
            credentials: 'include',
            headers: this._headers
        }).then(this._checkResponce)
    }

    editProfile(name, about){
       return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        }).then(this._checkResponce)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`,{
            credentials: 'include',
            headers: this._headers
        }).then(this._checkResponce)
    }
  

    newCard(name,link){
        return fetch(`${this._baseUrl}/cards`,{
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        }).then(this._checkResponce)
    }

    deleteCard(id){
        return fetch(`${this._baseUrl}/cards/${id}`,{
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        }).then(this._checkResponce)
    }

    deleteLikes(id){
        return fetch(`${this._baseUrl}/cards/${id}/likes`,{
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        }).then(this._checkResponce)
    }

    addLikes(id){
        return fetch(`${this._baseUrl}/cards/${id}/likes`,{
            method: 'PUT',
            credentials: 'include',
            headers: this._headers
        }).then(this._checkResponce)
    }

    changeLikeCardStatus(cardId, isLiked){
        if (isLiked){
           return this.addLikes(cardId)
        } else {
            return this.deleteLikes(cardId)
        }
    }

    updateAvatar(avatar){
        return fetch(`${this._baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        }).then(this._checkResponce)
    }
    // другие методы работы с API
  }
  
const api = new Api({
    baseUrl: 'https://api.mesto.andreym.nomoredomains.sbs',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
  });

  export default api;