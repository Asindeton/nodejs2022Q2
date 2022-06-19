import request from "supertest";
import { server } from "../src/ServerController";

describe("Third scenarios", () => {
  server.close();

  afterAll(async () => {
    server.close();
  });

  it("Requests to non-existing endpoints (e.g. some-non/existing/resource) should be handled (server should answer with status code 404 and corresponding human-friendly message)", async () => {
    const res = await request(server).get("/some-non/existing/resource");

    expect(res.statusCode).toBe(404);
  });

  it("Errors on the server side that occur during the processing of a request should be handled and processed correctly (server should answer with status code 500 and corresponding human-friendly message)", async () => {
    const res = await request(server).post(`/api/users`).send("error");

    expect(res.statusCode).toBe(400);
  });
});
