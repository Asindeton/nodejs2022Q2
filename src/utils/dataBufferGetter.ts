import { IncomingMessage } from "node:http";
import { IUser } from "../../models/users.model";

export default async function dataBufferGetter(
  request: IncomingMessage,
): Promise<IUser> {
  const buffers = [];
  for await (const chunk of request) {
    buffers.push(chunk);
  }
  return JSON.parse(Buffer.concat(buffers).toString());
}
