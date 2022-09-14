async function uploadSingleFile(req, res) {
  console.log(req.file);
  res.send("Single file uploaded successfully");
}

async function uploadMultipleFiles(req, res) {
  console.log(req.file);
  res.send("Multiple files uploaded successfully");
}

module.exports = { uploadSingleFile, uploadMultipleFiles };
