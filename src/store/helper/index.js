exports.StorageHelper = class StorageHelper {
  constructor() {}

  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};
