import { Request, Response } from "express";
import { IUser } from "../../types";
import database from "../../database";
import { UserTable } from "../../database/model";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
    const reqUser: Pick<IUser, "email" |"password"> = req.body;

    try {
        await database.sync();

        const userFound = (await UserTable.findOne({ where: { password: reqUser.password, email: reqUser.email} }) as unknown as IUser);

        if (!userFound)
            return res.status(404).json({ error: 'User not found' });

        const { access_level, email, id } = userFound;
        let bearerToken = jwt.sign({id, email, access_level}, process.env.JWT_SECRET as string);

        return res.status(200).json({id, email, access_level, token: bearerToken});
    } catch (ex) {
        res.status(500).send(ex);
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({auth: false, token: null});
    } catch (ex) {
        res.status(500).send(ex);
    }
}