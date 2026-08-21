const mongoose = require("mongoose");

function DbConnection() { 
    const DB_URL = process.env.MONGO_URL;

    mongoose.connect(DB_URL);
}

const db = mongoose.connection;
db.addListener("error",console.error.bind(console, "Connection Erros"));

db.once("open", function(){ 
    console.log("DB Connected !!")
    
})
module.exports = DbConnection;

    
