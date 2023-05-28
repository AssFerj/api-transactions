import { Router } from "express"
import { TransactionController } from "../controllers/transaction.controller";

export const transactionRoutes = () => {
    const app = Router({
        mergeParams: true
    });

    app.post('/', new TransactionController().create);
    app.get('/', new TransactionController().list);

    return app;
}