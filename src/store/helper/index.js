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
};
