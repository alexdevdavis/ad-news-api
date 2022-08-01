const app = require("../app");
const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("200: returns an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toEqual(expect.any(Array));
      });
  });
  test("404: responds with 'not found' for non-existent endpoints", () => {
    return request(app)
      .get("/api/toppics")
      .expect(404)
      .then(({ message }) => {
        expect(message).toBe("not found");
      });
  });
});
