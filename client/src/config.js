const BASE_URL = "http://localhost:8000/";

export const UPLOAD_INFO = {
  No_File: "Please choose a file to upload",
  Invalid_Type: "Unsupported file type",
  UPLOAD_FAILED: "Failed to upload",
  UPLOAD_SUCCESS: "Successfully uploaded",
};

export const ALLOWED_TYPE = ["video/mp4", "audio/mp3"];

export const CHUNK_SIZE = 64 * 1024;

export const API = { UPLOAD_VIDEO: BASE_URL + "upload_video" };
