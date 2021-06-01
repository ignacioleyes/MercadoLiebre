const express = require("express");
const path = require("path");
const routesProducts = require("./routes/products")
const routesMain = require("./routes/main");
const routesUsers = require("./routes/users");
const { json } = require("express");
const methodOverride = require("method-override")
const session = require("express-session");
const productsLogs = require("./middlewares/productsLogs");
const cookieParser = require("cookie-parser");

const app = express();

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Servidor corriendo en el puerto 3000");
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(productsLogs);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(session( {secret: "Mensaje secreto", resave: true, saveUninitialized: true} ));

app.use("/", routesMain);
app.use("/products", routesProducts);
app.use("/users", routesUsers);

app.use((req, res, next)=>{
    res.status(404).render("not-found");
    next();
})





