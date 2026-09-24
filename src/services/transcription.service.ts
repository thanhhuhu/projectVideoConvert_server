export const processTranscription = async (
  file: Express.Multer.File,
  language: string
) => {
  return {
    fileName: file.filename,
    originalName: file.originalname,
    size: file.size,
    mimeType: file.mimetype,
    language,
  };
};
