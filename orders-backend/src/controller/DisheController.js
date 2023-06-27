import DisheService from "../services/DisheService.js";

class DisheController {
  async store(request, response) {
    try {
      const { name, price, description, avatar_url, category } = request.body;

      await DisheService.storeDishe(name, price, description, avatar_url, category);

      return response.status(201).json();
    }
    catch(error) {
      const status = error.statusCode || 500;

      return response.status(status).json(error.message);
    }
  }

  async get(request, response) {
    try {
      const dishes = await DisheService.getAll();

      return response.status(201).json(dishes);
    }
    catch(error) {
      const status = error.statusCode || 500;

      return response.status(status).json(error.message);
    }
  }

  async getByCategory(request, response) {
    try {
      const {category} = request.params;
      const dishes = await DisheService.getByCategory(category);

      return response.status(201).json(dishes);
    }
    catch(error) {
      const status = error.statusCode || 500;

      return response.status(status).json(error.message);
    }
  }
}

export default new DisheController();