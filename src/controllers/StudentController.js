import Aluno from '../models/aluno';
import Photo from '../models/photo';

class StudentController {

  async index(req, res) {
    try{
    const student = await Aluno.findAll({
      attributes: ["id", "nome", "sobrenome", "email", "idade" ],
      order: [["id", 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['url', 'filename'],
      }
    });
    res.json(student);
    } catch(e){
      return res.json('Error ao mostrar os usuários');
    }

  }

  async store(req, res) {
    try{

      const newStudent = await Aluno.create(req.body);

      const {id, nome, sobrenome, email} = newStudent;
      return res.json({id, nome, sobrenome,  email});
    }catch(e){

      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }

  async show(req, res) {
    try{

      const {id} = req.params;

      if(!id){
        return res.status(400).json({
          errors: ['Faltando o ID'],
        });
      }
      const student = await Aluno.findByPk(id, {

        attributes: ["id", "nome", "sobrenome", "email", "idade" ],
        order: [["id", 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['url', 'filename'],

         },

        });

      if(!student){
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }


      return res.json(student);

    }catch(e){

      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }

  async update(req, res) {

    try{

      const student = await Aluno.findByPk(req.params.id);

      if(!student){
        return res.status(400).json({
          errors: ['O aluno não está cadastrado ou não existe'],
        });
      }

      const newData = await student.update(req.body);
      const {id, nome, email} = newData;

      return res.json({id, nome, email });

    }catch(e){

      console.log(e);
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });

    }
  }

  async delete(req, res) {
    try{


      const {id} = req.params;

      if(!id){
        return res.status(400).json({
          errors: ['Faltando o ID'],
        });
      }
      const student = await Aluno.findByPk(id);

      if(!student){
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      await student.destroy();
      return res.json(student);
    }catch(e){

      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }

}

export default new StudentController();
