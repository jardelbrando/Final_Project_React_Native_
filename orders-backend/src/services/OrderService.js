import BadRequestError from "../helpers/errors/BadRequestError.js";
import DisheReposiroty from "../repositories/DisheReposiroty.js";
import OrderRepository from "../repositories/OrderRepository.js";

class OrderService {
  async getAll() {
    const orders = await OrderRepository.getAll();

    return orders;
  }

  async createOrder(order) {
    const { disheId } = order;

    const existsDishe = await DisheReposiroty.getById(disheId);

    if(!existsDishe)
      throw new BadRequestError("The dishe of that order not exists.");

    const dishe = {
      table_number: order.tableNumber,
      dishe_id: disheId,
      quantity: order.quantity,
      started: false,
      finished: false,
      observation: order.observation
    };

    await OrderRepository.save(dishe);
  }

  async startOrder(id) {
    const order = await OrderRepository.getById(id);

    if(!order) throw new BadRequestError("The order doest not exist.");

    if(order.started)
      throw new BadRequestError("That order was already started.");

    await OrderRepository.updateOrderSetStartedTrue(order.id);
  }

  async finishOrder(id) {
    const order = await OrderRepository.getById(id);

    if(!order) throw new BadRequestError("The order doest not exist.");

    if(order.finished)
      throw new BadRequestError("That order was already finished.");
      
    await OrderRepository.updateOrderSetFinishedTrue(order.id);
  }
}

export default new OrderService();