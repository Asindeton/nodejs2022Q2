import { IncomingMessage } from "node:http";

export default async function dataBufferGetter(request: IncomingMessage) {
  try {
    const buffers = [];
    for await (const chunk of request) {
      buffers.push(chunk);
    }
    return JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    return [];
  }
}
