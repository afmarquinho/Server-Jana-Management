import request from "supertest";
import server from "../../server";

//!   IMPORTANTE: PUEDO HACER LA VALIDACIÓN TAN EXAUTIVA COMO YO QUIERA
describe("POST /api/user", () => {

  test("should display validation errors", async () => {
    const response = await request(server).post("/api/user").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(28);
  });

  test("should display validation errors for password", async () => {
    const response = await request(server).post("/api/users").send({
      name: "Juan",
      lastName: "Pérez",
      idType: "cc",
      userId: 1234567890,
      dateOfBirth: "1990-05-15",
      address: "123 Main Street, City, Country",
      phoneNumber: "+1234567890",
      email: "juan.perez@correo.com",
      role: "gerente",
      jobTitle: "Project Manager",
      user: "juanperez",
      password: "s",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);
    expect(response.status).not.toBe(201);
  });

  test("should create a new user", async () => {
       const response = await request(server).post("/api/user").send({
        name: "Juan",
        lastName: "Pérez",
        idType: "cc",
        userId: 1234567890,
        dateOfBirth: "1990-05-15",
        address: "123 Main Street, City, Country",
        phoneNumber: "+1234567890",
        email: "juan.perez@correo.com",
        role: "gerente",
        jobTitle: "Project Manager",
        user: "juanperez",
        password: "securePassword123",
       });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data");

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("error");
        expect(response.body).not.toHaveProperty("errors");
      });
});

// //  describe("GET /api/user", () => {
// //    test("should check if api/user exists", async () => {
// //      const response = await request(server).get("/api/user");
// //      expect(response.status).not.toBe(404);
// //    });

// //    test("should display a respoonse with users", async () => {
// //      const response = await request(server).get("/api/user");
// //      expect(response.status).toBe(200);
// //      expect(response.body).toHaveProperty("data");
// //      expect(response.headers["content-type"]).toMatch(/json/);
// //      expect(response.body.data).toHaveLength(1);
// //      expect(response.body).not.toHaveProperty("errors");
// //    });
// //  });

// //  describe("GET /api/user/:id", () => {
// //    test("should return a 404 response for a non-existing id", async () => {
// //      const userId = 6;
// //      const response = await request(server).get(`/api/user/${userId}`);
// //      expect(response.status).toBe(404);
// //      expect(response.body).toHaveProperty("error");
// //      expect(response.body.error).toBe("Usuario no encontrado");
// //    });

// //    test("should check a valid ID in the URL", async () => {
// //      const userId = "not-valid-url";
// //      const response = await request(server).get(`/api/user/${userId}`);
// //      expect(response.status).toBe(500);
// //      expect(response.body).toHaveProperty("error");
// //      expect(response.body.error).toBe("Error al obtener usuario");
// //    });

// //    test("should get a single user by ID", async () => {
// //      const userId = "1";
// //      const response = await request(server).get(`/api/user/${userId}`);
// //      expect(response.status).toBe(200);
// //      expect(response.body).toHaveProperty("data");

// //      expect(response.status).not.toBe(404);
// //      expect(response.status).not.toBe(400);
// //      expect(response.body.error).not.toBe("Error al obtener usuario");
// //    });
// //  });

// //  describe("PUT /api/user/:id", () => {
// //    test("should display validation error messages when updating an user", async () => {
// //      const userId = 1;
// //      const response = await request(server).put(`/api/user/${userId}`).send({});
// //      expect(response.status).toBe(400);
// //      expect(response.body).toHaveProperty("errors");
// //      expect(response.body.errors).toHaveLength(28);
// //      expect(response.body.errors).toBeTruthy();
// //    });

// //    test("should update the current user chosen by ID", async () => {
// //      const userId = 1;
// //      const response = await request(server).put(`/api/user/${userId}`).send({
// //        name: "María",
// //        lastName: "Gómez",
// //        idType: "passport",
// //        ID: "987654321098765",
// //        dateOfBirth: "1985-08-25",
// //        address: "Avenida Siempre Viva 742",
// //        phoneNumber: "0987654321",
// //        email: "maria.gomez@example.com",
// //        jobTitle: "ing cotizacion",
// //        user: "mariagomez",
// //        password: "SecurePass1!",
// //      });
// //      expect(response.status).toBe(200);
// //      expect(response.body).toHaveProperty("data");

// //      expect(response.body).not.toHaveProperty("error");
// //      expect(response.body).not.toHaveProperty("errors");
// //    });
// //  });

// //  describe("DELETE /api/user/:id", () => {
// //   // TODO: VALIDAR QUE EL ID SEA VÁLIDO

// //    test('should delete a user found by ID', async () => {
// //      const userId = 1;
// //      const response = await request(server).delete(`/api/user/${userId}`)
// //      expect(response.status).toBe(200);
// //      expect(response.body).toHaveProperty("data");
// //      expect(response.body.data).toBe("Usuario eliminado correctamente");

// //      expect(response.body).not.toHaveProperty("error");
// //      expect(response.body).not.toHaveProperty("errors");

// //    })

// //  })
