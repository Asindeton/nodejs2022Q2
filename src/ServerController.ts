import { DataController } from "./DataController";
import { ServerResponse } from "node:http";
import { IncomingMessage } from "node:http";
import dotenv from "dotenv";
import http from "http";
import { router } from "../route/router";

export default function ServerController(dataController: DataController) {
  dotenv.config();
  const pid = process.pid;
  const port = process.env.PORT || 3000;

  const server = http.createServer(
    (request: IncomingMessage, response: ServerResponse) => {
      try {
        router(request, response, dataController);
      } catch (error) {
        console.log(error);
        response.statusCode = 500;
        response.end();
      }
      console.log(`process id: ${pid} got a message`);
    },
  );

  server.listen(port, () => {
    console.log(`server is listening on ${port}, process id: ${pid}`);
  });
}
