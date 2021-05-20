const express = require("express");
const path = require("path");
const router = express.Router();
const mainController = require("../controllers/mainController")

const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

//Ruta de direccionamiento al home-------------------------------
router.get("/", mainController.index);

//Ruta de direccionamiento al login------------------------------
router.get("/login", mainController.login);

//Ruta de direccionamiento al register---------------------------
router.get("/register", mainController.register);




module.exports = router;