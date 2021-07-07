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

    if (!insertedUser) {
      return res.status(404).json({ error: "Error trying to insert a new user" });
    }
    return res.status(200).json(insertedUser);
  } catch (ex) {
    res.status(500).send(ex);
  }
}


export const updateUser = async (req: Request, res: Response) => {
  const body = req.body as IUser;
  try {
    await database.sync();
    const updatedUser = await UserTable.update({
      email: body.email,
      password: body.password,
      access_level: body.access_level,
    }, { where: { id: body.id } })

    if (!updatedUser) {
      return res.status(404).json({ error: "Error trying to update the user" });
    }

    return res.status(200).json(updatedUser);
  } catch (ex) {
    res.status(500).send(ex);
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const body = req.body as Pick<IUser, "id">;
  try {
    await database.sync();
    await UserTable.destroy({
      where: { id: body.id }
    });

    return res.status(200).send("");
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