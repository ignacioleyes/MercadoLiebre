let mainController = {
    //mostrar página proncipal------------
    index: function(req, res){
        res.render("index");
    },
     //mostrar formulario login------------
    login: function(req, res){
        res.render("login");
    },
    //mostrar formulario register------------
    register: function (req, res){
        res.render("register");
    },  

};

module.exports = mainController;