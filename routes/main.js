const express = require("express");
const path = require("path");
const router = express.Router();

const app = express();


const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

//Ruta de direccionamiento al home-------------------------------
router.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../views/home.html"))
})
//Ruta de direccionamiento al login------------------------------
router.get("/login", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../views/login.html"))
})
//Ruta de direccionamiento al register---------------------------
router.get("/register", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../views/register.html"))
})




module.exports = router;