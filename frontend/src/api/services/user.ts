import api from ".."
import { IUserForm, IUser } from "../../models";

export const getUserById = async (id: number): Promise<IUser> => (await api.get("/GetUser", { params: { id } })).data;

export const getAllUsers = async (): Promise<IUser[]> => (await api.get("/GetUsers")).data;

export const registerUser = async (user: IUserForm): Promise<IUser> => (await api.post("/RegisterUser", user)).data;
export const updateUser = async (user: IUser): Promise<IUser> => (await api.post("/UpdateUser", user)).data;
export const deleteUser = async (userId: number): Promise<boolean> => (await api.post("/DeleteUser", {id: userId})).data;