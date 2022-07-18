const castledata = require("../data/castledata.js")

function castlerouter(res){
    res.status(200).send(castledata);
}

module.exports = castlerouter;