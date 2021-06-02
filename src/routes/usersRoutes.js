const express = require("express");
const path = require("path");
const router = express.Router();
const {check} = require("express-validator")
const usersController = require("../controllers/usersController");
const { maxHeaderSize } = require("http");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/avatars"));

    },
    filename: (req, file, cb) => {
        const fileName = "user-" + Date.now() + path.extname(file.originalname);
        cb(null, fileName);

    }
})

const uploadFile = multer({ storage: storage });




//---------------VALIDACIONES----------------
const validateUserLogin = [
    check("usuario").notEmpty().withMessage("Debes completar el campo nombre").bail().isLength({min: 5, max: 20}),
    check("email").notEmpty().withMessage("Debes ingresar un email").bail().isEmail(),
];
const validateUserRegister = [
    check("nombre"),
    check("email"),
    check("fechaNacimiento"),
    check("domicilio"),
    check("domicilio")
]

//Ruta de direccionamiento al login------------------------------
router.get("/login", usersController.login);
router.post("/login", validateUserLogin ,usersController.processLogin);

//Ruta de direccionamiento al register---------------------------
router.get("/register", usersController.register);
router.post("/register", uploadFile.single("avatar") ,usersController.processRegister);





module.exports = router;