import { Request, Response } from "express";
import database from "../../database";
import { UserTable } from "../../database/model";
import { IUser } from "../../types";

export const registerUser = async (req: Request, res: Response) => {
  const body = req.body as Omit<IUser, "id">;
  try {
    await database.sync();
    const insertedUser = await UserTable.create({
      email: body.email,
      password: body.password,
      access_level: body.access_level,
    })
    

    return res.status(200).json(insertedUser);
  } catch (ex) {
    res.status(500).send(ex);
  }
}

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
      
    await database.sync();
    const user = (await UserTable.findByPk(userId) as unknown as IUser);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (ex) {
    res.status(500).send(ex);
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    await database.sync();
    const users = (await UserTable.findAll() as unknown as IUser[]);
    
    if (!users) {
      return res.status(404).json({ error: 'Error! Could not find users' });
    }

    return res.status(200).json(users);
  } catch (ex) {
    res.status(500).send(ex);
  }
}