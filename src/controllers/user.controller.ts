import { Request, Response } from "express";
import { users } from "../data/dataUsers";
import { User } from "../models/User";
import { apiResponse } from "../util/api.response.adapter";

export class UserController {
    // CREATE
    public create(req: Request, res: Response) {
        try {
            const { name, cpf, email, age } = req.body;

            const user = new User( name, cpf, email, age);

            const findUserByCpf = users.find(user => user.cpf === cpf);
            
            if(findUserByCpf){
                return apiResponse.alreadyExist(res, 'CPF')
            }

            users.push(user);
            
            return res.status(201).send({
                ok: true,
                message: "User was successfully created",
                data: user.toJson(),
            });
        } catch (error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // READ
    public list (req: Request, res: Response) {
        try{
            const { name, cpf, email } = req.query;

            if(!users){
                return apiResponse.notFound(res, 'Users');
            }

            let result = users;

            if(name){
                result = users.filter(user => user.name === name);
            }
        
            if(cpf){
                result = users.filter(user => user.cpf === cpf);
            }
        
            if(email){
                result = users.filter(user => user.email === email);
            }
    
            return res.status(200).send({
                ok: true,
                message: "Users was successfully listed",
                data: result.map(user => user.toJson()),
            });
        }catch (error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }

    public getUser (req: Request, res: Response) {
        try{
            const { id } = req.params;

            if(!users){
                return apiResponse.notFound(res, 'Users');
            }

            const user = users.find(user=>user.id === id);

            if(!user){
                return apiResponse.notFound(res, 'User');
            }
    
            return res.status(200).send({
                ok: true,
                message: "User was successfully listed",
                data: user.toJson(),
            });
        }catch (error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // UPDATE
    public update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, age } = req.body;

            const user = users.find(user=>user.id === id);

            if(!user){
                return apiResponse.notFound(res, 'User');
            };
            
            name ? user.name = name : user.name = user.name;
            email ? user.email = email : user.email = user.email;
            age ? user.age = age : user.age = user.age;

            return res.status(200).send({
                ok: true,
                message: "User was successfully updated",
                data: user.toJson(),
            });
        } catch (error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }

    // DELETE
    public delete(req: Request, res: Response){
        try {
            const { id } = req.params;

            const userIndex = users.findIndex(user=>user.id === id);

            if(userIndex < 0){
                return apiResponse.notFound(res, 'User');
            }

            const userDeleted = users.splice(userIndex, 1);

            return res.status(200).send({
                ok: true,
                message: "User was successfully deleted",
                data: userDeleted[0].toJson(),
            });
        } catch (error: any) {
            return apiResponse.errorMessage(res, error);
        }
    }
}