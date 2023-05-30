import { Response } from "express";
import { Type } from "../models/Transaction";

export class apiResponse {
    public static notFound(res: Response, entity: string){
        return res.status(404).send({
            ok: false,
            message:  `${entity} not found`,
        });
    }

    public static typeNotAssigned(res: Response, entity: string){
        return res.status(404).send({
            ok: false,
            message:  `${entity} not found, ${entity} only ${Type.income} or ${Type.outcome}`,
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