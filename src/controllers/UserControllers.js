import User from '../models/UserModel';

class UserControllers {
  async index(req, res) {
    try {
      // findall, especificando atributo a serem retorandos.
      const users = await User.findAll({
        attributes: ['id', 'name', 'lastname', 'email', 'password'],
      });

      if (users.length === 0) {
        return res.status(200).json({
          users: [],
          msg: 'There is no data in the database.',
        });
      }

      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({
        errors: ['Internal server error.'],
      });
    }
  }

  async store(req, res) {
    const { name, lastname, email, password } = req.body;

    // 1️⃣ Validação básica de entrada
    if (!name || !lastname || !email || !password) {
      return res.status(400).json({
        errors: ['All field are required.'],
      });
    }

    try {
      await User.create({
        name,
        lastname,
        email,
        password,
      });

      return res.status(201).json({ name, lastname, email, password });
    } catch (e) {
      return res.status(500).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    const id = Number(req.params.id);

    if (!id || !Number.isInteger(id))
      return res.status(400).json({
        msg: 'Invalid id',
      });

    try {
      const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'lastname', 'email'],
      });

      if (!user)
        return res.status(404).json({
          user: null,
          msg: 'User not found',
        });

      return res.status(200).json(user);
    } catch (e) {
      return res.status(500).json({
        errors: e.errors ? e.errors.map((err) => err.message) : [e.message],
      });
    }
  }

  async update(req, res) {
    const id = Number(req.idUser);

    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ msg: 'Invalid id' });
    }

    const { name, lastname, email, password } = req.body ?? {};

    if (!name && !lastname && !email && !password) {
      return res.status(400).json({
        msg: 'Error, Required data',
      });
    }

    try {
      const user = await User.findByPk(id);

      if (!user)
        return res.status(404).json({
          student: null,
          msg: 'User not found',
        });

      const userUpdated = await user.update({
        ...(name !== undefined && { name }),
        ...(lastname !== undefined && { lastname }),
        ...(email !== undefined && { email }),
        ...(password !== undefined && { password }),
      });

      const responseToOut = (dataUser) => {
        const { name, lastname, email, password } = dataUser;
        return { name, lastname, email, password };
      };

      return res.status(200).json(responseToOut(userUpdated));
    } catch (e) {
      return res.status(500).json({
        errors: e.errors ? e.errors.map((err) => err.message) : [e.message],
      });
    }
  }

  async delete(req, res) {
    const id = Number(req.idUser);

    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ msg: 'Invalid id' });
    }

    try {
      const deletedRows = await User.destroy({ where: { id } });

      if (!deletedRows) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      return res.status(200).json({
        msg: 'User deleted successfully',
      });
    } catch (e) {
      return res.status(500).json({
        errors: 'Internal server error.',
      });
    }
  }
}

export default new UserControllers();
