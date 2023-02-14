const mongoose = require("mongoose");
const app = require('./app');
const https = require("https");
const fs = require("fs");
//const chalk = require("chalk");
const serverkey = fs.readFileSync("./server.key");
const servercert = fs.readFileSync("./server.cert");
const options = {
    key: serverkey,
    cert: servercert,
};
const port = process.env.SERVER_PORT || 9103;
https.createServer(options, app)
        .listen(port, function (req, res) {
            console.log(`Server started at port ${port}`);
        });
// app.listen(port, () => {
//     console.log( `Server running on port ${port}`) ;
// });
