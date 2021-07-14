import User from '../models/users';

class UserController {

  //Para adicionar um usuário
  async store(req, res) {
    try{
    const novoUser = await User.create(req.body);
    const {id, nome, email} = novoUser;
    return res.json( {id, nome, email});
    } catch(e) {

      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });

    }

  }
  //Para ver todos os usuários da base de dados
  async index(req, res) {

    try{

      //Para encontrar todos os usuários na base de dados
      const users = await User.findAll({attributes: ['id', 'nome', 'email']});
      return res.json(users);


    } catch(e) {

      return res.json(null);

    }

  }
  //Para buscar um usuário
  async show(req, res) {

    try{

      console.log('Entrei no try');
      const user = await User.findByPk(req.params.id);

      const {id, nome, email} = user;

      return res.json({id, nome, email});

    } catch(e) {

      return res.json({message: "Erro Inesperado"});

    }

  }
  //Para apagar usuários
  async delete(req, res) {

    try{

      const user = await User.findByPk(req.params.id);

      if(!user){
        return res.status(400).json({
          errors: ['O usuário não cadastrado'],
        });
      }

      await user.destroy();
      return res.json(user);


    } catch(e) {

      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
  //Para atualizar os dados dos usuários
  async update(req, res) {

    try{

      const user = await User.findByPk(req.params.id);

      if(!user){
        return res.status(400).json({
          errors: ['O usuário não cadastrado'],
        });
      }

      const novosDados = await user.update(req.body);
      const {id, nome , email } = novosDados;
      return res.json({id, nome , email });


    } catch(e) {

      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
}

export default new UserController();
