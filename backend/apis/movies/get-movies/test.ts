import request from "supertest";
import app from "../../../app";
import COMMON_CONFIG from "../../../config/common-config";

describe("Get Movies API", () => {
  it("should fetch movies with pagination", async () => {
    const res = await request(app).get(
      `${COMMON_CONFIG.BASE_ROUTE}${COMMON_CONFIG.GET_MOVIES_ROUTE}?startRow=0&endRow=10`
    );

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should return startRow for 0 and endRow for abc for invalid pagination", async () => {
    const res = await request(app).get(
      `${COMMON_CONFIG.BASE_ROUTE}${COMMON_CONFIG.GET_MOVIES_ROUTE}?startRow=-1&endRow=abc`
    );

    expect(res.status).toBe(200);
    expect(res.body?.totalRecords).toBe(10);
  });
});

