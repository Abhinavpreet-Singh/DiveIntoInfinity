import express, { type Request, type Response } from "express";

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Dive Into Infinity API" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
