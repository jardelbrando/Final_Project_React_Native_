import express from 'express';
import UserController from './controller/UserController.js';
import Validator from './helpers/validators/index.js';
import schemas from './helpers/validators/schemas.js';
import TokenController from './controller/TokenController.js';
import DisheController from './controller/DisheController.js';
import AuthMiddleware from  './helpers/middlewares/AuthMiddleware.js';
import OrderController from './controller/OrderController.js';

const routes = express.Router();

routes.get("/", UserController.get);

routes.post('/users', Validator(schemas.user), UserController.post);

routes.post('/tokens', TokenController.store);

routes.post('/dishes', [AuthMiddleware, Validator(schemas.dishe)], DisheController.store);
routes.get('/dishes', AuthMiddleware, DisheController.get);
routes.get('/dishes/:category', AuthMiddleware, DisheController.getByCategory);

routes.get('/orders', AuthMiddleware, OrderController.get);
routes.post('/orders', [AuthMiddleware, Validator(schemas.order)], OrderController.store);
routes.patch('/orders/start/:id', [AuthMiddleware, Validator(schemas.startFinishOrder, "params")], OrderController.start);
routes.patch('/orders/finish/:id', [AuthMiddleware, Validator(schemas.startFinishOrder, "params")], OrderController.finish);

export default routes;