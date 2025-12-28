import Student from '../models/StudentModel';
import PhotoModel from '../models/PhotoModel';

class StudentControllers {
  async index(req, res) {
    try {
      // findall, especificando atributo a serem retorandos.
      const students = await Student.findAll({
        attributes: ['name', 'lastname', 'email', 'classname'],
        order: [
          ['id', 'DESC'],
          [PhotoModel, 'id', 'DESC'],
        ],
        include: {
          model: PhotoModel,
          attributes: ['url', 'originalname', 'filename'],
        },
      });

      if (students.length === 0) {
        return res.status(200).json({
          students: [],
          msg: 'There is no data in the database.',
        });
      }

      return res.status(200).json(students);
    } catch (e) {
      return res.status(500).json({
        errors: ['Internal server error.'],
      });
    }
  }

  async store(req, res) {
    const { name, lastname, email, classname } = req.body;

    // 1️⃣ Validação básica de entrada
    if (!name || !lastname || !email || !classname) {
      return res.status(400).json({
        errors: ['All field are required.'],
      });
    }

    try {
      const student = await Student.create({
        name,
        lastname,
        email,
        classname,
      });

      return res.status(201).json(student);
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
      const student = await Student.findByPk(id, {
        attributes: ['name', 'lastname', 'email', 'classname'],
        order: [
          ['id', 'DESC'],
          [PhotoModel, 'id', 'DESC'],
        ],
        include: {
          model: PhotoModel,
          attributes: ['url', 'originalname', 'filename'],
        },
      });

      if (!student)
        return res.status(404).json({
          student: null,
          msg: 'Student not found',
        });

      return res.status(200).json(student);
    } catch (e) {
      return res.status(500).json({
        errors: e.errors ? e.errors.map((err) => err.message) : [e.message],
      });
    }
  }

  async update(req, res) {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ msg: 'Invalid id' });
    }

    const { name, lastname, email, classname } = req.body ?? {};

    if (!name && !lastname && !email && !classname) {
      return res.status(400).json({
        msg: 'Error, Required data',
      });
    }

    try {
      const student = await Student.findByPk(id);

      if (!student)
        return res.status(404).json({
          student: null,
          msg: 'Student not found',
        });

      const studentUpdated = await student.update({
        ...(name !== undefined && { name }),
        ...(lastname !== undefined && { lastname }),
        ...(email !== undefined && { email }),
        ...(classname !== undefined && { classname }),
      });

      const responseToOut = (dataStudent) => {
        const { name, lastname, email, classname } = dataStudent;
        return { name, lastname, email, classname };
      };

      return res.status(200).json(responseToOut(studentUpdated));
    } catch (e) {
      return res.status(500).json({
        errors: e.errors ? e.errors.map((err) => err.message) : [e.message],
      });
    }
  }

  async delete(req, res) {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ msg: 'Invalid id' });
    }

    try {
      const deletedRows = await Student.destroy({ where: { id } });

      if (!deletedRows) {
        return res.status(404).json({
          message: 'Student not found',
        });
      }

      return res.status(200).json({
        msg: 'Student deleted successfully',
      });
    } catch (e) {
      return res.status(500).json({
        errors: 'Internal server error.',
      });
    }
  }
}

export default new StudentControllers();
