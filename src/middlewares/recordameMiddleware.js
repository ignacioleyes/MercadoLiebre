function recordameMiddleware (req, res, next){
    next();
    
    if(req.cookie.recordame != undefined && req.session.usuarioLogueado == undefined){

        let usersJson = fs.readFileSync(path.join(__dirname, "../data/users.json"), {encoding: "utf-8"});
        let users;
        if(usersJson == ""){
            users = [];
        }else{
            users = JSON.parse(usersJson);
        }
        for(let i = 0; i<users.length; i++){
            if(users[i].email == req.cookie.recordame){
                usuarioALoguearse = users[i];
                break;  
            }
        }

    }
}

module.exports = recordameMiddleware;