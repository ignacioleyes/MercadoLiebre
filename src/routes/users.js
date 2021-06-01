const express = require("express");
const path = require("path");
const router = express.Router();
const {check} = require("express-validator")
const usersController = require("../controllers/usersController");
const { maxHeaderSize } = require("http");

const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

//---------------VALIDACIONES----------------
const validateUser = [
    check("usuario").notEmpty().withMessage("Debes completar el campo nombre").bail().isLength({min: 5, max: 20}),
    check("email").notEmpty().withMessage("Debes ingresar un email").bail().isEmail(),

];

//Ruta de direccionamiento al login------------------------------
router.get("/login", usersController.login);
router.post("/login", validateUser ,usersController.processLogin);

//Ruta de direccionamiento al register---------------------------
router.get("/register", usersController.register);




module.exports = router;