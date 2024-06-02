import db from "../config/db";
import server, { connectDB } from "../server";
import request from "supertest";

describe("Primer Test", () => {
  test("Debe revisar que 1 + 1 sean 2", () => {
    expect(1 + 1).toBe(2);
  });
});

jest.mock("../config/db");

describe("connectDB", () => {
  test("should handle database connection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Unable to connect to the database"));
    const consoleSpy = jest.spyOn(console, "log");

    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Unable to connect to the database")
    );
  });
});
