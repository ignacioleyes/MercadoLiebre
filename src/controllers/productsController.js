const { request } = require("express");
const fs = require("fs");
const path = require("path")
const jsonTable = require("../data/productsDataBase.json");


let productsController = {
    index: function(req, res){
        res.render("./products/products")
    },
    list: function(req, res){

        let archivoJSON = fs.readFileSync(path.join(__dirname, "../data/productsDataBase.json"), {encoding: "utf-8"});

        let products = JSON.parse(archivoJSON);

        res.render("./products/productsList", {"products": products});
    },
    show: function (req, res){
        let idProduct = req.query.id;
        let archivoJSON = fs.readFileSync(path.join(__dirname, "../data/productsDataBase.json"), {encoding: "utf-8"});
        let products = JSON.parse(archivoJSON);
        for(let i = 0; i < products.length; i++){
            if(products[i].id == idProduct){
                res.render("./products/productDetail", {"products":products[i].id});
                
            }
        }
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

        res.render("./products/productsResults", {"productsResults": productsResults})
        

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
        res.render("./products/newProduct");
    },
    storeProduct: function(req, res){//*CON ESTA LOGICA OBTENEMOS LA DATA QUE VIENE DESDE EL FORMULARIO */
        
        if(req.file){       
        let product = {
            id: lastID()+1,
            nombre: req.body.nombre,
            precio: req.body.precio,
            stock: req.body.stock,
            categoria: req.body.categorias,
            image: req.file.filename,
            descripcion: req.body.descripcion,
        }       
        product.image
        //*GUARDAR EN EL JSON EL PRODUCTO NUEVO CREADO EN EL FORMULARIO */
        let productsDatabase = fs.readFileSync(path.join(__dirname, "../data/productsDataBase.json"), {encoding: "utf-8"});
        let products;
        if(productsDatabase == ""){
            products = [];
        }else{
            products = JSON.parse(productsDatabase);
        }
        const lastID=() => {
            let ultimo = 0
            products.forEach(product=>{
            if (ultimo<product.id){
            ultimo = product.id;
            }
        });
            return ultimo;
        }
        console.log(products);
        products.push(product);
        console.log(products);

        products = JSON.stringify(products);

        fs.writeFileSync(path.join(__dirname, "../data/productsDataBase.json"), products);

        res.redirect("list")//*REDIRIGIMOS LA INFORMACION OBTENIDA Y GUARDADA DEL FORMULARIO */
        }else{
            res.render("./products/newProduct");
        }
        
    },

};

module.exports = productsController;