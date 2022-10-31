const express = require("express");
const router = express.Router();

const fileUploadController = require("../controllers/fileUploadController");

router.post("/file/file_upload", fileUploadController.thumbUploadMulter.single('image'), fileUploadController.thumbImageUpload);
router.get("/file/:fileName", fileUploadController.readImage);
router.get("/files", fileUploadController.readImages);

module.exports = router;
