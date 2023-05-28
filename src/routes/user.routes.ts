import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { transactionRoutes } from "./transaction.routes";

export const userRoutes = () => {
    const app = Router();

    app.get('/', new UserController().list);
    app.get('/:id', new UserController().getUser);
    app.post('/', new UserController().create);
    app.put('/:id', new UserController().update);
    app.delete('/:id', new UserController().delete);

    app.use('/:id/transactions', transactionRoutes());

    return app;
};