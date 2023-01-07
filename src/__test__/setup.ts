import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';
import * as asb from '../utils/asb-events';

declare global {
  var signin: (userId: string) => string[];
}

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  jest
    .spyOn(asb, 'sendMessage')
    //@ts-ignore
    .mockReturnValueOnce();
});

global.signin = (userId: string) => {
  const payload = {
    id: userId,
    email: 'test@test.com',
    username: 'testuser',
  };
  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
