import request from "supertest";
import server from "../../server";


let token: string = "";
//! IMPORTANTE: PUEDO HACER LA VALIDACIÓN TAN EXAUTIVA COMO YO QUIERA
describe("POST /api/users", () => {
  test("should display validation errors", async () => {
    const response = await request(server).post("/api/users").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(30);
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

  test("should display an error for an under-age user", async () => {
    const response = await request(server).post("/api/users").send({
      name: "Juan",
      lastName: "Pérez",
      idType: "cc",
      userId: 1234567890,
      dateOfBirth: "2008-05-15",
      address: "123 Main Street, City, Country",
      phoneNumber: "+1234567890",
      email: "juan.perez@correo.com",
      role: "gerente",
      jobTitle: "Project Manager",
      user: "juanperez",
      password: "securePassword123.",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe(
      "El usuario debe tener al menos 18 años"
    );
    expect(response.status).not.toBe(201);
  });

  test("should create a new user", async () => {
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
      password: "securePassword123.",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("error");
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("POST /api/users/login", () => {
  test("should display validation error", async () => {
    const response = await request(server).post("/api/users/login").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(3);

    expect(response.status).not.toBe(200);
  });
  test("should display an error when receive a wrong email", async () => {
    const response = await request(server)
      .post("/api/users/login")
      .send({ email: "juan.perezcorreo.com", password: "securePassword123." });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.status).not.toBe(200);
  });

  test("should display an error when receive a empty password", async () => {
    const response = await request(server)
      .post("/api/users/login")
      .send({ email: "juan.perez@correo.com" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.status).not.toBe(200);
  });

  test("should display an error when receive wrong credential", async () => {
    const response = await request(server)
      .post("/api/users/login")
      .send({ email: "juan.perez@correo.com", password: "securePassword123" });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.status).not.toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  test("should log the user", async () => {
    const response = await request(server)
      .post("/api/users/login")
      .send({ email: "juan.perez@correo.com", password: "securePassword123." });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("token");
    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).not.toBe(201);
    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(401);
    expect(response.status).not.toBe(403);

    token = response.body.token;
  });
});

describe("GET /api/users", () => {
  test("should check if api/user exists", async () => {
    const response = await request(server)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.data).toHaveLength(1);

    expect(response.body).not.toHaveProperty("errors");
    expect(response.body).not.toHaveProperty("error");
    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(404);
  });
});

describe("GET /api/users/:id", () => {
  test("should return a 404 response for a non-existing id", async () => {
    const userId = 6;
    const response = await request(server)
      .get(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Usuario no encontrado");
  });

  test("should check a valid ID in the URL", async () => {
    const userId = "not-valid-url";
    const response = await request(server)
      .get(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  test("should get a single user by ID", async () => {
    const userId = 1;
    const response = await request(server)
      .get(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
    expect(response.body.error).not.toBe("Error al obtener usuario");
  });
});

describe("PUT /api/users/:id", () => {
  test("should display validation error messages when updating an empty user", async () => {
    const userId = 1;
    const response = await request(server)
      .put(`/api/users/${userId}`)
      .send({})
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(30);
    expect(response.body.errors).toBeTruthy();
  });

  test("should update the current user chosen by ID", async () => {
    const userId = 1;
    const response = await request(server)
      .put(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "John",
        lastName: "Pérez",
        idType: "cc",
        userId: 1234567890,
        dateOfBirth: "1990-05-15",
        address: "123 Main Street, City, Country",
        phoneNumber: "+1234567890",
        email: "james.perez@correo.com",
        role: "gerente",
        jobTitle: "Inspector",
        user: "juanperez",
        password: "securePassword123.",
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.body).not.toHaveProperty("error");
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("PATCH /api/users/:id", () => {
  test("should display the validation error messages because a wrong token", async () => {
    const userId = 1;
    const worngToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlciI6Imp1YW5wZXJleiIsIm5hbWUiOiJKYW1lcyIsImxhc3ROYW1lIjoiUMOpcmV6IiwiYWN0aXZlIjp0cnVlLCJyb2xlIjoiZ2VyZW50ZSIsInByb2ZpbGVQaWN0dXJlIjpudWxsLCJpYXQiOjE3MjQ0MjA3MzMsImV4cCI6MTcyNDUwNzEzM30.9ikycbe8cQ6wexLEvu84N_WrGoaPcCh-QY6Z53NN5m";
    const response = await request(server)
      .patch(`/api/users/${userId}`)
      .send({ password: "nuevaContrasena13@" })
      .set("Authorization", `Bearer ${worngToken}`);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeTruthy();
    expect(response.body.error).toBe("Tóken no válido");
  });

  test("should display an error due to empty password", async () => {
    const userId = 1;
    const response = await request(server)
      .patch(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");

    expect(response.body).not.toHaveProperty("data");
    expect(response.body.errors).toHaveLength(5);
    expect(response.status).not.toBe(200);
  });

  test("should display an error due to a wrong userId", async () => {
    const userId = 10;
    const response = await request(server)
      .patch(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ password: "nuevaContrasena13@" });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Usuario no encontrado");

    expect(response.body).not.toHaveProperty("data");
    expect(response.status).not.toBe(200);
  });

  test("should display an error due to an invalid userId", async () => {
    const userId = "not-valid-id";
    const response = await request(server)
      .patch(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ password: "nuevaContrasena13@" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");

    expect(response.body).not.toHaveProperty("data");
    expect(response.status).not.toBe(200);
  });

  test("should update the password", async () => {
    const userId = 1;
    const response = await request(server)
      .patch(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ password: "nuevaContrasena13@" });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Contraseña actualizada correctamente");
    expect(response.body).toHaveProperty("data");

    expect(response.body).not.toHaveProperty("error");
    expect(response.body).not.toHaveProperty("errors");

    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(404);
  });
});

describe("PATCH /api/users/update/:id", () => {
  test("should display an error due to the lack of token", async () => {
    const userId = 1;
    const response = await request(server)
      .patch(`/api/users/update/${userId}`)
      .send({
        address: "Calle 155 #67-89, Cartagena, Bolívar, 080020",
        phoneNumber: "+57 100 6549873",
        email: "laura.hernande2z@example.com",
        jobTitle: "ing de sistememas",
        role: "admin",
        user: "laurahernandez",
      });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("No autortizado");

    expect(response.body).not.toHaveProperty("data");
    expect(response.status).not.toBe(200);
  });

  test("should update user", async () => {
    const userId = 1;
    const response = await request(server)
      .patch(`/api/users/update/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        address: "Calle 155 #67-89, Cartagena, Bolívar, 080020",
        phoneNumber: "+57 100 6549873",
        email: "laura.hernande2z@example.com",
        jobTitle: "ing de sistememas",
        role: "admin",
        user: "laurahernandez",
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Usuario actualizado correctamente");

    expect(response.body).not.toHaveProperty("error");
    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(401);
    expect(response.status).not.toBe(404);
  });
});

describe("PATCH /api/users/update-status/:id", () => {
  test("should display an error due to the lack of token", async () => {
    const userId = 1;
    const response = await request(server)
      .patch(`/api/users/update/${userId}`)
      .send({
        address: "Calle 155 #67-89, Cartagena, Bolívar, 080020",
        phoneNumber: "+57 100 6549873",
        email: "laura.hernande2z@example.com",
        jobTitle: "ing de sistememas",
        role: "admin",
        user: "laurahernandez",
      });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("No autortizado");

    expect(response.body).not.toHaveProperty("data");
    expect(response.status).not.toBe(200);
  });

  test("should display an error due an empty property", async () => {
    const userId = 1;
    const response = await request(server)
      .patch(`/api/users/update-status/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        active: "",
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);

    expect(response.body).not.toHaveProperty("data");
    expect(response.body).not.toHaveProperty("message");
    expect(response.status).not.toBe(200);
    expect(response.status).not.toBe(401);
    expect(response.status).not.toBe(404);
  });

  test("should display an error due to a worng data", async () => {
    const userId = 1;
    const response = await request(server)
      .patch(`/api/users/update-status/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        active: 10,
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);

    expect(response.body).not.toHaveProperty("data");
    expect(response.body).not.toHaveProperty("message");
    expect(response.status).not.toBe(200);
    expect(response.status).not.toBe(401);
    expect(response.status).not.toBe(404);
  });

  test("should update the user status", async () => {
    const userId = 1;
    const response = await request(server)
      .patch(`/api/users/update-status/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        active: true,
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Estado actualizado correctamente");

    expect(response.body).not.toHaveProperty("error");
    expect(response.body).not.toHaveProperty("errors");
    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(401);
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(500);
  });
});

describe("POST /api/users/restore-session", () => {
  test("should throw an error dut to the lack of token", async () => {
    const response = await request(server).post("/api/users/restore-session");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("No autortizado");
    expect(response.status).not.toBe(200);
  });

  test("should retore the session", async () => {
    const response = await request(server)
      .post("/api/users/restore-session")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(401);
  });
});

describe("DELETE /api/users/:id", () => {
  //TODO: VALIDAR QUE EL ID SEA VÁLIDO

  test("should display an error for invalid ID", async () => {
    const userId = 10;
    const response = await request(server)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Usuario no encontrado");

    expect(response.body).not.toHaveProperty("data");
    expect(response.status).not.toBe(200);
    expect(response.status).not.toBe(201);
  });

  test("should display an error for a string ID", async () => {
    const userId = "invalid-id";
    const response = await request(server)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Error al eliminar el usuario");

    expect(response.body).not.toHaveProperty("data");
    expect(response.status).not.toBe(200);
    expect(response.status).not.toBe(201);
  });

  test("should delete a user found by ID", async () => {
    const userId = 1;
    const response = await request(server)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toBe("Usuario eliminado correctamente");

    expect(response.body).not.toHaveProperty("error");
    expect(response.body).not.toHaveProperty("errors");
    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(500);
  });
});
