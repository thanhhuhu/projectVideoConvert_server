import path from "path";
import fs from "fs/promises";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export const processTranscription = async (
  file: Express.Multer.File,
  language: string
) => {
  const videoPath = file.path;

  const audioFileName =
    `${path.parse(file.filename).name}.wav`;

  const audioPath = path.join(
    path.dirname(videoPath),
    audioFileName
  );

  console.log("Video:", videoPath);
  console.log("Audio:", audioPath);

  try {
    console.log("Starting FFmpeg...");

    await execFileAsync("ffmpeg", [
      "-i",
      videoPath,
      "-vn",
      "-acodec",
      "pcm_s16le",
      "-ac",
      "1",
      "-ar",
      "16000",
      "-y",
      audioPath,
    ]);

    console.log("FFmpeg finished successfully.");

    const audioStats = await fs.stat(audioPath);

    return {
      video: {
        fileName: file.filename,
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
      },
      audio: {
        fileName: audioFileName,
        path: audioPath,
        size: audioStats.size,
        mimeType: "audio/wav",
      },
      language,
    };
  } catch (error) {
    console.error("FFmpeg error:", error);

    try {
      await fs.unlink(audioPath);
    } catch {
      // Ignore cleanup errors when the audio file does not exist.
    }

    throw new Error("Failed to extract audio from video");
  }
};
