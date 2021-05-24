const express = require("express");
const path = require("path");
const router = express.Router();
const productsController = require("../controllers/productsController");

const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

router.get("/", productsController.index);//*VISTA DE TODOS LOS PRODUCTOS */

router.get("/list", productsController.list);//*VISTA LISTADO DE PRODUCTOS PARA FILTRAR */

router.get("/search", productsController.search);//*VISTA DE ARTICULOS FILTRADOS */

router.get("/productDetail/:idProduct", productsController.show);//*VISTA DETALLE DE PRODUCTO POR ID */

router.get("/edit/:idProduct", productsController.edit);//*VISTA ACTUALIZAR POR ID */

router.get("/update", productsController.update)//*VISTA ACTUALIZAR PRODUCTO */

router.get("/new", productsController.newProduct);//*VISTA FORMULARIO DE CREACION DE PRODUCTOS */


router.post("/new", productsController.storeProduct);//*LOGICA DE CREACION DE PRODUCTOS */

router.put("/edit/:idProduct", function(req, res){
    res.send("Fui por PUT");
});



module.exports = router;