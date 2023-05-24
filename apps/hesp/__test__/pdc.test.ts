import {
  describe,
  expect,
  beforeAll,
  afterAll,
  it,
  beforeEach,
  afterEach,
} from "@jest/globals";
import fetch from "node-fetch";

let pdId: any;
const baseUrl = "http://localhost:3000/api";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

describe("createPd", () => {
  let reqBody: {
    userId: any;
    trust?: number;
    willFollow?: number;
    retention?: number;
    commitment?: number;
    cv?: number;
    readyForInterviews?: number;
    advancement?: number;
    sessionNotes?: string;
  };
  let trainee: {
    id: any;
    firstName?: string;
    lastName?: string;
    email?: string | null;
    phone?: string | null;
    registerNumber?: string | null;
    coachId?: number | null;
  };

  beforeEach(async () => {
    trainee = await prisma.trainee.create({
      data: {
        firstName: "Test",
        lastName: "User",
      },
    });

    reqBody = {
      userId: trainee.id.toString(), // Convert trainee ID to string
      trust: 5,
      willFollow: 7,
      retention: 7,
      commitment: 7,
      cv: 7,
      readyForInterviews: 7,
      advancement: 5,
      sessionNotes: JSON.stringify([
        {
          topic: "Test topic",
          objective: "Test objective",
          actions: "Test actions",
          notes: "Test notes",
          results: "Test results",
          evaluation: "Test evaluation",
        },
      ]),
    };

    const response: any = await fetch(`${baseUrl}/pdc/createPD`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    const { data } = await response.json(); // Destructure the data property from the response
    pdId = data.id;
  });

  afterEach(async () => {
    await prisma.trainee.delete({ where: { id: trainee.id } });
  });

  it("should respond with 200 and return the updated checkpoint for a valid request", async () => {
    expect(pdId).not.toBeNull();
  });

  // GET endpoint - single PDC
  it("should respond with 200 and return a single PDC for a valid GET request", async () => {
    const response = await fetch(`${baseUrl}/pdc/${pdId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    expect(response.status).toEqual(200);
    expect(data).toMatchObject({
      id: pdId,
      trust: expect.anything(),
      willFollow: expect.anything(),
      retention: expect.anything(),
      commitment: expect.anything(),
      cv: expect.anything(),
      readyForInterviews: expect.anything(),
      advancement: expect.anything(),
      createdAt: expect.anything(),
    });
  });

  // PUT endpoint
  it("should respond with 200 and return the updated PDC for a valid PUT request", async () => {
    const response = await fetch(`${baseUrl}/pdc/${pdId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trust: 6,
      }),
    });

    const data = await response.json();

    expect(response.status).toEqual(200);
    expect(data).toMatchObject({
      id: pdId,
      trust: 6,
      willFollow: expect.anything(),
      retention: expect.anything(),
      commitment: expect.anything(),
      cv: expect.anything(),
      readyForInterviews: expect.anything(),
      advancement: expect.anything(),
      createdAt: expect.anything(),
    });
  });

  // GET endpoint - multiple PDCs
  it("should respond with 200 and return multiple PDCs for a valid GET request", async () => {
    const response = await fetch(`${baseUrl}/pdc/pdc`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    expect(response.status).toEqual(200);
    expect(Array.isArray(data)).toBe(true);
  });

  // Error case
  it("should respond with 500 for an invalid request", async () => {
    reqBody.userId = "abc"; // Invalid userId

    const response = await fetch("http://localhost:3000/api/pdc/createPD", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    const data = await response.json();

    expect(response.status).toEqual(500);
    expect(data).toHaveProperty("error");
  });
  it("should respond with 500 for invalid data for a POST request", async () => {
    const response = await fetch(`${baseUrl}/pdc/createPD`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        haircut: 6,
      }),
    });

    expect(response.status).toEqual(500);
  });
});
