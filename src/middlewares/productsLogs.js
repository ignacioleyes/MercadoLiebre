const fs = require("fs");
const path = require("path");
const { dirname } = require("path");
function productsLogs(req, res, next){
    fs.appendFileSync(path.resolve(__dirname, "../logs/productsLogs.txt"), `El usuario ingresó a la ruta: ${req.url} \n`);
next(); 
}


module.exports = productsLogs;