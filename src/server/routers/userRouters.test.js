require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const request = require("supertest");
const app = require("..");
const connectDB = require("../../database");
const User = require("../../database/models/User");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await connectDB(uri);
});
beforeEach(async () => {
  const password = await bcrypt.hash("1234", 2);
  await User.create({
    name: "Marta",
    userName: "Luis",
    image: "unaimagendeMArtayLuis.jpg",
    password,
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a userRouter", () => {
  describe("When it receives a post petition at /register/ ", () => {
    test("Then it should respons with a status 201", async () => {
      const user = {
        name: "Luis",
        userName: "Marta",
        password: "1234",
        image: "unaimagendeMArtayLuis.jpg",
      };

      const { body } = await request(app)
        .post("/register")
        .send(user)
        .expect(201);

      expect(body.username).toBe(user.username);
    });
  });
});
