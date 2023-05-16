import { describe, beforeEach, it, expect } from '@jest/globals';
import fetch from 'node-fetch';

const baseUrl = 'http://localhost:3000/api';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

describe('Describe HE', () => {
  let reqBody: {
    id?: number;
    firstName: string;
    lastName: string;
    email?: string | null;
    phone?: string | null;
    registerNumber?: string | null;
  };

  beforeEach(async () => {
    reqBody = {
      firstName: 'Test',
      lastName: 'User',
    };
  });

  it('should create a new HE', async () => {
    const res = await fetch(`${baseUrl}/he/he`, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    expect(res.status).toBe(201);
    expect(data).toMatchObject(reqBody);
    expect(data).toHaveProperty('id');
  });

  it('should get all HEs', async () => {
    const res = await fetch(`${baseUrl}/he/he`, {
      method: 'GET',
    });
    const data: any = await res.json();
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    data.forEach((item: any) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('firstName');
      expect(item).toHaveProperty('lastName');
      expect(item).toHaveProperty('email');
      expect(item).toHaveProperty('phone');
      expect(item).toHaveProperty('registerNumber');
    });
  });

  it('should get a single HE', async () => {
    const newHe = await prisma.trainee.create({
      data: reqBody,
    });
    const res = await fetch(`${baseUrl}/he/${newHe.id}`, {
      method: 'GET',
    });
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data).toMatchObject(reqBody);
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('firstName');
    expect(data).toHaveProperty('lastName');
    expect(data).toHaveProperty('email');
    expect(data).toHaveProperty('phone');
  });

  it('should update a HE', async () => {
    const newHe = await prisma.trainee.create({
      data: reqBody,
    });
    const res = await fetch(`${baseUrl}/he/${newHe.id}`, {
      method: 'PUT',
      body: JSON.stringify({ firstName: 'Updated', lastName: 'User' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data: any = await res.json();
    expect(res.status).toBe(200);
    expect(data.firstName).toMatch('Updated');
    expect(data).toHaveProperty('id');
    expect(data.lastName).toMatch('User');
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('firstName');
    expect(data).toHaveProperty('lastName');
    expect(data).toHaveProperty('email');
    expect(data).toHaveProperty('phone');
  });

  it('should not update a HE', async () => {
    const newHe = await prisma.trainee.create({
      data: reqBody,
    });
    const res = await fetch(`${baseUrl}/he/${newHe.id}`, {
      method: 'PUT',
      body: JSON.stringify({ firstName: 'Updated', last: 'User' }),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.status).toBe(500);
  });

  it('should not create a new HE', async () => {
    const res = await fetch(`${baseUrl}/he/he`, {
      method: 'POST',
      body: JSON.stringify({ firstName: 'Test' }),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.status).toBe(500);
  });
});
