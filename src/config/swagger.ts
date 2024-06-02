import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    tags: [
      {
        name: "Reports",
        description: "API operations related to reports",
      },
    //   {
    //     name: "Tenders",
    //     description: "API operations related to reports",
    //   },
    //   {
    //     name: "Auth",
    //     description: "API operations related to reports",
    //   },
    ],
    info: {
      title: "REST API NODE.JS / EXPRESS / TYPESCRIPT",
      version: "1.0.0",
      description: "API Docs for visit reports",
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec