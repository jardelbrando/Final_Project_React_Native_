import TokenService from "../services/TokenService.js";

class TokenController {
  async store(request, response) {
    try {
      const { email, password } = request.body;

      const token = await TokenService.createJwtToken(email, password);

      return response.json({ token });
    }
    catch(error) {
      const status = error.statusCode || 500;

      return response.status(status).json(error.message);
    }
  }
}

export default new TokenController();