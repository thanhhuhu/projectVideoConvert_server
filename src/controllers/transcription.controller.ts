import type { Request, Response } from "express";

import {
  processTranscription,
} from "../services/transcription.service";

export const transcribeVideo = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Video file is required",
      });
    }

    const language =
      typeof req.body.language === "string"
        ? req.body.language
        : "en";

    const result = await processTranscription(
      req.file,
      language
    );

    return res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      data: result,
    });
  } catch (error) {
    console.error("Transcription error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process video",
    });
  }
};
