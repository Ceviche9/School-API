"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerCfg = require('../config/multerCfg'); var _multerCfg2 = _interopRequireDefault(_multerCfg);

var _photo = require('../models/photo'); var _photo2 = _interopRequireDefault(_photo);

const upload = _multer2.default.call(void 0, _multerCfg2.default).single('archive');

class PhotoController {

  async store(req, res) {

    return upload(req, res, async (err) => {
      try{

      if(err){
        return res.status(400).json({
          errors: [err],
        });
      }

      const{ originalname, filename} = req.file;
      const {student_id} = req.body;
      const photo = await _photo2.default.create({originalname, filename, student_id});

      return res.json(photo);

      } catch(e){

        return res.status(400).json({
          errors: ["Aluno não existe"]
        });
      }

    });
  }

}

exports. default = new PhotoController();
