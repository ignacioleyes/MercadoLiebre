function recordameMiddleware (req, res, next){
    next();
    
    if(req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined){

        let usersJson = fs.readFileSync(path.join(__dirname, "../data/users.json"), {encoding: "utf-8"});
        let users;
        if(usersJson == ""){
            users = [];
        }else{
            users = JSON.parse(usersJson);
        }
        let usuarioALoguearse;

        for(let i = 0; i<users.length; i++){
            if(users[i].email == req.cookies.recordame){
                usuarioALoguearse = users[i];
                break;  
            }
        }
        req.session.usuarioLogueado =  usuarioALoguearse;

    }
}

module.exports = recordameMiddleware;