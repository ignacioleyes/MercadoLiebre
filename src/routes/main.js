const express = require("express");
const path = require("path");
const router = express.Router();
const {check} = require("express-validator")
const mainController = require("../controllers/mainController");
const { maxHeaderSize } = require("http");

const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

//---------------VALIDACIONES----------------
const validateUser = [
    check("usuario").notEmpty().withMessage("Debes completar el campo nombre").bail().isLength({min: 5, max: 20}),
    check("email").notEmpty().withMessage("Debes ingresar un email").bail().isEmail("La dirección ingresada no es válida"),

]


//Ruta de direccionamiento al home-------------------------------
router.get("/", mainController.index);

//Ruta de direccionamiento al login------------------------------
router.get("/login", mainController.login);

//Ruta de direccionamiento al register---------------------------
router.get("/register", mainController.register);




module.exports = router;