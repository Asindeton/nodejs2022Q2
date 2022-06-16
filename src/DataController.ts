import { ResponseStatus } from "./../models/response.model";
import { IUser, TResponseData } from "./../models/users.model";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export default class DataController {
  data: IUser[] = [];
  dataResponse: IUser | [] = [];

  createNewUser(newUserData: IUser) {
    try {
      const { username, age, hobbies }: IUser = newUserData;
      const id = uuidv4();

      if (!username || typeof username != "string") throw new Error();
      if (!age || typeof age != "number") throw new Error();
      if (!hobbies || !Array.isArray(hobbies)) throw new Error();

      this.data.push({
        id,
        username,
        age,
        hobbies,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
  getUserByID(userId: string | undefined) {
    if (!userId || !uuidValidate(userId)) return ResponseStatus.BAD_REQUEST;

    const searchResult = this.data.filter(({ id }: IUser) => id == userId);

    if (searchResult.length == 0) return ResponseStatus.USER_NOT_FOUNDED;

    this.dataResponse = searchResult[0];

    return ResponseStatus.OK;
  }
  deleteUser(userId: string | undefined) {
    this.data = this.data.filter(({ id }: IUser) => id !== userId);
  }
  updateUser(userId: string, newUserData: IUser) {
    try {
      const { username, age, hobbies }: IUser = newUserData;

      if (username && typeof username != "string") throw new Error();
      if (age && typeof age != "number") throw new Error();
      if (hobbies && !Array.isArray(hobbies)) throw new Error();

      if (username || age || hobbies) {
        this.data = this.data.map((user) => {
          if (user.id == userId) {
            const _user: IUser = {
              id: user.id,
              username: username || user.username,
              age: age || user.age,
              hobbies: hobbies || user.hobbies,
            };
            return _user;
          } else {
            return user;
          }
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
