import api from ".."
import { IUser } from "../../models";

export const getUserById = async (id: number): Promise<IUser> => (await api.get("/GetUser", { params: { id } })).data;

export const getAllUsers = async (): Promise<IUser[]> => (await api.get("/GetUsers")).data;

export const registerUser = async (): Promise<IUser> => (await api.get("/RegisterUser")).data;