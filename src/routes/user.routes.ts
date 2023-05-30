import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { transactionRoutes } from "./transaction.routes";
import { validateUser } from "../middleware/user.middleware";
import { cpfCheck } from "../middleware/cpf.middleware";

export const userRoutes = () => {
    const app = Router();

    app.get('/', new UserController().list);
    app.get('/:id', new UserController().getUser);
    app.post('/', [validateUser, cpfCheck], new UserController().create);
    app.put('/:id', new UserController().update);
    app.delete('/:id', new UserController().delete);

    app.use('/:userId/transactions', transactionRoutes());

    return app;
};