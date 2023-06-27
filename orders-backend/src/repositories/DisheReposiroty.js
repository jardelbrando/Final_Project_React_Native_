import Database from '../database/knex.js';

class DisheReposiroty {
  async saveDishe(dishe) {
    await Database.insert(dishe).into('dishes');
  }

  async getAll() {
    const orders = await Database
      .select()
      .from('dishes')
      .orderBy('id');

    return orders;
  }

  async getById(id) {
    const dishe = await Database
      .select()
      .from('dishes')
      .where('id', id)
      .first();

    return dishe;
  }

  async getByCategory(category) {
    const dishe = await Database
      .select()
      .from('dishes')
      .where('category', category)

    return dishe;
  }
}

export default new DisheReposiroty();