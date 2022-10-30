const express = require("express");
const router = express.Router();

const fileUploadController = require("../controllers/fileUploadController");

router.post("/file_upload", fileUploadController.thumbUploadMulter.single('image'), fileUploadController.thumbImageUpload);
router.get("/file/:fileName", fileUploadController.readImage);

module.exports = router;
