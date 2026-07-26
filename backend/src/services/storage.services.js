const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT

});

async function uploadFile(file, fileName) {
  try {
    const result = await imagekit.files.upload({
      file: file,
      fileName: fileName
    });
    return result;
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw error;
  }
}
// Return the URL of the uploaded file

module.exports = {
    uploadFile
}