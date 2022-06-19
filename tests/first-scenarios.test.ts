import request from "supertest";
import { IUser } from "../models/users.model";
import { server } from "../src/ServerController";

describe("First scenarios", () => {
  let id: string;
  let user: IUser;
  let usersArray: IUser[];
  server.close();

  afterAll(async () => {
    server.close();
  });

  it("Get all records with a GET api/users request (an empty array is expected)", async () => {
    const res = await request(server).get("/api/users");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
  it("A new object is created by a POST api/users request (a response containing newly created record is expected)", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({
        username: "someUserName",
        age: 26,
        hobbies: ["1", "2"],
      });

    id = res.body.id;
    user = res.body;

    expect(res.statusCode).toBe(201);
  });
  it("Get all records with a GET api/users request (an empty array is expected)", async () => {
    const res = await request(server).get("/api/users");
    usersArray = res.body;
    id = usersArray[0].id;
    expect(res.statusCode).toBe(200);
  });
  it("With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)", async () => {
    const res = await request(server).get(`/api/users/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(usersArray[0]);
  });

  it("We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id)", async () => {
    const res = await request(server)
      .put(`/api/users/${id}`)
      .send({ username: "qwerty" });
    expect(res.statusCode).toBe(200);

    const resUsers = await request(server).get(`/api/users/${id}`);

    expect(resUsers.body.username).not.toBe("someUserName");
    expect(resUsers.body.id).toBe(id);
  });

  it("With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)", async () => {
    const res = await request(server).delete(`/api/users/${id}`);

    expect(res.statusCode).toBe(204);
  });
  it("With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)", async () => {
    const res = await request(server).get(`/api/users/${id}`);

    expect(res.statusCode).toBe(404);
  });
});
