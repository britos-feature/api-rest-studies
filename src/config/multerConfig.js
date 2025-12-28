import multer from 'multer';
import { extname, resolve } from 'node:path';

const random = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  // Function que filtra o tipo de arquivo (PNG/JPG)
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg')
      return cb(
        new multer.MulterError('The file must be in PNG or JPEG format.')
      );
    return cb(null, true);
  },
  // Function que define o lugar e nome do arquivo(image) a armazenar.
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
    },
  }),
};
