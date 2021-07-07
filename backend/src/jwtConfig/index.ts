import { Request, Response } from "express";
import jwt from "jsonwebtoken";


export const verifyJWT = (req: Request, res: Response, next: () => void) => {
    const token = (req.headers['authorization'] as string);
    if (!token)
        return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err)
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        next();
    });
}