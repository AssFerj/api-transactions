import { Request, Response } from "express";
import { apiResponse } from "../util/api.response.adapter";
import { Transaction } from "../models/Transaction";
import { users } from "../data/dataUsers";

export class TransactionController {
    // CREATE
    public create(req: Request, res: Response) {
        try{
            const { userId } = req.params;
            const { title, value, type } = req.body;

            if(!title) {
                return apiResponse.notProvided(res, 'Título')
            }

            if(!value) {
                return apiResponse.notProvided(res, 'Valor')
            }

            if(!type) {
                return apiResponse.notProvided(res, 'Tipo')
            }

            const user = users.find(user => user.id === userId);
            
            if(!user) {
                return apiResponse.notFound(res, 'User');
            }

            const transaction = new Transaction(title, value, type);
            user.transaction.push(transaction);
            
            return res.status(201).send({
                ok: true,
                message: "Transaction was successfully created",
                data: user.toJson()
            });
        } catch(error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }
    //READ
    public list(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const user = users.find(user => user.id === id);

            if(!user) {
                return apiResponse.notFound(res, 'User');
            }

            return res.status(200).send({
                ok: true,
                message: "Transaction successfully listed",
                data: user.transaction.map(transaction => transaction.toJsonT())
            })
        } catch(error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }

    public getTransaction(req: Request, res: Response) {
        try {
            const { userId, transactionId } = req.params;

            const user = users.find(user => user.id === userId);

            if(!user) {
                return apiResponse.notFound(res, 'User');
            }

            const transactionOfUser = user.transaction.find(item => item.id === transactionId);

            if(!transactionOfUser) {
                return apiResponse.notFound(res, 'Transaction');
            }

            return res.status(200).send({
                ok: true,
                message: "Transaction successfully listed",
                data: transactionOfUser.toJsonT()
            })

        } catch(error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // UPDATE
    public update(req: Request, res: Response) {
        try {

        } catch(error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }

    //DELETE
    public delete(req: Request, res: Response) {
        try {

        } catch(error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }
}