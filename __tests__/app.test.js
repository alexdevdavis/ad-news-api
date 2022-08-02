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
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: returns an article object with desired properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
        });

        expect(Object.keys(body.article)).toHaveLength(7);
      });
  });
  test("400: returns an error when passed an invalid article id data type", () => {
    return request(app)
      .get("/api/articles/wombatsurprise")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("404: returns an error when passed a non-existent article_id", () => {
    return request(app)
      .get("/api/articles/440404")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found")
      });
  });
});
