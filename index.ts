import DataController from "./src/DataController";
import { router } from "./route/router";
import http, { IncomingMessage, ServerResponse } from "node:http";
import url from "node:url";

const dataController = new DataController();
const port = process.env.PORT || 3000;

http
  .createServer((request: IncomingMessage, response: ServerResponse) => {
    try {
      router(request, response, dataController);
    } catch (error) {
      console.log(error);
      response.statusCode = 500;
      response.end();
    }
  })
  .listen(port);
