import { NextFunction, Request, Response } from "express";
import {userService} from "../services/userService";
import {fsService} from "../fs.service";
import {IUser} from "../interface/userInterface";



class UserController {
    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userService.getList();
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as any;
            const result = await userService.create(dto);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }
    public async get(req: Request, res: Response, next: NextFunction) {
        try {

            const userId =Number( req.params.userId);
            const result = await userService.get(userId);
            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
    public async put(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IUser;
            const userId =Number( req.params.userId);

            const result = await userService.put(userId);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }
    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userId =Number( req.params.userId);
            const result = await userService.delete(userId);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();


//mongodb+srv://yelyzaveta781:1m0RFKJXvsrd6jZy@jan.xt0f08k.mongodb.net/