import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",

  headers: { Authorization: "Bearer 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" },
  responseType: "blob",
});

export default axiosInstance;
