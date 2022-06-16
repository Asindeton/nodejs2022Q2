import { TResponseData } from "./../models/users.model";
import { ServerResponse } from "node:http";
import { IUser } from "../models/users.model";
import { ResponseMessage, ResponseStatus } from "../models/response.model";
export default class ResponseController {
  response: ServerResponse;
  constructor(response: ServerResponse) {
    this.response = response;
  }
  public successResponse(data: TResponseData) {
    this.response.writeHead(200, { "Content-Type": "application/json" });
    this.response.end(JSON.stringify(data, null, 2));
  }
  public sendResponse(status: ResponseStatus, message?: ResponseMessage) {
    this.response.writeHead(status);
    this.response.end(message!);
  }
}
