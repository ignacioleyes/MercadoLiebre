const express = require("express");
const router = express.Router();
const path = require("path");
const productsController = require("../controllers/productsController");

const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

router.get("/", productsController.products);

router.get("/new", productsController.newProduct);
router.post("/new", productsController.createProduct);

router.get("/:idProducto", productsController.show);



module.exports = router;