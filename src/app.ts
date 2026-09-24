import express from "express";
import cors from "cors";

import transcriptionRoutes from "./routes/transcription.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Video Transcriber API is running",
  });
});

app.use("/api", transcriptionRoutes);

export default app;
