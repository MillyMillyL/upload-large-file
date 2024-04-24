import { UPLOAD_INFO, ALLOWED_TYPE, CHUNK_SIZE, API } from "./config";

((doc) => {
  const oUploadProgress = doc.getElementById("uploadProgress");
  const oVideoUploader = doc.getElementById("videoUploader");
  const oUploadInfo = doc.getElementById("uploadInfo");
  const oUploadBtn = doc.getElementById("uploadBtn");

  let uploadedSize = 0;

  const init = () => {
    bindEvent();
  };

  function bindEvent() {
    oUploadBtn.addEventListener("click", uploadVideo);
  }

  async function uploadVideo() {
    const file = oVideoUploader.files[0];
    //    const {files:[file]} = oVideoUploader

    if (!file) {
      oUploadInfo.innerText = UPLOAD_INFO.No_File;
      return;
    }

    if (!ALLOWED_TYPE.includes(file.type)) {
      oUploadInfo.innerText = UPLOAD_INFO.Invalid_Type;
      return;
    }

    const { name, size, type } = file;
    const fileName = new Date().getTime() + "_" + name;
    let uploadedResult = null;
    oUploadProgress.max = size;
    oUploadInfo.innerText = "";

    while (uploadedSize < size) {
      const fileChunk = file.slice(uploadedSize, uploadedSize + CHUNK_SIZE);

      const formData = createFormData({
        name,
        type,
        size,
        fileName,
        uploadedSize,
        file: fileChunk,
      });

      try {
        uploadedResult = await axios.post(API.UPLOAD_VIDEO, formData);
        console.log(uploadedResult);
      } catch (error) {
        oUploadInfo.innerText = UPLOAD_INFO.UPLOAD_FAILED;
        console.log(error.message);
        return;
      }

      uploadedSize += fileChunk.size;
      oUploadProgress.value = uploadedSize;
    }

    oUploadInfo.innerText = UPLOAD_INFO.UPLOAD_SUCCESS;
    oUploadProgress.value = null;
    createVideo(uploadedResult.data.video_url);
  }

  function createFormData({ name, type, size, fileName, uploadedSize, file }) {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("type", type);
    fd.append("size", size);
    fd.append("fileName", fileName);
    fd.append("uploadedSize", uploadedSize);
    fd.append("file", file);

    return fd;
  }

  function createVideo(src) {
    const oVideo = document.createElement("video");
    oVideo.controls = true;
    oVideo.width = "500";
    oVideo.src = src;
    document.body.appendChild(oVideo);
  }

  init();
})(document);
