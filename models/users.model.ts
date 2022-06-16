export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

export type TResponseData = IUser[] | [] | IUser;