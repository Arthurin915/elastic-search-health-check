import { IUser } from "../../models";

export default interface UpdateUserProps{
    onUpdate: Function;
    userInfo: IUser;
}