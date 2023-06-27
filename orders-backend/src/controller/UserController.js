import BadRequestError from "../helpers/errors/BadRequestError.js";
import UserService from "../services/UserService.js";

class UserController {
  async get(request, response) {
    const users = await UserRepository.getAllUsers();

    return response.json(users);
  }

  async post(request, response) {
    try {
      await UserService.storeUser(request.body);

      return response.status(201).json();
    }
    catch(error) {
      const status = error.statusCode || 500;

      return response.status(status).json(error.message);
    }
  }
}

export default new UserController();