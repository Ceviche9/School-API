import multer from 'multer';
import multerCfg from '../config/multerCfg';

import Photo from '../models/photo';

const upload = multer(multerCfg).single('archive');

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
      const photo = await Photo.create({originalname, filename, student_id});

      return res.json(photo);

      } catch(e){

        return res.status(400).json({
          errors: ["Aluno não existe"]
        });
      }

    });
  }

}

export default new PhotoController();
