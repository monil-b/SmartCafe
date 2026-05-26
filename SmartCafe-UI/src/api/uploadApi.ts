import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/upload`;

export const uploadImage = async (
  file: File
) => {
  const formData = new FormData();

  formData.append("image", file);

  const { data } = await axios.post(
    API_URL,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data.imageUrl;
};