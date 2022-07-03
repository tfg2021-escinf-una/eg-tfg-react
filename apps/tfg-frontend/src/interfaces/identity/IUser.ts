export interface IUser {
  id: number,
  username: string,
  emailAddress: string
  firstName : string,
  lastName?: string,
  role?: string,
};

export interface IRegisterUser
  extends Omit<IUser, "id" | "role"> {
    password: string,
    confirmPassword: string
  }
