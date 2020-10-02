const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

class Storage {
  constructor() {
    this.existsAsync = promisify(fs.exists);
  }

  async mkdirIfNotExists(targetDir) {
    const publicPath = path.join(__dirname, `../public/${targetDir}`);
    if (await this.existsAsync(publicPath)) {
      return;
    }

    fs.mkdir(publicPath, { recursive: true }, err => {});
  }
}

module.exports = Storage;
