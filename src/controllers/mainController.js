let mainController = {
    //mostrar página proncipal------------
    index: function(req, res){
        res.render("./main/index");
    },
     //mostrar formulario login------------
    login: function(req, res){
        res.render("./users/login");
    },
    //mostrar formulario register------------
    register: function (req, res){
        res.render("./users/register");
    },  

};

module.exports = mainController;