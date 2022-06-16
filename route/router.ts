import { IUser } from "./../models/users.model";
import { HTTPMethod } from "./../models/request.model";
import { ServerResponse, IncomingMessage } from "node:http";
import DataController from "../src/DataController";
import url from "node:url";
import ResponseController from "../src/ResponseController";
import dataBufferGetter from "../src/utils/dataBufferGetter";
import { ResponseErrorMessage, ResponseStatus } from "../models/response.model";

export const router = async (
  request: IncomingMessage,
  response: ServerResponse,
  dataController: DataController,
) => {
  const requestController = new ResponseController(response);
  const requestUrl = request.url || "/";
  const requestPathName = url.parse(requestUrl, true).pathname;
  const requestBodyData = await dataBufferGetter(request);
  const userId: string | undefined = requestPathName?.split("/")[3];
  console.log(requestPathName);
  switch (requestPathName) {
    case "/api/users":
      if (request.method == HTTPMethod.GET) {
        requestController.successResponse(dataController.data);
      } else if (request.method == HTTPMethod.POST) {
        if (dataController.createNewUser(requestBodyData)) {
          requestController.userCreated();
        } else {
          requestController.badRequest(ResponseErrorMessage.CREATE_USER);
        }
      }
      break;
    case `/api/users/${userId}`:
      if (request.method == HTTPMethod.GET) {
        const requestStatus: ResponseStatus =
          dataController.getUserByID(userId);
        if (requestStatus == ResponseStatus.BAD_REQUEST) {
          requestController.badRequest(ResponseErrorMessage.INCORRECT_ID);
        } else if (requestStatus == ResponseStatus.CORRECT) {
          requestController.successResponse(dataController.dataResponse);
        } else if (requestStatus == ResponseStatus.USER_NOT_FUNDED) {
          console.log("sorry");
        }
      }
      break;
    default:
      break;
  }
};
