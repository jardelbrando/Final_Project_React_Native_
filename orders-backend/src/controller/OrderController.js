import OrderService from "../services/OrderService.js";

class OrderController {
  async get(request, response) {
    try {
      const orders = await OrderService.getAll();

      return response.status(201).json(orders);
    }
    catch(error) {
      const status = error.statusCode || 500;

      return response.status(status).json(error.message);
    }
  }

  async store(request, response) {
    try {
      await OrderService.createOrder(request.body);

      return response.status(201).json();
    }
    catch(error) {
      const status = error.statusCode || 500;

      return response.status(status).json(error.message);
    }
  }

  async start(request, response) {
    try {
      const { id } = request.params;

      await OrderService.startOrder(id);

      return response.status(200).json();
    }
    catch(error) {
      const status = error.statusCode || 500;

      return response.status(status).json(error.message);
    }
  }

  async finish(request, response) {
    try {
      const { id } = request.params;

      await OrderService.finishOrder(id);

      return response.status(200).json();
    }
    catch(error) {
      const status = error.statusCode || 500;

      return response.status(status).json(error.message);
    }
  }
}
 
export default new OrderController();