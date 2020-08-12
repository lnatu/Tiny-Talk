exports.StorageHelper = class StorageHelper {
  constructor() {}

  saveAsString(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  save(key, data) {
    localStorage.setItem(key, data);
  }
};
