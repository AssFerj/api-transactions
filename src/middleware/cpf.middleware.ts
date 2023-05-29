import { NextFunction, Request, Response } from "express";
import { cpf as validaCpf } from "cpf-cnpj-validator";
import { users } from "../data/dataUsers";
import { apiResponse } from "../util/api.response.adapter";

export const cpfCheck = (req: Request, res: Response, next: NextFunction) => {
  const { cpf } = req.body;

  if (!cpf) {
    return apiResponse.notFound(res, "CPF");
  }

  const cpfValido = validaCpf.isValid(cpf);
  if (!cpfValido) {
    return res.status(403).send({
      ok: false,
      message: "Cpf invalido",
    });
  }

  const existeCpf = users.some((item) => item.cpf === cpf);
  if (existeCpf) {
    return res.status(403).send({
      ok: false,
      message: "Cpf já cadastrado",
    });
  }
  next();
};