import request from "supertest";
import { server } from "../src/ServerController";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
describe("Second scenarios", () => {
  server.close();

  afterAll(async () => {
    server.close();
  });

  it("Server should answer with status code 200", async () => {
    const res = await request(server).get("/api/users");

    expect(res.statusCode).toBe(200);
  });
  it("Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)", async () => {
    const id = uuidv5("user_name", uuidv4());
    const res = await request(server).get(`/api/users/${id}`);

    expect(res.statusCode).toBe(404);
  });
  it("Server should answer with status code 400 and corresponding message if request body does not contain required fields", async () => {
    const res = await request(server)
      .post(`/api/users`)
      .send({ username: "user_name", hobbies: [] });

    expect(res.statusCode).toBe(400);
  });
});
