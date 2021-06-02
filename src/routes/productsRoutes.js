const express = require("express");
const path = require("path");
const router = express.Router();
const {body} = require("express-validator")
const multer = require("multer");
const productsController = require("../controllers/productsController");


//---------------VALIDACIONES----------------
const validateCreateProduct = [
    body("name").notEmpty().withMessage("Debes completar el campo de nombre").bail().isLength({min: 5, max: 20}).withMessage("El nombre debe tener al menos 5 caracteres"),
    body("price").notEmpty().isInt().withMessage("Debes completar el campo de precio con números"),
    body("discount").notEmpty().isInt().withMessage("Debes completar el campo de descuento con números"),
    body("stock").notEmpty().withMessage("Debes completar el campo de stock"),
    body("category").notEmpty().withMessage("Debes completar el campo de categoría"),
    //body("image").notEmpty().withMessage("Debes seleccionar una imágen pra el producto"),
    body("description").notEmpty().withMessage("Debes completar la descripción del producto").bail().isLength({min: 10, max: 200}).withMessage("La descripción debe tener al menos 10 caracteres"),

];


//---------------MULTER-----------------------
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname, "../../public/img"));
    },
    filename:(req, file, cb)=>{
        const imageName = "product-" + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
})
const fileUpload = multer({ storage: storage });


router.get("/", productsController.index);//*VISTA DE TODOS LOS PRODUCTOS */

router.get("/list", productsController.list);//*VISTA LISTADO DE PRODUCTOS PARA FILTRAR */

router.get("/search", productsController.search);//*VISTA DE ARTICULOS FILTRADOS */

router.get("/productDetail/:id", productsController.show);//*VISTA DETALLE DE PRODUCTO POR ID */

router.get("/edit/:idProduct", productsController.edit);//*VISTA ACTUALIZAR POR ID */

router.get("/update", productsController.update)//*VISTA ACTUALIZAR PRODUCTO */

router.get("/new", productsController.newProduct);//*VISTA FORMULARIO DE CREACION DE PRODUCTOS */


router.post("/new", fileUpload.single("image"), validateCreateProduct, productsController.storeProduct);//*LOGICA DE CREACION DE PRODUCTOS */

router.put("/edit/:idProduct", function(req, res){
    res.send("Fui por PUT");
});



module.exports = router;