import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../util/api.response.adapter";
import { users } from "../data/dataUsers";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, cpf, email, age } = req.body;

  if (!name) {
    return apiResponse.notProvided(res, "Nome");
  }

  if (!cpf) {
    return apiResponse.notProvided(res, "Cpf");
  }

  if (!email) {
    return apiResponse.notProvided(res, "Email");
  }

  if (!age) {
    return apiResponse.notProvided(res, "Idade");
  }

  next();
};