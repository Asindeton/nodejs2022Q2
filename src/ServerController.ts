import { ServerResponse } from "node:http";
import { IncomingMessage } from "node:http";
import dotenv from "dotenv";
import http from "http";
import { router } from "../route/router";
dotenv.config();
const port = process.env.PORT || 3000;
const pid = process.pid;

export const server = http.createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    try {
      router(request, response);
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
