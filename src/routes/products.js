const express = require("express");
const path = require("path");
const router = express.Router();
const productsController = require("../controllers/productsController");

const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

router.get("/", productsController.index);//vista

router.get("/product/:idProduct", productsController.show);//vista

router.get("/edit/:idProduct", productsController.edit);//vista

router.get("/update", productsController.update)//vista

router.get("/new", productsController.newProduct);//vista

router.post("/new", productsController.storeProduct);//logica




module.exports = router;