import request from "supertest";
import { expect } from "chai";
import app from "../app.js";

describe("GET /pets", () => {
  it("should return status 200", async () => {
    const res = await request(app).get("/pets");
    expect(res.status).to.equal(200);
  });
});
