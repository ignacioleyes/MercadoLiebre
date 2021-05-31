const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
//const jsonTable = require("../data/users.json");

let usersControllers = {

    //mostrar formulario login------------
    login: function(req, res){
        res.render("./users/login");
    },
    //mostrar formulario register------------
    register: function (req, res){
        res.render("./users/register");
    },
    //procesar la ruta post de login
    processLogin: function(req, res){
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let usersJson = fs.readFileSync(path.join(__dirname, "../data/users.json"), {encoding: "utf-8"});
            let users;
            if(usersJson == ""){
                users = [];
            }else{
                users = JSON.parse(usersJson);
            }
            for(let i = 0; i<users.length; i++){
                if(users[i].email == req.body.email){
                    if(bcrypt.compareSync(req.body.password, users[i].password)){
                        let usuarioAloguearse = users[i];
                        break;
                    }
                }
            }
            if(usuarioAloguearse == udefined){
                return res.render("./users/login", {errors: [
                    {msg: "Credenciales inválidas"}
                ]});
            }
            req.session.usuarioLogueado =  usuarioAloguearse;
            res.render("succes");

        }else{
            res.render("./users/login", {errors: errors.errors})
        }

    },


}


module.exports = usersControllers;