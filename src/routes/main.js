const express = require("express");
const path = require("path");
const router = express.Router();
const mainController = require("../controllers/mainController");
const { maxHeaderSize } = require("http");

const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));



//Ruta de direccionamiento al home-------------------------------
router.get("/", mainController.index);




module.exports = router;