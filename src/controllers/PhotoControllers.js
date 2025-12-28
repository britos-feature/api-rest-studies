import multer from 'multer';
import multerConfig from '../config/multerConfig';
import PhotoModel from '../models/PhotoModel';

const upload = multer(multerConfig).single('photo');

class PhotoControllers {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error)
        return res.status(400).json({
          errors: [error.code],
        });
      try {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;
        const photo = await PhotoModel.create({
          originalname,
          filename,
          student_id,
        });

        return res.json(photo);
      } catch (e) {
        return res.status(400).json({
          errors: 'Student not found!',
        });
      }
    });
  }
}

export default new PhotoControllers();
