const { request } = require("express");
const fs = require("fs");
const path = require("path")
const jsonTable = require("../data/productsDataBase.json");


let productsController = {
    index: function(req, res){
        res.render("products")
    },
    list: function(req, res){

        let archivoJSON = fs.readFileSync(path.join(__dirname, "../data/productsDataBase.json"), {encoding: "utf-8"});

        let products = JSON.parse(archivoJSON);

        res.render("productsList", {"products": products});
    },
    show: function (req, res){
        res.render("productDetail");
    },
    search: function(req, res){
        let loQueBuscoElUsuario = req.query.search; //obtener informacion de un formulario(req.query)

        let archivoJSON = fs.readFileSync(path.join(__dirname, "../data/productsDataBase.json"), {encoding: "utf-8"});

        let products = JSON.parse(archivoJSON);

        let productsResults = [];
        for(let i = 0; i < products.length; i++){
            if(products[i].name.includes(loQueBuscoElUsuario)){
                productsResults.push(products[i]);
            }
        }

        res.render("productsResults", {"productsResults": productsResults})
        

    },
    edit: function(req, res){
        let idProduct = req.params.idProduct;

        let products = [
            {id: 1, name: "Cafetera-Moulinex"},
            {id: 2, name: "MacBook Pro 2019"},
            {id:3, name: "Samsung Galaxy S10"},
            {id: 4, name: "Smart TV Samsung 43"}
        ];

        let productsToEdit = products[idProduct];
        
        res.render("editProduct-save", {productsToEdit: productsToEdit});
    },
    update: function(req, res){
        res.send("Vista para actualizar producto")
    },
    newProduct: function(req, res){
        res.render("newProduct");
    },
    storeProduct: function(req, res){//*CON ESTA LOGICA OBTENEMOS LA DATA QUE VIENE DESDE EL FORMULARIO */
        console.log(req.file);
        let product = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            stock: req.body.stock,
            categoria: req.body.categorias,
            avatar: req.body.avatar,
            descripcion: req.body.descripcion,
        }
        //*GUARDAR EN EL JSON EL PRODUCTO NUEVO CREADO EN EL FORMULARIO */
        let productsDatabase = fs.readFileSync(path.join(__dirname, "../data/productsDataBase.json"), {encoding: "utf-8"});
        let products;
        if(productsDatabase == ""){
            products = [];
        }else{
            products = JSON.parse(productsDatabase);
        }

        products.push(product);

        productsJSON = JSON.stringify(products)


        res.redirect("/products/list")//*REDIRIGIMOS LA INFORMACION OBTENIDA Y GUARDADA DEL FORMULARIO */
    },

};

module.exports = productsController;