import express, { NextFunction, Request, Response } from "express";
import { fsService } from "./fs.service";
import {userRouter} from "./routers/userRouters";
import {ApiError} from "./errors/api-errors";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);



app.put("/users/:userId", async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const { name, email, password } = req.body;

        const users = await fsService.read();
        const user = users.find((user) => user.id === userId);
        if (!user) {
            return res.status(404).json("User not found");
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;

        await fsService.write(users);

        res.status(201).json(user);
    } catch (e) {
        res.status(500).json(e.message);
    }
});

app.delete("/users/:userId", async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);

        const users = await fsService.read();
        const index = users.findIndex((user) => user.id === userId);
        if (index === -1) {
            return res.status(404).json("User not found");
        }
        users.splice(index, 1);
        await fsService.write(users);

        res.sendStatus(204);
    } catch (e) {
        res.status(500).json(e.message);
    }
});

app.use(
    "*",
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500).json(err.message);
    },
);

process.on("uncaughtException", (e) => {
    console.error("uncaughtException", e.message, e.stack);
    process.exit(1);
});

app.listen(3000, ()=>{
    console.log('Server is running')
})