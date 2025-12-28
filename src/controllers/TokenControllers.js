import JWT from 'jsonwebtoken';
import User from '../models/UserModel';

class TokenControllers {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password)
      return res.status(401).json({
        errors: ['Invalid credential!'],
      });

    try {
      const user = await User.findOne({ where: { email } });

      if (!user)
        return res.status(401).json({
          errors: ['User not found!'],
        });

      if (!(await user.passwordIsValid(password)))
        return res.status(401).json({
          errors: ['Invalid password!'],
        });

      const { id } = user;
      const token = JWT.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.json({
        token,
      });
    } catch (e) {
      return res.status(500).json({
        errors: e.errors ? e.errors.map((err) => err.message) : [e.message],
      });
    }
  }
}

export default new TokenControllers();
