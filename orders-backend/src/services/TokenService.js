import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserRepository from "../repositories/UserRepository.js";
import UnauthorizedError from '../helpers/errors/UnauthorizedError.js';

class TokenService {
  async createJwtToken(email, password) {
    const user = await UserRepository.getUserByEmail(email);

    if(!user) throw new UnauthorizedError("Password or Email is incorrect. Try again.");

    const samePassword = await bcrypt.compare(password, user.password);

    if(!samePassword)
      throw new UnauthorizedError("Password or Email is incorrect. Try again.");

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: '1d' });

    return token;
  }  
}

export default new TokenService();