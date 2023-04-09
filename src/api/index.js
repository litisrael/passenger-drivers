import express from "express";
import { createServer } from "./route/drivers.many.days.routes.js";

export const initializeApp = () => {
  const app = express();

  //midelwer
  // app.use(morgan("dev"));
  app.use(express.json());

  // Routes
  createServer().then((driverRouter) => {
    app.use("/drivers", driverRouter);
  }).catch((error) => {
    console.error("Failed to create driver router:", error);
  });

  // app.use("/api/tasks", taskRoutes);

  return app;
};
