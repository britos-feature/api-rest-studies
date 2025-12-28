import JWT from 'jsonwebtoken';
import User from '../models/UserModel';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({
      errors: ['Login required!'],
    });

  const [, token] = authorization.split(' ');

  try {
    const data = JWT.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    if (!(await User.findOne({ where: { id, email } })))
      return res.status(401).json({
        errors: ['Invalid or expired token!'],
      });

    req.idUser = id;
    req.emailUser = email;

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Invalid or expired token!'],
    });
  }
};
