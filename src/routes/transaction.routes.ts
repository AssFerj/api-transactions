import { Router } from "express"
import { TransactionController } from "../controllers/transaction.controller";
import { validateTransaction } from "../middleware/transaction.middleware";

export const transactionRoutes = () => {
    const app = Router({
        mergeParams: true
    });

    app.post('/', [validateTransaction], new TransactionController().create);
    app.get('/', new TransactionController().list);
    app.get('/:transactionId', new TransactionController().getTransaction);

    return app;
}