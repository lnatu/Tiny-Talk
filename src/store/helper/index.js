exports.StorageHelper = class StorageHelper {
  constructor() {}

  saveAsString(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  save(key, data) {
    localStorage.setItem(key, data);
  }

  getAsJson(key) {
    return JSON.parse(localStorage.getItem(key));
  }
};
