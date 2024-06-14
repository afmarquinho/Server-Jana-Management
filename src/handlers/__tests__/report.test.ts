import server from "../../server";
import request from "supertest";

describe("POST api/report", () => {
  test("should create a new report", async () => {
    const response = await request(server)
      .post("/api/report")
      .send({
        name: "Inspección y ajuste de válvulas de seguridad",
        customerName: "Cauca",
        city: "Cali",
        contactName: "Laura García",
        phoneNumber: "3117654321",
        email: "laura.garcia@example.com",
        priority: "medium",
        description:
          "Inspección y ajuste de las válvulas de seguridad en la planta de procesamiento.",
        visitDate: "2024-06-11",
        dueDate: "2024-07-05",
        ref: "REF-131415",
        workforce: [
          {
            workforce: "Especialista en válvulas",
            workshift: 2,
          },
          {
            workforce: "Técnico de seguridad",
            workshift: 1,
          },
        ],
        material: [
          {
            material: "Válvulas de seguridad",
            amount: 15,
            unit: "unidades",
          },
          {
            material: "Kit de herramientas de ajuste",
            amount: 5,
            unit: "sets",
          },
        ],
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
  });
});
