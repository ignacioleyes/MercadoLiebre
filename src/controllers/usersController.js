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
        let errors = validationResult(req);

       if(errors.isEmpty()){
            let usersDatabase = fs.readFileSync(path.join(__dirname, "../data/usersDataBase.json"), {encoding: "utf-8"});
            console.log("usersDatabase",usersDatabase);
            let users;
            if(usersDatabase == ""){
                console.log("a");
                users = [];
            }else{
                users = JSON.parse(usersDatabase);
            }
        const lastID=() => {
            let ultimo = 0;
            users.forEach(user=>{
            if (ultimo<user.id){
                ultimo = user.id;
            }
            });
            return ultimo;
            }
            console.log(req.body);

            let user = {
                id: lastID()+1,
                nombre: req.body.nombre,
                email: req.body.email,
                fechaNacimiento: req.body.fechaNacimiento,
                domicilio: req.body.domicilio,
                perfilUsuario: req.body.perfilUsuario,
                categoria: req.body.categorias,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.file.filename,
            }
            users.push(user);
            console.log("user",user);

            
            users = JSON.stringify(users, null, 4);
            console.log("users",users);
            
            fs.writeFileSync(path.join(__dirname, "../data/usersDataBase.json"), users); 

            res.redirect("/");

        }else{
            console.log(resultValidation.mapped())
        res.render("users/register", {
            errors: resultValidation.mapped(),
            oldData: req.body
        });
       }
    },
    //procesar la ruta post de login
    processLogin: function(req, res){
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let usersJson = fs.readFileSync(path.join(__dirname, "../data/usersDatabase.json"), {encoding: "utf-8"});
            let users;
            if(usersJson == ""){
                users = [];
            }else{
                users = JSON.parse(usersJson);
            }
            let usuarioALoguearse;
            
            for(let i = 0; i<users.length; i++){
                if(users[i].email == req.body.email){
                    if(bcrypt.compareSync(req.body.password, users[i].password)){
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