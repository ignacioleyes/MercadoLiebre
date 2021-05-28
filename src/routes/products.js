const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const productsController = require("../controllers/productsController");

const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

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

router.get("/productDetail/:idProduct", productsController.show);//*VISTA DETALLE DE PRODUCTO POR ID */

router.get("/edit/:idProduct", productsController.edit);//*VISTA ACTUALIZAR POR ID */

router.get("/update", productsController.update)//*VISTA ACTUALIZAR PRODUCTO */

router.get("/new", productsController.newProduct);//*VISTA FORMULARIO DE CREACION DE PRODUCTOS */


router.post("/new", fileUpload.single("image"), productsController.storeProduct);//*LOGICA DE CREACION DE PRODUCTOS */

router.put("/edit/:idProduct", function(req, res){
    res.send("Fui por PUT");
});



module.exports = router;