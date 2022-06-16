import { TResponseData } from "./../models/users.model";
import { ServerResponse } from "node:http";
import { IUser } from "../models/users.model";
export default class ResponseController {
  response: ServerResponse;
  constructor(response: ServerResponse) {
    this.response = response;
  }
  public successResponse(data: TResponseData) {
    this.response.writeHead(200, { "Content-Type": "application/json" });
    this.response.end(JSON.stringify(data, null, 2));
  }
  public badRequest(message: string) {
    this.response.writeHead(400);
    this.response.end(message);
  }
  public userCreated() {
    this.response.writeHead(201);
    this.response.end();
  }
}
