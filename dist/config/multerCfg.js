"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
//    {para pegar o nome da extensão do arquivo, para pegar o caminho da pasta}
var _path = require('path');

const random = () => Math.floor(Math.random() * 10000 + 10000);

exports. default = {

  fileFilter: (req, file, cb) => {
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg'){
      return cb(new _multer2.default.MulterError('O arquivo precisa ser PNG ou JPG'));
    }

    return cb(null, true);
  },

  dest: _path.resolve.call(void 0, __dirname, '..', '..', 'uploads'),

  Storage: _multer2.default.diskStorage({
    //destino do arquivo
    destination: (req, file, cb) => {
      cb(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'));
    },

    //modificando o nome do arquivo para um nome único, baseando no momento em que ele foi mandando
    filename: (req, file, cb) => {
      if(err) cb(err);

      const fileName = `${Date.now()}${random()}_${_path.extname.call(void 0, file.originalname)}`;

      cb(null, fileName);
    },

  }),
}
