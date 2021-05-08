const express = require("express");
const path = require("path");
const routesProducts = require("./routes/products")
const routesMain = require("./routes/main");

const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));




app.listen(process.env.PORT || 3000, ()=>{
    console.log("Servidor corriendo en el puerto 3000");
})
app.use("/products", routesProducts);
app.use("/", routesMain);
