import request from "supertest";
import server from "../../server";

describe("POST /api/report", () => {
  //? TESTING REPORT CREATION
  test("should create a new report", async () => {
    const response = await request(server)
      .post("/api/report")
      .send({
        visitDate: "2024-06-25",
        name: "Project Omega",
        customerName: "Linda Clark",
        nit: 9876543219,
        city: "Las Vegas",
        address: "456 Cypress St",
        phoneNumber: "789-123-6540",
        email: "lindaclark@example.com",
        dueDate: "2024-10-10",
        priority: "high",
        description: "Home theater installation.",
        workforce: [
          { workforce: "Electrician", workShift: 6 },
          { workforce: "Technician", workShift: 5 },
        ],
        materials: [
          { material: "Speakers", amount: 6, unit: "units" },
          { material: "Projector", amount: 1, unit: "unit" },
          { material: "Cables", amount: 200, unit: "meters" },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("errors");
  });
  //? TESTING THE VALIDATION MIDDLEWARES
  test("should display validation errors", async () => {
    const response = await request(server).post("/api/report").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(20);
  });
  //? TESTING THE REQUEST HAS AT LEAST ONE MATERIAL AND WORKFORCE
  test("should display material and workforce error", async () => {
    const response = await request(server).post("/api/report").send({
      visitDate: "225-05-2024",
      name: "Project Epsilon",
      customerName: "Susan Lee",
      nit: 9876543213,
      city: "Phoenix",
      address: "789 Cedar St",
      phoneNumber: "987-123-4567",
      email: "susanlee@example.com",
      dueDate: "2024-09-10",
      priority: "high",
      description: "Bathroom remodeling.",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);
  });
});

describe("GET /API/REPORT", () => {
  test("should check if api/report url exists", async () => {
    const response = await request(server).get("/api/report");
    expect(response.status).not.toBe(404);
  });

  test("should get a json response with reports", async () => {
    const response = await request(server).get("/api/report");
    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");

    expect(response.body.data).toHaveLength(1);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /API/REPORT/:ID", () => {
  test("should get a report with a id param", async () => {
    const reportID = 1;
    const response = await request(server).get(`/api/report/${reportID}`);
    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
  });

  test("should get return a 404 error due to wrong numeric param", async () => {
    const reportID = 2000;
    const response = await request(server).get(`/api/report/${reportID}`);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Reporte no encontrado");

    expect(response.status).not.toBe(200);
  });
  test("should get return a 400 error due to wrong string param", async () => {
    const reportID = "hola";
    const response = await request(server).get(`/api/report/${reportID}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");

    expect(response.status).not.toBe(200);
  });
});

describe("PUT /API/REPORT/:ID", () => {
  test("should display validation error messages when updating a product", async () => {
    const reportID = 1;
    const response = await request(server)
      .put(`/api/report/${reportID}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(20);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("should return a 404 error for a non-existant id param", async () => {
    const reportID = 100;
    const response = await request(server)
      .put(`/api/report/${reportID}`)
      .send({
        visitDate: "2024-06-20",
        name: "Project Omega",
        customerName: "Anna Scott",
        nit: 9876543218,
        city: "Portland",
        address: "123 Palm St",
        phoneNumber: "123-789-4560",
        email: "annascott@example.com",
        dueDate: "2024-09-30",
        priority: "medium",
        description: "Deck construction.",
        workforce: [{ workforce: "Carpenter", workShift: 7 }],
        materials: [
          { material: "Wood", amount: 250, unit: "boards" },
          { material: "Nails", amount: 500, unit: "pieces" },
          { material: "Paint", amount: 25, unit: "liters" },
        ],
      });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Reporte no encontrado");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("should update an existinf report with valid data", async () => {
    const reportID = 1;
    const response = await request(server)
      .put(`/api/report/${reportID}`)
      .send({
        visitDate: "2024-06-20",
        name: "Project Gamma",
        customerName: "Anna Scott",
        nit: 9876543218,
        city: "Portland",
        address: "123 Palm St",
        phoneNumber: "123-789-4560",
        email: "annascott@example.com",
        dueDate: "2024-09-30",
        priority: "medium",
        description: "Deck construction.",
        workforce: [{ workforce: "Carpenter", workShift: 7 }],
        materials: [
          { material: "Wood", amount: 250, unit: "boards" },
          { material: "Nails", amount: 500, unit: "pieces" },
          { material: "Paint", amount: 25, unit: "liters" },
        ],
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
    expect(response.body).not.toHaveProperty("error");
  });
});

describe("DELETE /API/REPORT/:ID", () => {
  test("should check a valid ID", async () => {
    const reportID = "hola";
    const response = await request(server).delete(`/api/report/${reportID}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("ID no válido");
  });

  test("should return 404 response for a non-existent report", async () => {
    const reportID = "1000";
    const response = await request(server).delete(`/api/report/${reportID}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Reporte no encontrado");
  });
// TODO: CORREGIR EL TEST DE ELIMINAR
  // test("should delete a report", async () => {
  //   const reportID = "1";
  //   const response = await request(server).delete(`/api/report/${reportID}`);
  //   expect(response.status).toBe(200);
    
  //   expect(response.status).not.toBe(400);
  //   expect(response.status).not.toBe(404);
  // });
});
