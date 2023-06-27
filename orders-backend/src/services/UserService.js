import bcrypt from 'bcrypt';

import BadRequestError from "../helpers/errors/BadRequestError.js";
import UserRepository from "../repositories/UserRepository.js";

class UserService {
  async storeUser({ name, email, password }) {
    const SALT = 10;

    const userAlreadyExists = await UserRepository.getUserByEmail(email);

    if(userAlreadyExists) throw new BadRequestError("User already exists");

    const encryptedPassword = await bcrypt.hash(password, SALT);

    await UserRepository.createUser({
      name,
      email,
      password: encryptedPassword
    });
  }
}

export default new UserService();