import Database from '../database/knex.js';

class OrderRepository {
  async getAll() {
    const orders = await Database
      .select()
      .from('orders')
      .orderBy('id');

    return orders;
  }

  async getById(id) {
    const order = await Database
      .select()
      .from('orders')
      .where('id', id)
      .first();

    return order;
  }

  async save(dishe) {
    await Database.insert(dishe).into('orders');
  }

  async updateOrderSetStartedTrue(id) {
    await Database('orders')
      .where('id', id)
      .update({
        started: true
      });
  }

  async updateOrderSetFinishedTrue(id) {
    await Database('orders')
      .where('id', id)
      .update({
        finished: true
      });
  }
}

export default new OrderRepository();