require("dotenv").config();
const bcrypt = require("bcrypt");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const connectDB = require("../../database");
const User = require("../../database/models/User");
const userRegister = require("./userControllers");

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
  const cryptPassword = await bcrypt.hash("1234", 2);
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
          name: "joselito",
          userName: "joselit0",
          password: "1234",
          image: "unaimagen.jpg",
        },
      };

      await userRegister(req, res, next);

      expect(mockStatus).toHaveBeenCalledWith(expectedStatus);
      expect(mockJson);
    });
  });
  describe("When it receives a request with an existint userName", () => {
    test("Then it should return a error", async () => {
      const error = new Error("faile to create user");
      const next = jest.fn();
      const req = {
        body: {
          name: "joselito",
          userName: "Pepe",
          password: "1234",
          image: "unaimagen.jpg",
        },
      };
      User.create = jest.fn().mockRejectedValue(error);

      await userRegister(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
