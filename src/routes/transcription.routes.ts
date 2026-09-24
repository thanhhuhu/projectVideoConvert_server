import { Router } from "express";
import multer from "multer";
import path from "path";

import {
  transcribeVideo,
} from "../controllers/transcription.controller";

const router = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },

  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);

    const fileName =
      `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${extension}`;

    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024,
  },

  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "video/mp4",
      "video/quicktime",
      "video/webm",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only MP4, MOV and WEBM files are allowed"
        )
      );
    }
  },
});

router.post(
  "/transcribe",
  upload.single("video"),
  transcribeVideo
);

export default router;
