const { request } = require("express");

let productsController = {
    index: function(req, res){
        res.render("products");
    },
    show: function (req, res){
        res.send("Bienvenido al detalle de producto " + req.params.idProduct);
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
        
        res.render("editProduct", {productsToEdit: productsToEdit});
    },
    update: function(req, res){
        res.send("Vista para actualizar producto")
    },
    newProduct: function(req, res){
        res.render("newProduct");
    },
    storeProduct: function(req, res){
        res.send(req.body);
    },

};

module.exports = productsController;