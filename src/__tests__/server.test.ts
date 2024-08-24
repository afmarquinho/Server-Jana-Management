import { connectDB } from "../server";
import db from "../config/db";

describe("connectDB", () => {
  jest.mock("../server");
  test("should handle datebase connection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(
        new Error("Hubo un error al conectarse a la base de datos")
      );
    const consoleSpy = jest.spyOn(console, "log");
    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Hubo un error al conectarse a la base de datos")
    );
  });
});
