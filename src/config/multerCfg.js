import multer from 'multer';
//    {para pegar o nome da extensão do arquivo, para pegar o caminho da pasta}
import {extname, resolve} from 'path';

const random = () => Math.floor(Math.random() * 10000 + 10000);

export default {

  fileFilter: (req, file, cb) => {
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg'){
      return cb(new multer.MulterError('O arquivo precisa ser PNG ou JPG'));
    }

    return cb(null, true);
  },

  dest: resolve(__dirname, '..', '..', 'uploads'),

  Storage: multer.diskStorage({
    //destino do arquivo
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },

    //modificando o nome do arquivo para um nome único, baseando no momento em que ele foi mandando
    filename: (req, file, cb) => {
      if(err) cb(err);

      const fileName = `${Date.now()}${random()}_${extname(file.originalname)}`;

      cb(null, fileName);
    },

  }),
}
