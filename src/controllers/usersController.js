const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");



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
    //procesar la ruta post de register
    processRegister: function(req, res){
        res.send({
            body: req.body,
            file: req.file
        });
        

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
            let usuarioALoguearse;
            for(let i = 0; i<users.length; i++){
                if(users[i].email == req.body.email){
                    if(req.body.password == users[i].password){
                        usuarioALoguearse = users[i];
                        break;
                    }
                }
            }
            if(usuarioALoguearse == undefined){
                return res.render("./users/login", {errors: [
                    {msg: "Credenciales inválidas"}
                ]});
            }
            req.session.usuarioLogueado =  usuarioALoguearse;

            if(req.body.recordame != undefined){
                res.cookie("recordame", usuarioALoguearse.email, { maxAge: 60000 });

            }

            res.render("./main/index");

        }else{
            res.render("./users/login", {errors: errors.errors})
        }

    },


}


module.exports = usersControllers;