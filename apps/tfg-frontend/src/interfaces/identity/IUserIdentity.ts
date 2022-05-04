import { ITokenResponse } from "./ITokenResponse";
import { IUser } from "./IUser";

export interface IUserIdentity {
    user : IUser,
    tokens : ITokenResponse,
};