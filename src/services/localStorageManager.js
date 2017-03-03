export default class LocalStorageManager {
    static setUser(userObj)  {
        localStorage.setItem('localStorageUser', JSON.stringify(userObj));
    }

    static clearLocalStorage()  {
        localStorage.clear()
    }

    static removeUser()  {
        localStorage.removeItem('localStorageUser');
    }

    static getUser() {
        return JSON.parse(localStorage.getItem('localStorageUser'));
    }
}

    