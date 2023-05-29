import { Router } from "express"
import { TransactionController } from "../controllers/transaction.controller";

export const transactionRoutes = () => {
    const app = Router({
        mergeParams: true
    });

    app.post('/', new TransactionController().create);
    app.get('/', new TransactionController().list);
    app.get('/:transactionId', new TransactionController().getTransaction);

    return app;
}