import cloudinary from "../config/cloudinary.js";

const uploadPicture = async (path) => {
  try {
    const { secure_url, public_id } = await cloudinary.uploader.upload(path);
    return {
      secure_url,
      public_id,
    };
  } catch (error) {
    return error;
  }
};

const deletePicture = async (id) => {
  try {
    await cloudinary.uploader.destroy(id);
    return true;
  } catch (error) {
    return false;
  }
};

export { uploadPicture, deletePicture };
