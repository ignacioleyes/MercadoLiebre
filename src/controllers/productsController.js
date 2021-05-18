let productsController = {
    products: function(req, res){
        res.render("products");
    },
    newProduct: function(req, res){
        res.render("newProduct");
    },
    createProduct: function(req, res){
        res.send(req.body);
    },
    show: function (req, res){
        //res.send("Bienvenido al detalle de producto " + req.params.idProducto);
    },

};

module.exports = productsController;