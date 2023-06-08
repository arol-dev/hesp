import {
  describe,
  expect,
  beforeAll,
  afterAll,
  it,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { all } from "cypress/types/bluebird";
import fetch from "node-fetch";

const baseUrl = "http://localhost:4000/api";

describe("user endpoints", () => {
  let reqBody: any;

  beforeEach(async () => {
    reqBody = {
      firstName: "Test",
      lastName: "User",
      email: `test${Date.now()}@test.com`,
      role: "STAFF",
      password: "password",
    };
  });
  it("should create a user", async () => {
    const res: any = await fetch(`${baseUrl}/staff/createCoach`, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data }: any = await res.json();

    expect(data.id).toBeTruthy();
    expect(res.status).toBe(200);
    expect(data.firstName).toBe(reqBody.firstName);
    expect(data.lastName).toBe(reqBody.lastName);
    expect(data.email).toBe(reqBody.email);
    expect(data.password).toBeTruthy();
  });

  it("should get all users", async () => {
    const res = await fetch(`${baseUrl}/staff/staff`, {
      method: "GET",
    });

    let allUsers: any = await res.json();

    expect(res.status).toBe(200);
    expect(Array.isArray(allUsers)).toBe(true);
    allUsers.forEach((item: any) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("firstName");
      expect(item).toHaveProperty("lastName");
      expect(item).toHaveProperty("email");
      expect(item).toHaveProperty("role");
      expect(item).toHaveProperty("password");
    });
  });

  it("should update a user", async () => {
    const newUser: any = await fetch(`${baseUrl}/staff/createCoach`, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let user: any = await newUser.json();
    user = user.data;

    const updatedData = {
      id: user.id,
      firstName: "Test123",
      lastName: "User123",
    };

    const res: any = await fetch(`${baseUrl}/staff/updateCoach`, {
      // updated the endpoint
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const updatedResult: any = await res.json();

    expect(res.status).toBe(200);
    expect(updatedResult.data.firstName).toBe(updatedData.firstName);
    expect(updatedResult.data.lastName).toBe(updatedData.lastName);
    expect(updatedResult.data.email).toBe(user.email);
  });
});
