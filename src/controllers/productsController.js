let productsController = {
    //mostrar listado de productos--------------------------
    index: function(){},
    //enviar datos para agregar/crear un producto-----------
    create: function(){},
    //mostrar detallde de productos-------------------------
    show: function (req, res){
        res.send("Bienvenido al detalle de producto " + req.params.idProducto);
    },




};



module.exports = productsController;