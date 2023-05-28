import { NextFunction, Request, Response } from "express";
import { cpf } from 'cpf-cnpj-validator';
import { apiResponse } from "../util/api.response.adapter";

export class CpfMiddleware {
    public static validateCpf(req: Request, res: Response, next: NextFunction) {
        try {
            const { cpf } = req.body;

            if (!cpf) {
                return apiResponse.notFound(res, 'CPF');
            }

            const isValid = cpf.isValid(
                cpf.toString().padStart(11, "0")
            );
            if (!isValid) {
                return apiResponse.invalidField(res, "CPF");
            }

            next();
        } catch (error: any) {
            return apiResponse.serverError(res, error);
        }
    }
}