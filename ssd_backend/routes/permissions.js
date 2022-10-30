const express = require("express");
const router = express.Router();

const permissionController = require("../controllers/permissionController");

router.get("/permissions", permissionController);

module.exports = router;
