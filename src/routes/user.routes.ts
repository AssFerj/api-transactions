import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { transactionRoutes } from "./transaction.routes";
import { validateUser } from "../middleware/user.middleware";

export const userRoutes = () => {
    const app = Router();

    app.get('/', new UserController().list);
    app.get('/:id', new UserController().getUser);
    app.post('/', [validateUser], new UserController().create);
    app.put('/:id', new UserController().update);
    app.delete('/:id', new UserController().delete);

    app.use('/:userId/transactions', transactionRoutes());

    return app;
};