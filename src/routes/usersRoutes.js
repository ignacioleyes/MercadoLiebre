const express = require("express");
const path = require("path");
const router = express.Router();
const usersController = require("../controllers/usersController");
const {body} = require("express-validator");
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
    body("usuario").notEmpty().withMessage("Debes completar el campo nombre").bail().isLength({min: 5, max: 20}),
    body("email").notEmpty().withMessage("Debes ingresar un email").bail().isEmail(),
];
const validateUserRegister = [
    body("nombre").notEmpty().withMessage("Debes completar el campo nombre"),
    body("email").notEmpty().withMessage("Debes completar con un email").bail().isEmail().withMessage("Debes completar un formato de email válido"),
    body("fechaNacimiento").notEmpty().withMessage("Debes completar el campo fecha de nacimiento"),
    body("domicilio").notEmpty().withMessage("Debes completar el campo domicilio"),
    body("perfilUsuario").notEmpty().withMessage("Debes seleccionar el perfil"),
    body("categorias").notEmpty().withMessage("Debes señeccionar la categoría"),
    body("password").notEmpty().withMessage("Debes elegir una contraseña"),
    body("avatar").custom((value, {req})=>{
        let file = req.file;
        let acceptedExtensions = [".jpg", ".png", ".gif"];
        
        if(!file){
            throw new Error("Tienes que subir una imágen");
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`);

        }


        }
        return true;
    })
]

//Ruta de direccionamiento al login------------------------------
router.get("/login", usersController.login);
router.post("/login", validateUserLogin, usersController.processLogin);

//Ruta de direccionamiento al register---------------------------
router.get("/register", usersController.register);
router.post("/register", uploadFile.single("avatar"), validateUserRegister, usersController.processRegister);





module.exports = router;