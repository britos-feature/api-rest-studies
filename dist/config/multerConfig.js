"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _nodepath = require('node:path');

const random = () => Math.floor(Math.random() * 10000 + 10000);

exports. default = {
  // Function que filtra o tipo de arquivo (PNG/JPG)
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg')
      return cb(
        new _multer2.default.MulterError('The file must be in PNG or JPEG format.')
      );
    return cb(null, true);
  },
  // Function que define o lugar e nome do arquivo(image) a armazenar.
  storage: _multer2.default.diskStorage({
    destination: (req, file, cb) => {
      cb(null, _nodepath.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${random()}${_nodepath.extname.call(void 0, file.originalname)}`);
    },
  }),
};
