"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _aluno = require('../models/aluno'); var _aluno2 = _interopRequireDefault(_aluno);
var _photo = require('../models/photo'); var _photo2 = _interopRequireDefault(_photo);

class StudentController {

  async index(req, res) {
    try{
    const student = await _aluno2.default.findAll({
      attributes: ["id", "nome", "sobrenome", "email", "idade" ],
      order: [["id", 'DESC'], [_photo2.default, 'id', 'DESC']],
      include: {
        model: _photo2.default,
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

      const newStudent = await _aluno2.default.create(req.body);

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
      const student = await _aluno2.default.findByPk(id, {

        attributes: ["id", "nome", "sobrenome", "email", "idade" ],
        order: [["id", 'DESC'], [_photo2.default, 'id', 'DESC']],
        include: {
          model: _photo2.default,
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

      const student = await _aluno2.default.findByPk(req.params.id);

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
      const student = await _aluno2.default.findByPk(id);

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

exports. default = new StudentController();
