import express, { NextFunction, Request, Response } from "express";
import request from "supertest";
import { SafeRouter } from "@/utils/safeRouter/SafeRouter.js";
import { ZodError } from "zod";
import { ValidationError } from "@/utils/errors/validationError/ValidationError.js";

describe(SafeRouter.name, () => {
  it('should call handler when no errors occurs', async () => {
    const app = express();
    const safeRouter = new SafeRouter();
    safeRouter.get("/test", async (_req, res) => {
      res.status(200).send("OK");
    });

    app.use(safeRouter.getRouter());
    const response = await request(app).get("/test");
    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
  });

  it('should pass a ValidationErro to next when ZodError is thrown', async () => {
    const app = express();
    const safeRouter = new SafeRouter();

    safeRouter.get("/test", async (_reg, _res) => {
      throw new ZodError([
        { message: "Invalid data", path: ["data"], code: "invalid_type", expected: "string", received: "number" }])
    })

    app.use(safeRouter.getRouter());
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof ValidationError) {
        res.status(400).send(err.toJson());
      }
    });

    const response = await request(app).get("/test");
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      issues: [
        {
          code: "invalid_type",
          expected: "string",
          message: "Invalid data",
          path: ["data"],
          received: "number",
        }
      ],
      message:"Validation Failed"
    });
  });
});
describe(SafeRouter.name, () => {
  it('should handle POST requests correctly', async () => {
    const app = express();
    const safeRouter = new SafeRouter();

    safeRouter.post("/test", async (req, res) => {
      const { data } = req.body;
      res.status(201).send({ message: `${data} created` });
    });

    app.use(express.json());
    app.use(safeRouter.getRouter());

    const response = await request(app).post("/test").send({ data: "test data" });
    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual({ message: "test data created" });
  });

  it('should apply middleware correctly', async () => {
    const app = express();
    const safeRouter = new SafeRouter();

    const middleware = (req: Request, _res: Response, next: NextFunction) => {
      req.headers["x-custom-header"] = "middleware-applied";
      next();
    };

    safeRouter.use(middleware);
    safeRouter.get("/test", async (req, res) => {
      res.status(200).send({ header: req.headers["x-custom-header"] });
    });

    app.use(safeRouter.getRouter());

    const response = await request(app).get("/test");
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ header: "middleware-applied" });
  });

  it('should pass non-Zod errors to next middleware', async () => {
    const app = express();
    const safeRouter = new SafeRouter();

    safeRouter.get("/test", async () => {
      throw new Error("Unexpected error");
    });

    app.use(safeRouter.getRouter());
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      res.status(500).send({ error: err.message });
    });

    const response = await request(app).get("/test");
    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({ error: "Unexpected error" });
  });
});
