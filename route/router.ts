import { IUser } from "./../models/users.model";
import { HTTPMethod } from "./../models/request.model";
import { ServerResponse, IncomingMessage } from "node:http";
import DataController from "../src/DataController";
import url from "node:url";
import ResponseController from "../src/ResponseController";
import dataBufferGetter from "../src/utils/dataBufferGetter";
import { ResponseMessage, ResponseStatus } from "../models/response.model";

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

  switch (requestPathName) {
    case "/api/users":
      if (request.method == HTTPMethod.GET) {
        requestController.successResponse(dataController.data);
      } else if (request.method == HTTPMethod.POST) {
        if (dataController.createNewUser(requestBodyData)) {
          requestController.sendResponse(ResponseStatus.CREATED);
        } else {
          requestController.sendResponse(
            ResponseStatus.BAD_REQUEST,
            ResponseMessage.CREATE_USER_ERROR,
          );
        }
      }
      break;
    case `/api/users/${userId}`:
      const requestStatus: ResponseStatus = dataController.getUserByID(userId);
      if (requestStatus == ResponseStatus.BAD_REQUEST) {
        requestController.sendResponse(
          ResponseStatus.BAD_REQUEST,
          ResponseMessage.INCORRECT_ID_ERROR,
        );
        break;
      }
      if (requestStatus == ResponseStatus.USER_NOT_FOUNDED) {
        requestController.sendResponse(
          ResponseStatus.USER_NOT_FOUNDED,
          ResponseMessage.USER_NOT_FOUNDED_ERROR,
        );
        break;
      }
      if (requestStatus == ResponseStatus.OK) {
        if (request.method == HTTPMethod.GET) {
          requestController.successResponse(dataController.dataResponse);
          break;
        } else if (request.method == HTTPMethod.DELETE) {
          requestController.sendResponse(ResponseStatus.NO_CONTENT);
          dataController.deleteUser(userId);
          break;
        } else if (request.method == HTTPMethod.PUT) {
          if (dataController.updateUser(userId!, requestBodyData)) {
            requestController.sendResponse(ResponseStatus.OK);
          } else {
            requestController.sendResponse(
              ResponseStatus.BAD_REQUEST,
              ResponseMessage.INCORRECT_DATA_FOR_UPDATE,
            );
          }
          break;
        }
      }

      break;
    default:
      requestController.sendResponse(
        ResponseStatus.USER_NOT_FOUNDED,
        ResponseMessage.PAGE_NOT_FOUNDED_ERROR,
      );
      break;
  }
};
