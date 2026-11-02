import express, { type Request, type Response } from "express";
import cors from "cors";
import { initDb } from "./db/init.ts";
import { slotsRouter } from "./routes/slots.ts";
import { bookingsRouter } from "./routes/bookings.ts";
import { authRouter } from "./routes/auth.ts";
import { adminRouter } from "./routes/admin.ts";
import { HttpError } from "./db/queries.ts";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

// Health check (no DB dependency)
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Dive Into Infinity API" });
});

// Routes
app.use("/slots", slotsRouter);
app.use("/bookings", bookingsRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

// Central error handler — turns thrown HttpError into JSON, everything else 500.
app.use((err: unknown, _req: Request, res: Response, _next: unknown) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }
  console.error("[server] unhandled error:", err);
  res.status(500).json({ error: "Internal server error." });
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("[server] Failed to initialise database:", err);
    process.exit(1);
  });
