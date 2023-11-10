export const setStorage = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
}
export const getStorage = (key) => {
    JSON.parse(window.localStorage.getItem(key));
}