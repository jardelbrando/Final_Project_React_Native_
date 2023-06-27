import Database from '../database/knex.js';

class UserRepository {
  async getAllUsers() {
    const users = await Database.select().from('users');

    return users;
  }

  async getUserByEmail(email) {
    const user = await Database
      .select()
      .from('users')
      .where('email', email)
      .first();

    return user;
  }

  async createUser(user) {
    await Database.insert(user).into('users');
  }

  async findById(id) {
    const user = await Database.select().from('users').where('id', id).first();

    return user;
  }
}

export default new UserRepository();