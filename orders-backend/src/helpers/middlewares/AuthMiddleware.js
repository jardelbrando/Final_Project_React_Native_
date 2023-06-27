import jwt from 'jsonwebtoken';

import UserRepository from '../../repositories/UserRepository.js';

async function AuthMiddleware(request, response, next) {
  const { authorization } = request.headers;

  if(!authorization)
    return response.status(401).json({ message: "JWT Token not provided." });

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, "secret");

  const user = await UserRepository.findById(id);

  if(!user)
    return response.status(401).json({ message: "JWT Token not provided." });

  next();
}

export default AuthMiddleware;