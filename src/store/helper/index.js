/* eslint-disable */
exports.StorageHelper = class StorageHelper {
  constructor() {}

  saveAsString(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  save(key, data) {
    localStorage.setItem(key, data);
  }

  get(key) {
    return localStorage.getItem(key);
  }

  getAsJson(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  remove(key) {
    localStorage.removeItem(key);
  }
};

exports.playSound = () => {
  const audio = new Audio(require('../../assets/sounds/ios_notification.mp3'));
  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.then(_ => {}).catch(error => {});
  }
};
