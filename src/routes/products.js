const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController.js");

router.get("/:idProducto", productsController.show);




module.exports = router;