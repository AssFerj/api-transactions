import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../util/api.response.adapter";
import { Type } from "../models/Transaction";

export const validateTransaction = (req: Request, res: Response, next: NextFunction) => {
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

    if(type !== Type){
        return apiResponse.typeNotAssigned(res, 'Tipo')
    }
            
    next();
}