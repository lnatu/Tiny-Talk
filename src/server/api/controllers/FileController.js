const path = require('path');
const mime = require('mime');
const fs= require('fs');
const catchError = require('./../../utils/catchError');

exports.downloadFile = catchError(async (req, res, next) => {
  console.log(req.query.fileId);
  const file = path.join(
    __dirname,
    `../../public/img/files/${req.query.fileId}`
  );

  const filename = path.basename(file);
  const mimetype = mime.getType(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  const filestream = fs.createReadStream(file);
  filestream.pipe(res);
});
