import { Request, Response } from "express";
import { apiResponse } from "../util/api.response.adapter";
import { Transaction, TypeTransaction } from "../models/Transaction";
import { users } from "../data/dataUsers";

export class TransactionController {
    // CREATE
    public create(req: Request, res: Response) {
        try{
            const { userId } = req.params;
            const { title, value, type } = req.body;

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
            const { userId } = req.params;
            const { title, type } = req.query;
            
            const user = users.find(user => user.id === userId);
            const existType = user?.transaction.filter(t => t.type === type);
            const existTitle = user?.transaction.filter(t => t.title === title);
            
            if(type){
                return apiResponse.success(res, 'Tipe', existType);
            }

            if(title){
                return apiResponse.success(res, 'Tipe', existTitle);
            }

            if(!user?.transaction) {
                return apiResponse.notFound(res, `Transaction of user ${user?.name}`);
            }

            const transactionOfUser = user.transaction.map(transaction => transaction.toJsonT());

            let income = user.transaction
                .filter(t => t.type === TypeTransaction.income)
                .reduce((soma, transaction) => soma + transaction.value, 0);

            let outcome = user.transaction
                .filter(t => t.type === TypeTransaction.outcome)
                .reduce((soma, transaction) => soma + transaction.value, 0);
 
            return res.status(200).send({
                ok: true,
                message: "Transaction successfully listed",
                data: {
                    transactionOfUser,
                    balance: {
                        income,
                        outcome,
                        total: income - outcome
                    }
                }
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
            const { userId, transactionId } = req.params;
            const { title, value, type } = req.body;

            const user = users.find(user => user.id === userId);
            
            if(!user) {
                return apiResponse.notFound(res, 'User');
            }

            const existTransaction = user.transaction.find(t => t.id === transactionId);

            if(!existTransaction) {
                return apiResponse.notFound(res, 'Transaction');
            }

            if(title){
                existTransaction.title = title;
            }

            if(value){
                existTransaction.value = value;
            }

            if(type){
                existTransaction.type = type;
            }

            return res.status(200).send({
                ok: true,
                message: "Transaction successfully updated",
                data: existTransaction.toJsonT()
            })
        } catch(error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }

    //DELETE
    public delete(req: Request, res: Response) {
        try {
            const { userId, transactionId } = req.params;

            const user = users.find(user => user.id === userId);
            
            if(!user) {
                return apiResponse.notFound(res, 'User');
            }
            
            const existTransaction = user?.transaction.findIndex(t => t.id === transactionId);

            if(!existTransaction) {
                return apiResponse.notFound(res, 'Transaction');
            }

            const deleteTransaction = user.transaction.splice(existTransaction, 1);

            return apiResponse.success(res, 'Transaction', deleteTransaction);

        } catch(error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }
}