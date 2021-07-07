import { IUser } from "../../models";

export type LoginResponse = Omit<IUser, "password"> & {
  token: string;
};

export type LoginRequest = Pick<IUser, "email" | "password">;

export type AuthContextData = LoginResponse & {
  login(loginRequestObj: LoginRequest): Promise<void>;
  logout(): void;
};
