import request from "supertest";
import app from "../app.js";

describe("Server basic tests", () => {
  it("should return 404 for unknown routes", async () => {
    const res = await request(app).get("/api/v1/unknown");
    expect(res.status).toBe(404);
  });
});
