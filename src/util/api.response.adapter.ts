import { Response } from "express";
import { TypeTransaction } from "../models/Transaction";

export class apiResponse {
    public static success(res: Response, entity: string, data: any){
        return res.status(200).send({
            ok: true,
            message: `${entity} successfully listed`,
            data: data
        });
    }

    public static notFound(res: Response, entity: string){
        return res.status(404).send({
            ok: false,
            message:  `${entity} not found`,
        });
    }

    public static typeNotAssigned(res: Response, entity: string){
        return res.status(404).send({
            ok: false,
            message:  `${entity} not found, ${entity} only ${TypeTransaction.income} or ${TypeTransaction.outcome}`,
        });
    }

    public static notProvided(res: Response, entity: string){
        return res.status(400).send({
            ok: false,
            message:  `${entity} was not provided`,
        });
    }

    public static alreadyExist(res: Response, entity: string){
        return res.status(400).send({
            ok: false,
            message:  `${entity} already exist!`,
        });
    }

    public static errorMessage(res: Response, entity: any){
        return res.status(500).send({
            ok: false,
            message: entity.toString(),
        });
    }
}