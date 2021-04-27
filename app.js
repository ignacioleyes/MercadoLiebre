const express = require("express");
const path = require("path");

const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./views/home.html"))//Ruta de direccionamiento al home
})
app.get("/login", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./views/login.html"))//Ruta de direccionamiento al login
})
app.get("/register", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./views/register.html"))//Ruta de direccionamiento al register
})

app.listen(3000, ()=>{
    console.log("Servidor corriendo en el puerto 3000");
})
