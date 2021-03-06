require("dotenv").config();
const bcrypt = require("bcrypt");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const connectDB = require("../../database");
const User = require("../../database/models/User");
const { userRegister, userLogin } = require("./userControllers");

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: jest.fn().mockReturnValue("token"),
}));

let server;
beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const uri = server.getUri();
  connectDB(uri);
});

beforeEach(async () => {
  const cryptPassword = await bcrypt.hash("1234", 10);
  await User.create({
    name: "Pepe",
    userName: "Pepe",
    password: cryptPassword,
    image: "unaImagen.jpg",
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given a user register controller", () => {
  describe("When it receives a request with valid data", () => {
    test("Then it should call methods status and json of next of res with 201", async () => {
      const mockStatus = jest.fn().mockReturnThis();
      const mockJson = jest.fn();
      const expectedStatus = 201;
      const res = { status: mockStatus, json: mockJson };
      const next = null;
      const req = {
        body: {
          name: "Pepe",
          userName: "Pepon",
          password: "1234",
        },
      };

      await userRegister(req, res, next);

      expect(mockStatus).toHaveBeenCalledWith(expectedStatus);
      expect(mockJson);
    });
  });
  describe("When it receives a request with an existing userName", () => {
    test("Then it should return a error", async () => {
      const error = new Error("failed to create user");
      const next = jest.fn();
      const req = {
        body: {
          name: "joselito",
          userName: "Pepe",
          password: "1234",
        },
      };
      User.create = jest.fn().mockRejectedValueOnce(error);

      await userRegister(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a login user controller", () => {
  describe("When it recives a request", () => {
    test("Then if the user exist should receives a token", async () => {
      const res = {
        json: jest.fn(),
      };
      const req = {
        body: { userName: "Pepe", password: "1234" },
      };
      const token = "token";

      await userLogin(req, res);

      expect(res.json).toHaveBeenCalledWith({ token });
    });

    test("Then if the username or the password is wrong it should return an error", async () => {
      const req = { body: { userName: "Pepo", password: "1236" } };

      const next = jest.fn();

      const error = new Error("Incorrect password or username");

      await userLogin(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
